/**
 * Unit Tests for GitHub Metrics Service
 * Tests timezone handling and date calculations
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to test the helper functions directly
// First, let's extract and test the core logic

const CHILEAN_TIMEZONE = 'America/Santiago';

function getChileanDateString(date: Date): string {
  return date.toLocaleDateString('en-CA', { timeZone: CHILEAN_TIMEZONE });
}

interface GitHubPR {
  number: number;
  title: string;
  merged_at: string | null;
  created_at: string;
  user: { login: string };
}

interface DailyMetric {
  date: string;
  count: number;
}

function buildDailyMap(prs: GitHubPR[]): Map<string, number> {
  const dailyMap = new Map<string, number>();
  for (const pr of prs) {
    if (pr.merged_at) {
      const date = getChileanDateString(new Date(pr.merged_at));
      dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
    }
  }
  return dailyMap;
}

function getLast30DaysMetrics(dailyMap: Map<string, number>, nowMs: number): DailyMetric[] {
  const result: DailyMetric[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(nowMs - i * 24 * 60 * 60 * 1000);
    const dateStr = getChileanDateString(date);
    result.push({
      date: dateStr,
      count: dailyMap.get(dateStr) || 0,
    });
  }
  return result;
}

describe('GitHub Metrics Service - Timezone Handling', () => {
  describe('getChileanDateString', () => {
    it('should convert UTC midnight to previous day in Chile (UTC-3 summer)', () => {
      // 2026-01-10T00:45:13Z (UTC) = 2026-01-09T21:45:13 in Chile (summer, UTC-3)
      const utcDate = new Date('2026-01-10T00:45:13Z');
      const chileanDate = getChileanDateString(utcDate);
      expect(chileanDate).toBe('2026-01-09');
    });

    it('should keep same day when UTC time is after 3am (summer)', () => {
      // 2026-01-09T15:53:23Z (UTC) = 2026-01-09T12:53:23 in Chile
      const utcDate = new Date('2026-01-09T15:53:23Z');
      const chileanDate = getChileanDateString(utcDate);
      expect(chileanDate).toBe('2026-01-09');
    });

    it('should handle early morning UTC correctly', () => {
      // 2026-01-09T01:24:35Z (UTC) = 2026-01-08T22:24:35 in Chile
      const utcDate = new Date('2026-01-09T01:24:35Z');
      const chileanDate = getChileanDateString(utcDate);
      expect(chileanDate).toBe('2026-01-08');
    });

    it('should handle 3am UTC boundary (midnight in Chile summer)', () => {
      // 2026-01-09T03:00:00Z (UTC) = 2026-01-09T00:00:00 in Chile (exactly midnight)
      const utcDate = new Date('2026-01-09T03:00:00Z');
      const chileanDate = getChileanDateString(utcDate);
      expect(chileanDate).toBe('2026-01-09');
    });

    it('should handle just before 3am UTC (still previous day in Chile)', () => {
      // 2026-01-09T02:59:59Z (UTC) = 2026-01-08T23:59:59 in Chile
      const utcDate = new Date('2026-01-09T02:59:59Z');
      const chileanDate = getChileanDateString(utcDate);
      expect(chileanDate).toBe('2026-01-08');
    });
  });

  describe('buildDailyMap', () => {
    it('should group PRs by Chilean date', () => {
      const prs: GitHubPR[] = [
        { number: 579, title: 'PR 1', merged_at: '2026-01-10T00:45:13Z', created_at: '', user: { login: 'test' } },
        { number: 578, title: 'PR 2', merged_at: '2026-01-09T15:53:23Z', created_at: '', user: { login: 'test' } },
        { number: 577, title: 'PR 3', merged_at: '2026-01-09T04:00:15Z', created_at: '', user: { login: 'test' } },
        { number: 575, title: 'PR 4', merged_at: '2026-01-09T01:24:35Z', created_at: '', user: { login: 'test' } },
      ];

      const dailyMap = buildDailyMap(prs);

      // PR 579 (00:45 UTC Jan 10) = Jan 9 in Chile (21:45)
      // PR 578 (15:53 UTC Jan 9) = Jan 9 in Chile (12:53)
      // PR 577 (04:00 UTC Jan 9) = Jan 9 in Chile (01:00)
      // PR 575 (01:24 UTC Jan 9) = Jan 8 in Chile (22:24)

      expect(dailyMap.get('2026-01-09')).toBe(3); // PRs 579, 578, 577
      expect(dailyMap.get('2026-01-08')).toBe(1); // PR 575
    });

    it('should handle PRs merged around midnight Chilean time', () => {
      const prs: GitHubPR[] = [
        // Just before midnight Chile (02:59 UTC) = Jan 8 Chile
        { number: 1, title: 'Before midnight', merged_at: '2026-01-09T02:59:00Z', created_at: '', user: { login: 'test' } },
        // Just after midnight Chile (03:01 UTC) = Jan 9 Chile
        { number: 2, title: 'After midnight', merged_at: '2026-01-09T03:01:00Z', created_at: '', user: { login: 'test' } },
      ];

      const dailyMap = buildDailyMap(prs);

      expect(dailyMap.get('2026-01-08')).toBe(1);
      expect(dailyMap.get('2026-01-09')).toBe(1);
    });
  });

  describe('getLast30DaysMetrics', () => {
    it('should return 30 days starting from today in Chilean time', () => {
      const dailyMap = new Map<string, number>();
      dailyMap.set('2026-01-09', 5);
      dailyMap.set('2026-01-08', 3);

      // Simulate current time: Jan 9, 2026 at 10pm Chile = Jan 10, 2026 at 1am UTC
      const nowMs = new Date('2026-01-10T01:00:00Z').getTime();

      const metrics = getLast30DaysMetrics(dailyMap, nowMs);

      expect(metrics.length).toBe(30);
      // First entry should be "today" in Chilean time = Jan 9
      expect(metrics[0].date).toBe('2026-01-09');
      expect(metrics[0].count).toBe(5);
      // Second entry should be yesterday = Jan 8
      expect(metrics[1].date).toBe('2026-01-08');
      expect(metrics[1].count).toBe(3);
    });

    it('should include days with 0 PRs', () => {
      const dailyMap = new Map<string, number>();
      dailyMap.set('2026-01-09', 5);
      // Jan 8 has no PRs

      const nowMs = new Date('2026-01-10T01:00:00Z').getTime();
      const metrics = getLast30DaysMetrics(dailyMap, nowMs);

      expect(metrics[0].count).toBe(5); // Jan 9
      expect(metrics[1].count).toBe(0); // Jan 8 - no PRs
    });

    it('should handle UTC server time correctly', () => {
      const dailyMap = new Map<string, number>();
      dailyMap.set('2026-01-09', 5);

      // If server is in UTC and it's 2am UTC on Jan 10 (11pm Jan 9 in Chile)
      // "Today" in Chile should still be Jan 9
      const nowMs = new Date('2026-01-10T02:00:00Z').getTime();
      const metrics = getLast30DaysMetrics(dailyMap, nowMs);

      expect(metrics[0].date).toBe('2026-01-09');
      expect(metrics[0].count).toBe(5);
    });

    it('should correctly identify today after Chilean midnight', () => {
      const dailyMap = new Map<string, number>();
      dailyMap.set('2026-01-10', 2);
      dailyMap.set('2026-01-09', 5);

      // Server time: 4am UTC Jan 10 = 1am Chilean Jan 10 (past midnight)
      const nowMs = new Date('2026-01-10T04:00:00Z').getTime();
      const metrics = getLast30DaysMetrics(dailyMap, nowMs);

      // Now "today" in Chile is Jan 10
      expect(metrics[0].date).toBe('2026-01-10');
      expect(metrics[0].count).toBe(2);
      expect(metrics[1].date).toBe('2026-01-09');
      expect(metrics[1].count).toBe(5);
    });
  });

  describe('Real scenario: Current time 10pm Chile (1am UTC next day)', () => {
    it('should show today as Jan 9 when UTC is Jan 10 1am', () => {
      // This is the actual scenario the user is experiencing
      const nowMs = new Date('2026-01-10T01:12:00Z').getTime(); // 10:12pm Chile Jan 9

      const todayChilean = getChileanDateString(new Date(nowMs));
      expect(todayChilean).toBe('2026-01-09');
    });
  });
});
