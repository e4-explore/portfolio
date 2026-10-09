import type { ConceptSkill } from "@/data/concepts";

const GROUPS: { kind: ConceptSkill["kind"]; title: string }[] = [
  { kind: "built", title: "Built" },
  { kind: "used", title: "Used" },
];

export function SkillsShowcase({ skills }: { skills: ConceptSkill[] }) {
  return (
    <div className="space-y-8">
      {GROUPS.map(({ kind, title }) => {
        const group = skills.filter((s) => s.kind === kind);
        if (group.length === 0) return null;
        return (
          <div key={kind}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {title} · {group.length}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((skill) => (
                <li
                  key={skill.name}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
                >
                  <p className="mb-2 font-mono text-sm font-semibold text-foreground">/{skill.name}</p>
                  <p className="text-[0.95rem] text-muted-foreground leading-relaxed">{skill.description}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
