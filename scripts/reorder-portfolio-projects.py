#!/usr/bin/env python3
"""One-off reorder helper for portfolio projects array."""

from __future__ import annotations

import re
from pathlib import Path

PATH = Path("src/data/portfolio.ts")
text = PATH.read_text(encoding="utf-8")

start_marker = "export const projects: Project[] = ["
end_marker = "];\n\nexport interface Service"
start = text.index(start_marker) + len(start_marker)
end = text.index(end_marker)
body = text[start:end]

parts = re.split(r"\n  \{", body)
chunks: list[tuple[str, str]] = []
for i, part in enumerate(parts):
    if not part.strip():
        continue
    block = part if i == 0 else "  {" + part
    m = re.search(r'id: "([^"]+)"', block)
    if not m:
        continue
    chunks.append((m.group(1), block.rstrip()))

by_id = {cid: block for cid, block in chunks}

priority_web = [
    "marketi-juaj-pos",
    "minions-vs-bloons",
    "boostx-pc-optimizer",
    "robert-nuha-portfolio",
]
web_demos = [
    "room-planner-threejs",
    "pizza-house-order",
    "ecommerce-platform",
    "admin-dashboard",
    "creative-studio-site",
]
ar_vr = [
    "sunny-hill-festival-ar",
    "ar-furniture",
    "ar-portal-museum",
    "ar-bmw-car-configurator",
    "ar-fashion",
    "ar-plan-measurement",
]
unity = [
    "zombie-crusher",
    "florify",
    "lost-signal",
    "last-to-blast",
]

order = priority_web + web_demos + ar_vr + unity
missing = [cid for cid, _ in chunks if cid not in order]
order.extend(missing)

blocks = []
for cid in order:
    block = by_id.get(cid)
    if not block:
        raise SystemExit(f"Missing project block: {cid}")
    blocks.append(block.strip())

new_body = "\n  " + ",\n  ".join(blocks) + "\n"
new_text = text[: start - len(start_marker)] + start_marker + new_body + end_marker + text[end + len(end_marker) :]
PATH.write_text(new_text, encoding="utf-8")
print("OK:", order)
