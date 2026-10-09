import { getContributionCalendar } from "@/lib/github-contributions";

const LEVEL_CLASS = [
  "bg-foreground/[0.07]",
  "bg-foreground/25",
  "bg-foreground/45",
  "bg-foreground/70",
  "bg-foreground",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export async function ContributionGrid({ username }: { username: string }) {
  const calendar = await getContributionCalendar(username);
  if (!calendar) return null;

  // Month label sits above the first week whose Sunday starts a new month.
  const monthLabels: { week: number; label: string }[] = [];
  let lastMonth = -1;
  for (const day of calendar.days) {
    if (day.weekday !== 0) continue;
    const month = Number(day.date.slice(5, 7)) - 1;
    if (month !== lastMonth) {
      if (day.week < calendar.weeks - 2) monthLabels.push({ week: day.week, label: MONTHS[month] });
      lastMonth = month;
    }
  }

  return (
    <figure className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          {calendar.total.toLocaleString("en-US")} contributions in the last year
        </span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          github.com/{username}
        </a>
      </figcaption>

      {/* rtl on the scroller so narrow screens open on the most recent weeks */}
      <div className="overflow-x-auto pb-1" dir="rtl">
        <div
          dir="ltr"
          className="grid gap-[3px] w-max"
          style={{
            gridTemplateColumns: `repeat(${calendar.weeks}, 11px)`,
            gridTemplateRows: `14px repeat(7, 11px)`,
          }}
          role="img"
          aria-label={`GitHub contribution calendar for ${username}: ${calendar.total} contributions in the last year`}
        >
          {monthLabels.map((m) => (
            <span
              key={`${m.label}-${m.week}`}
              className="text-[10px] leading-none text-muted-foreground whitespace-nowrap"
              style={{ gridColumn: m.week + 1, gridRow: 1 }}
            >
              {m.label}
            </span>
          ))}
          {calendar.days.map((day) => (
            <span
              key={day.date}
              title={`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
              className={`rounded-[2px] ${LEVEL_CLASS[day.level] ?? LEVEL_CLASS[0]}`}
              style={{ gridColumn: day.week + 1, gridRow: day.weekday + 2 }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground" aria-hidden="true">
        <span className="mr-1">Less</span>
        {LEVEL_CLASS.map((cls) => (
          <span key={cls} className={`h-[11px] w-[11px] rounded-[2px] ${cls}`} />
        ))}
        <span className="ml-1">More</span>
      </div>
    </figure>
  );
}
