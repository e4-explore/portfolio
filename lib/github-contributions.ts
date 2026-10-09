export interface ContributionDay {
  date: string;
  count: number;
  /** GitHub's 0–4 intensity bucket. */
  level: number;
  /** 0 = Sunday … 6 = Saturday. */
  weekday: number;
  /** Week column, 0 = oldest. */
  week: number;
}

export interface ContributionCalendar {
  username: string;
  total: number;
  days: ContributionDay[];
  weeks: number;
}

/**
 * Pulls the public contribution calendar GitHub renders on a profile page and
 * parses it into day cells. Revalidated daily; returns null if GitHub is unreachable
 * so the page can simply omit the grid.
 */
export async function getContributionCalendar(username: string): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const counts = new Map<string, number>();
    const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)</g;
    let t: RegExpExecArray | null;
    while ((t = tipRe.exec(html)) !== null) {
      const n = t[2].match(/^([\d,]+) contribution/);
      counts.set(t[1], n ? Number(n[1].replace(/,/g, "")) : 0);
    }

    const days: ContributionDay[] = [];
    const cellRe = /<td[^>]*data-date="([^"]+)"[^>]*id="contribution-day-component-(\d+)-(\d+)"[^>]*data-level="(\d)"/g;
    let c: RegExpExecArray | null;
    while ((c = cellRe.exec(html)) !== null) {
      const id = `contribution-day-component-${c[2]}-${c[3]}`;
      days.push({
        date: c[1],
        weekday: Number(c[2]),
        week: Number(c[3]),
        level: Number(c[4]),
        count: counts.get(id) ?? 0,
      });
    }
    if (days.length === 0) return null;

    return {
      username,
      days,
      total: days.reduce((sum, d) => sum + d.count, 0),
      weeks: Math.max(...days.map((d) => d.week)) + 1,
    };
  } catch {
    return null;
  }
}
