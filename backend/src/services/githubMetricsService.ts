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
  fetchedAt: string;
}

// Cache to avoid hitting GitHub API too frequently
let metricsCache: { data: ProductivityMetrics; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const CHILEAN_TIMEZONE = 'America/Santiago';

/**
 * Get date string (YYYY-MM-DD) in Chilean timezone
 */
function getChileanDateString(date: Date): string {
  return date.toLocaleDateString('en-CA', { timeZone: CHILEAN_TIMEZONE });
}

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
   * Group PRs by day (YYYY-MM-DD format) in Chilean timezone
   * Returns a map of date to count for all days with PRs
   */
  private static buildDailyMap(prs: GitHubPR[]): Map<string, number> {
    const dailyMap = new Map<string, number>();

    for (const pr of prs) {
      if (pr.merged_at) {
        const date = getChileanDateString(new Date(pr.merged_at));
        dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
      }
    }

    return dailyMap;
  }

  /**
   * Get daily metrics for all days with PRs (for streak calculation)
   */
  private static getAllDailyMetrics(dailyMap: Map<string, number>): DailyMetric[] {
    return Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  /**
   * Get daily metrics for last 30 days including days with 0 PRs (for chart)
   * Uses Chilean timezone for day boundaries
   */
  private static getLast30DaysMetrics(dailyMap: Map<string, number>): DailyMetric[] {
    const result: DailyMetric[] = [];
    const todayStr = getChileanDateString(new Date());

    for (let i = 0; i < 30; i++) {
      const date = new Date(todayStr);
      date.setDate(date.getDate() - i);
      const dateStr = getChileanDateString(date);
      result.push({
        date: dateStr,
        count: dailyMap.get(dateStr) || 0,
      });
    }

    // Already sorted by date descending (most recent first)
    return result;
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
   * Uses Chilean timezone for day boundaries
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

    // Calculate current streak (starting from today or yesterday) in Chilean timezone
    const today = getChileanDateString(new Date());
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getChileanDateString(yesterdayDate);

    let currentStreak = 0;
    let checkDateStr: string;

    // Start from today if it qualifies, otherwise from yesterday
    if (qualifyingDates.has(today)) {
      checkDateStr = today;
    } else if (qualifyingDates.has(yesterday)) {
      checkDateStr = yesterday;
    } else {
      // No current streak
      checkDateStr = '';
    }

    // Count consecutive days going backwards
    while (checkDateStr) {
      if (qualifyingDates.has(checkDateStr)) {
        currentStreak++;
        const prevDate = new Date(checkDateStr);
        prevDate.setDate(prevDate.getDate() - 1);
        checkDateStr = getChileanDateString(prevDate);
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
    const dailyMap = this.buildDailyMap(prs);
    const allDailyMetrics = this.getAllDailyMetrics(dailyMap);
    const last30Days = this.getLast30DaysMetrics(dailyMap);
    const weekly = this.calculateWeeklyMetrics(prs);

    // Find the maximum PRs in a single day to determine streak levels (max 15)
    const maxPRsInDay = allDailyMetrics.length > 0 ? Math.max(...allDailyMetrics.map((d) => d.count)) : 0;
    const maxStreakLevel = Math.min(Math.max(maxPRsInDay, 3), 15);

    // Calculate streaks for 1 through maxStreakLevel (capped at 15)
    const streaks: Record<number, StreakInfo> = {};
    for (let n = 1; n <= maxStreakLevel; n++) {
      streaks[n] = this.calculateStreak(allDailyMetrics, n);
    }

    // Calculate today's and this week's count (in Chilean timezone)
    const today = getChileanDateString(new Date());
    const thisWeek = this.getISOWeek(new Date());

    const todayMetric = last30Days.find((d) => d.date === today);
    const thisWeekMetric = weekly.find((w) => w.week === thisWeek);

    const metrics: ProductivityMetrics = {
      daily: last30Days, // Last 30 days including days with 0 PRs
      weekly: weekly.slice(0, 12), // Last 12 weeks with data
      streaks,
      totalMerged: prs.length,
      todayCount: todayMetric?.count || 0,
      thisWeekCount: thisWeekMetric?.count || 0,
      fetchedAt: new Date().toISOString(),
    };

    // Update cache
    metricsCache = { data: metrics, timestamp: Date.now() };

    return metrics;
  }
}

export default GitHubMetricsService;
