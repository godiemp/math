import dotenv from 'dotenv';

dotenv.config();

interface GitHubPR {
  number: number;
  title: string;
  merged_at: string | null;
  created_at: string;
  user: {
    login: string;
  };
}

interface DailyMetric {
  date: string;
  count: number;
}

interface WeeklyMetric {
  week: string;
  count: number;
}

interface StreakInfo {
  current: number;
  longest: number;
}

interface ProductivityMetrics {
  daily: DailyMetric[];
  weekly: WeeklyMetric[];
  streaks: Record<number, StreakInfo>;
  totalMerged: number;
  todayCount: number;
  thisWeekCount: number;
}

// Cache to avoid hitting GitHub API too frequently
let metricsCache: { data: ProductivityMetrics; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

class GitHubMetricsService {
  private static readonly OWNER = 'godiemp';
  private static readonly REPO = 'math';
  private static readonly token = process.env.GITHUB_TOKEN;

  /**
   * Fetch all merged PRs from GitHub API (paginated)
   */
  private static async fetchMergedPRs(): Promise<GitHubPR[]> {
    if (!this.token) {
      throw new Error('GITHUB_TOKEN not configured');
    }

    const allPRs: GitHubPR[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const url = `https://api.github.com/repos/${this.OWNER}/${this.REPO}/pulls?state=closed&per_page=${perPage}&page=${page}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'SimplePAES-DevMetrics',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const prs = (await response.json()) as GitHubPR[];

      if (prs.length === 0) {
        break;
      }

      // Filter only merged PRs (not just closed)
      const mergedPRs = prs.filter((pr) => pr.merged_at !== null);
      allPRs.push(...mergedPRs);

      // If we got less than perPage, we've reached the end
      if (prs.length < perPage) {
        break;
      }

      page++;
    }

    return allPRs;
  }

  /**
   * Group PRs by day (YYYY-MM-DD format)
   */
  private static calculateDailyMetrics(prs: GitHubPR[]): DailyMetric[] {
    const dailyMap = new Map<string, number>();

    for (const pr of prs) {
      if (pr.merged_at) {
        const date = pr.merged_at.split('T')[0];
        dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
      }
    }

    // Sort by date descending
    return Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  /**
   * Group PRs by ISO week (YYYY-Www format)
   */
  private static calculateWeeklyMetrics(prs: GitHubPR[]): WeeklyMetric[] {
    const weeklyMap = new Map<string, number>();

    for (const pr of prs) {
      if (pr.merged_at) {
        const date = new Date(pr.merged_at);
        const week = this.getISOWeek(date);
        weeklyMap.set(week, (weeklyMap.get(week) || 0) + 1);
      }
    }

    // Sort by week descending
    return Array.from(weeklyMap.entries())
      .map(([week, count]) => ({ week, count }))
      .sort((a, b) => b.week.localeCompare(a.week));
  }

  /**
   * Get ISO week string (YYYY-Www)
   */
  private static getISOWeek(date: Date): string {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  }

  /**
   * Calculate streak for a minimum number of PRs per day
   * Returns current streak (days from today going back) and longest streak ever
   */
  private static calculateStreak(dailyMetrics: DailyMetric[], minPRs: number): StreakInfo {
    if (dailyMetrics.length === 0) {
      return { current: 0, longest: 0 };
    }

    // Create a set of dates that meet the minimum PRs requirement
    const qualifyingDates = new Set<string>();
    for (const metric of dailyMetrics) {
      if (metric.count >= minPRs) {
        qualifyingDates.add(metric.date);
      }
    }

    // Calculate current streak (starting from today or yesterday)
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let currentStreak = 0;
    let checkDate: Date;

    // Start from today if it qualifies, otherwise from yesterday
    if (qualifyingDates.has(today)) {
      checkDate = new Date(today);
    } else if (qualifyingDates.has(yesterday)) {
      checkDate = new Date(yesterday);
    } else {
      // No current streak
      checkDate = new Date(0); // Will skip the loop
    }

    // Count consecutive days going backwards
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (qualifyingDates.has(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Calculate longest streak ever
    // Sort dates ascending for streak calculation
    const sortedDates = Array.from(qualifyingDates).sort();
    let longestStreak = 0;
    let tempStreak = 0;
    let prevDate: Date | null = null;

    for (const dateStr of sortedDates) {
      const currentDate = new Date(dateStr);

      if (prevDate === null) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((currentDate.getTime() - prevDate.getTime()) / 86400000);
        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }

      prevDate = currentDate;
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    return { current: currentStreak, longest: longestStreak };
  }

  /**
   * Get all productivity metrics with caching
   */
  static async getProductivityMetrics(): Promise<ProductivityMetrics> {
    // Check cache
    if (metricsCache && Date.now() - metricsCache.timestamp < CACHE_TTL_MS) {
      return metricsCache.data;
    }

    const prs = await this.fetchMergedPRs();
    const daily = this.calculateDailyMetrics(prs);
    const weekly = this.calculateWeeklyMetrics(prs);

    // Find the maximum PRs in a single day to determine streak levels
    const maxPRsInDay = daily.length > 0 ? Math.max(...daily.map((d) => d.count)) : 0;

    // Calculate streaks for 1 through maxPRsInDay
    const streaks: Record<number, StreakInfo> = {};
    for (let n = 1; n <= Math.max(maxPRsInDay, 3); n++) {
      streaks[n] = this.calculateStreak(daily, n);
    }

    // Calculate today's and this week's count
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = this.getISOWeek(new Date());

    const todayMetric = daily.find((d) => d.date === today);
    const thisWeekMetric = weekly.find((w) => w.week === thisWeek);

    const metrics: ProductivityMetrics = {
      daily: daily.slice(0, 30), // Last 30 days with data
      weekly: weekly.slice(0, 12), // Last 12 weeks with data
      streaks,
      totalMerged: prs.length,
      todayCount: todayMetric?.count || 0,
      thisWeekCount: thisWeekMetric?.count || 0,
    };

    // Update cache
    metricsCache = { data: metrics, timestamp: Date.now() };

    return metrics;
  }
}

export default GitHubMetricsService;
