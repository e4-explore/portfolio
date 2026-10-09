"""Generates the muted placeholder diagrams for the Hudl case study and approach pages.

Run: python3 scripts/make-diagrams.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "public"

BG, CARD, LINE, INK, MUTED, FAINT = "#F2F2EF", "#FFFFFF", "#D6D6D1", "#2E3135", "#7C8088", "#E6E6E1"
ACCENT, ACCENT_SOFT = "#C4825A", "#EED9CB"
FONT = "Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"


def svg(body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">'
        f"<style>text{{font-family:{FONT}}}</style>"
        f'<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
        f'<path d="M0 0L10 5L0 10z" fill="{MUTED}"/></marker>'
        f'<marker id="arrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
        f'<path d="M0 0L10 5L0 10z" fill="{ACCENT}"/></marker></defs>'
        f'<rect width="1600" height="900" fill="{BG}"/>{body}</svg>'
    )


def rect(x, y, w, h, fill=CARD, rx=24, stroke=LINE, sw=2, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{s}{d}/>'


def text(x, y, t, size=36, fill=INK, weight=400, anchor="start"):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}">{t}</text>'


def line(x1, y1, x2, y2, color=MUTED, sw=3, marker="arr", dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    m = f' marker-end="url(#{marker})"' if marker else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{sw}" stroke-linecap="round"{d}{m}/>'


def person(cx, cy, color=MUTED, s=1.0):
    return (
        f'<circle cx="{cx}" cy="{cy - 34 * s}" r="{22 * s}" fill="{color}"/>'
        f'<rect x="{cx - 34 * s}" y="{cy - 4 * s}" width="{68 * s}" height="{52 * s}" rx="{26 * s}" fill="{color}"/>'
    )


def bars(x, y, widths, h=14, gap=14, color=FAINT):
    return "".join(rect(x, y + i * (h + gap), w, h, color, rx=h / 2, stroke=None) for i, w in enumerate(widths))


def num(cx, cy, n):
    return f'<circle cx="{cx}" cy="{cy}" r="26" fill="{INK}"/>' + text(cx, cy + 10, n, 28, CARD, 600, "middle")


def challenge():
    b = ""
    cards = [
        ("A new user type", "Parents, for the first time"),
        ("Two apps → one", "Consolidate, then delist"),
        ("Navigation for all", "Every role, not just parents"),
    ]
    for i, (title, sub) in enumerate(cards):
        x = 80 + i * 490
        b += rect(x, 130, 460, 640) + num(x + 60, 190, str(i + 1))
        b += text(x + 40, 660, title, 42, INK, 700) + text(x + 40, 712, sub, 30, MUTED)
    # 1: existing roles + new parent
    for j in range(3):
        b += person(150 + j * 95, 420, LINE, 0.9)
    b += person(450, 420, ACCENT, 1.15)
    b += f'<circle cx="497" cy="330" r="22" fill="{ACCENT_SOFT}"/>' + text(497, 341, "+", 32, ACCENT, 700, "middle")
    # 2: two apps merge into one
    b += rect(620, 300, 110, 110, FAINT, 26, LINE) + rect(620, 440, 110, 110, FAINT, 26, LINE)
    b += line(745, 355, 830, 410) + line(745, 495, 830, 440)
    b += rect(845, 360, 130, 130, ACCENT_SOFT, 30, ACCENT, 3)
    # 3: a phone with a shared tab bar
    b += rect(1180, 270, 220, 320, CARD, 30, LINE, 3)
    b += bars(1210, 310, [150, 110, 130], 14, 16)
    b += rect(1180, 520, 220, 70, ACCENT_SOFT, 0, None)
    b += f'<path d="M1180 520h220v40a30 30 0 0 1-30 30h-160a30 30 0 0 1-30-30z" fill="{ACCENT_SOFT}"/>'
    for k in range(4):
        b += f'<circle cx="{1212 + k * 52}" cy="555" r="10" fill="{ACCENT}"/>'
    return svg(b)


def feedback_pipeline():
    b = ""
    # stage 1: comments
    for i, (dx, w) in enumerate([(0, 300), (60, 280), (20, 300), (70, 260)]):
        y = 190 + i * 105
        b += rect(150 + dx, y, w, 80, CARD, 20) + bars(180 + dx, y + 22, [w - 90, w - 150], 12, 12)
    # stage 2: sorter
    b += rect(620, 230, 360, 360, CARD, 32)
    b += text(800, 330, "AI sorting", 34, INK, 600, "middle")
    for i, (label, w) in enumerate([("Video", 170), ("Search", 190), ("Trust", 160)]):
        y = 375 + i * 66
        b += rect(800 - w / 2, y, w, 50, ACCENT_SOFT if i == 0 else FAINT, 25, None)
        b += text(800, y + 35, label, 28, INK, 500, "middle")
    # stage 3: dashboard
    b += rect(1120, 230, 380, 360, CARD, 32)
    for i, h in enumerate([90, 140, 120, 190, 170]):
        b += rect(1160 + i * 64, 540 - h, 40, h, FAINT if i < 3 else ACCENT_SOFT, 8, None)
    b += f'<polyline points="1180,420 1244,390 1308,400 1372,330 1436,300" fill="none" stroke="{ACCENT}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
    b += line(510, 410, 600, 410) + line(1000, 410, 1100, 410)
    for x, t, s in [(310, "In-app comments", "Raw, unsorted feedback"), (800, "Grouped into themes", "AI-assisted text analysis"), (1310, "Sentiment over time", "Segmentable by cohort")]:
        b += text(x, 700, t, 40, INK, 700, "middle") + text(x, 750, s, 30, MUTED, 400, "middle")
    return svg(b)


def nav_every_role():
    b = ""
    roles = ["Coach", "Athlete", "Admin", "Parent"]
    for i, r in enumerate(roles):
        cx = 320 + i * 320
        accent = r == "Parent"
        b += rect(cx - 120, 140, 240, 80, ACCENT_SOFT if accent else CARD, 40, ACCENT if accent else LINE, 3 if accent else 2)
        b += text(cx, 193, r, 34, INK, 600, "middle")
        b += line(cx, 230, 800 + (cx - 800) * 0.45, 470, ACCENT if accent else MUTED, 3, "arrA" if accent else "arr")
    b += rect(250, 490, 1100, 160, CARD, 36, LINE, 3)
    for i, tab in enumerate(["Home", "Schedule", "Video", "Messages", "Profile"]):
        cx = 360 + i * 220
        b += rect(cx - 22, 520, 44, 44, ACCENT_SOFT if i == 0 else FAINT, 12, None)
        b += text(cx, 615, tab, 28, INK if i == 0 else MUTED, 500, "middle")
    b += text(800, 770, "One navigation model, shared by every role", 40, INK, 700, "middle")
    return svg(b)


def event_first():
    b = ""
    # left: video-first
    b += rect(70, 90, 700, 720, CARD, 32)
    b += text(120, 170, "Video-first", 44, INK, 700) + text(120, 218, "A dead end when video isn't ready", 30, MUTED)
    b += rect(120, 280, 600, 150, FAINT, 22, None)
    b += f'<circle cx="200" cy="355" r="38" fill="{CARD}"/><path d="M188 337l30 18-30 18z" fill="{LINE}"/>'
    b += text(270, 345, "Fri · vs. Eastview", 32, INK, 600) + text(270, 390, "No video yet", 30, MUTED)
    b += line(420, 450, 420, 560, MUTED, 3, "arr", "8 10")
    b += f'<circle cx="420" cy="650" r="70" fill="none" stroke="{LINE}" stroke-width="3" stroke-dasharray="10 10"/>'
    b += f'<path d="M395 625l50 50M445 625l-50 50" stroke="{MUTED}" stroke-width="6" stroke-linecap="round"/>'
    b += text(420, 765, "Nothing to land on", 30, MUTED, 400, "middle")
    # right: event-first
    b += rect(830, 90, 700, 720, CARD, 32, ACCENT, 3)
    b += text(880, 170, "Event-first", 44, INK, 700) + text(880, 218, "Every game has a page to land on", 30, MUTED)
    b += rect(880, 270, 600, 90, ACCENT_SOFT, 22, None) + text(910, 327, "Fri 7:00 PM · vs. Eastview", 32, INK, 600)
    rows = [("Schedule &amp; location", False), ("Live score", False), ("Video — when it's ready", True), ("Messages", False)]
    for i, (label, acc) in enumerate(rows):
        y = 385 + i * 100
        b += rect(880, y, 600, 80, CARD, 18, ACCENT if acc else LINE, 2)
        b += rect(905, y + 20, 40, 40, ACCENT_SOFT if acc else FAINT, 10, None)
        b += text(970, y + 52, label, 30, INK, 500)
    return svg(b)


def pilot_rollout():
    b = ""
    steps = ["Messaging &amp; calendar", "Video &amp; highlights", "Athlete &amp; team profiles", "Livestreams", "Search, sharing, ticketing"]
    w, base = 270, 700
    for i, label in enumerate(steps):
        x = 125 + i * (w + 0)
        top = base - (i + 1) * 85
        b += rect(x + 6, top, w - 12, base - top, ACCENT_SOFT if i == 0 else FAINT, 16, None)
        b += num(x + 46, top - 150, str(i + 1))
        words = label.split(" ")
        mid = (len(words) + 1) // 2
        for j, part in enumerate([" ".join(words[:mid]), " ".join(words[mid:])]):
            if part:
                b += text(x + 16, top - 80 + j * 40, part, 32, INK, 600)
    b += line(125, 760, 1470, 760, MUTED, 3)
    b += text(125, 820, "Closed pilot · features added one at a time so each could be watched in isolation", 30, MUTED)
    return svg(b)


def activation_funnel():
    b = ""
    rows = [
        ("Alpha cohort", "150 parents", 1.0, "150", False),
        ("Engaged", "Opened it at least once", 0.40, "~40%", False),
        ("Reached an event page", "Found the core experience", 0.06, "~6%", True),
    ]
    x0, full = 560, 900
    for i, (label, sub, frac, val, acc) in enumerate(rows):
        y = 150 + i * 190
        b += text(100, y + 52, label, 38, INK, 700) + text(100, y + 98, sub, 28, MUTED)
        b += rect(x0, y, full, 120, FAINT, 16, None)
        b += rect(x0, y, max(full * frac, 30), 120, ACCENT if acc else "#B9BCB6", 16, None)
        b += text(x0 + max(full * frac, 30) + 24, y + 76, val, 44, INK, 700)
    # gap annotation, in the empty track of the last row
    b += text(800, 596, "← Discovery gap: most never found it", 32, ACCENT, 700)
    b += text(x0, 700, "→ 90% of these went on to watch video", 30, INK, 500)
    b += text(100, 800, "The product converted once parents found it. The problem was activation, not retention.", 32, MUTED)
    return svg(b)


def live_loop():
    b = ""
    b += text(100, 120, "Typical research loop", 36, INK, 700) + text(1500, 120, "Days to weeks", 32, MUTED, 400, "end")
    steps = ["Feedback", "Redesign", "Book a session", "Validate"]
    for i, s in enumerate(steps):
        x = 100 + i * 360
        b += rect(x, 160, 300, 110, CARD, 22)
        b += text(x + 150, 228, s, 32, MUTED, 500, "middle")
        if i < 3:
            b += line(x + 310, 215, x + 350, 215)
    b += f'<line x1="100" y1="370" x2="1500" y2="370" stroke="{LINE}" stroke-width="2" stroke-dasharray="6 10"/>'
    b += text(100, 460, "Live, on the call", 36, INK, 700) + text(1500, 460, "Minutes — repeated in one call", 32, ACCENT, 600, "end")
    loop = [("Parent gives feedback", False), ("Prototype updated live", True), ("Parent reacts", False)]
    for i, (s, acc) in enumerate(loop):
        cx = 360 + i * 440
        b += rect(cx - 180, 520, 360, 120, ACCENT_SOFT if acc else CARD, 60, ACCENT if acc else LINE, 3 if acc else 2)
        b += text(cx, 592, s, 32, INK, 600, "middle")
        if i < 2:
            b += line(cx + 190, 580, cx + 250, 580, ACCENT, 4, "arrA")
    b += f'<path d="M1240 650 C1240 800 360 800 360 662" fill="none" stroke="{ACCENT}" stroke-width="4" marker-end="url(#arrA)"/>'
    b += text(800, 815, "Repeated several times in a single call", 30, MUTED, 400, "middle")
    return svg(b)


OUT = {
    "projects/hudl-for-parents/diagrams/challenge.svg": challenge,
    "projects/hudl-for-parents/diagrams/feedback-pipeline.svg": feedback_pipeline,
    "projects/hudl-for-parents/diagrams/navigation-every-role.svg": nav_every_role,
    "projects/hudl-for-parents/diagrams/event-first.svg": event_first,
    "projects/hudl-for-parents/diagrams/pilot-rollout.svg": pilot_rollout,
    "projects/hudl-for-parents/diagrams/activation-funnel.svg": activation_funnel,
    "approach/live-prototype-loop.svg": live_loop,
}

for path, fn in OUT.items():
    (ROOT / path).write_text(fn())
    print("wrote", path)
