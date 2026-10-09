#!/usr/bin/env python3
"""
Audit all chapter quiz files against 7 quality rules.
Outputs a sorted list of chapters by violation score (worst first).
"""
import json, os, sys, re
from collections import defaultdict

QUIZ_DIR = "data/quizzes"
EXPECTED = {
    "easy":        {"mc": 11, "tf": 4, "true": 2, "false": 2},
    "medium":      {"mc": 12, "tf": 3, "true": 1, "false": 2},
    "hard":        {"mc": 13, "tf": 2, "true": 1, "false": 1},
    "theological": {"mc": 15, "tf": 0},
}

def score_file(path):
    violations = []
    with open(path) as f:
        data = json.load(f)
    if "tabs" not in data:
        return None, []

    # --- Rule 1: verse-thirds separation ---
    # Easy should draw from first ~third of chapter, Medium from middle, Hard from last
    # We measure by checking whether refs from each tab are distinct from others
    tab_refs = {}
    for tab, tab_data in data["tabs"].items():
        qs = tab_data.get("questions", [])
        refs = set()
        for q in qs:
            r = q.get("verseReference", "")
            # Extract verse numbers from ref like "Book 3:5" or "Book 3:4-6"
            nums = re.findall(r':(\d+)', r)
            refs.update(int(n) for n in nums)
        tab_refs[tab] = refs

    easy_refs = tab_refs.get("easy", set())
    medium_refs = tab_refs.get("medium", set())
    hard_refs = tab_refs.get("hard", set())
    theol_refs = tab_refs.get("theological", set())

    # Easy/Medium overlap is a rule-1 violation
    em_overlap = easy_refs & medium_refs
    if len(em_overlap) > 2:
        violations.append(f"R1:easy/medium verse overlap ({len(em_overlap)} shared)")

    # Easy/Hard overlap
    eh_overlap = easy_refs & hard_refs
    if len(eh_overlap) > 2:
        violations.append(f"R1:easy/hard verse overlap ({len(eh_overlap)} shared)")

    # Medium/Hard overlap
    mh_overlap = medium_refs & hard_refs
    if len(mh_overlap) > 3:
        violations.append(f"R1:medium/hard verse overlap ({len(mh_overlap)} shared)")

    # --- Rules 2, counts, T/F balance ---
    for tab, exp in EXPECTED.items():
        tab_data = data["tabs"].get(tab)
        if not tab_data:
            continue
        qs = tab_data.get("questions", [])
        mc_count = sum(1 for q in qs if q["type"] == "multiple-choice")
        tf_count = sum(1 for q in qs if q["type"] == "true-false")
        tf_true  = sum(1 for q in qs if q["type"] == "true-false" and str(q.get("correctAnswer","")).lower() == "true")
        tf_false = sum(1 for q in qs if q["type"] == "true-false" and str(q.get("correctAnswer","")).lower() == "false")

        if mc_count != exp["mc"]:
            violations.append(f"R2:{tab} MC={mc_count} (want {exp['mc']})")
        if tf_count != exp["tf"]:
            violations.append(f"R2:{tab} TF={tf_count} (want {exp['tf']})")

        if exp["tf"] > 0:
            want_true  = exp.get("true", exp["tf"] // 2)
            want_false = exp.get("false", exp["tf"] - want_true)
            if tf_true < want_true - 1 or tf_true > want_true + 1:
                violations.append(f"R2:{tab} TF-balance {tf_true}T/{tf_false}F (want ~{want_true}T/{want_false}F)")

    # --- Rule 3: Sequencing questions ---
    # Look for sequencing keywords in Easy/Medium questions
    for tab in ["easy", "medium"]:
        tab_data = data["tabs"].get(tab)
        if not tab_data:
            continue
        qs = tab_data.get("questions", [])
        has_seq = any(
            re.search(r'first|order|comes before|sequence|which.*first', q["question"], re.I)
            for q in qs
        )
        if not has_seq:
            violations.append(f"R3:{tab} no sequencing question")

    # --- Rule 4: Context questions ---
    for tab in ["medium"]:
        tab_data = data["tabs"].get(tab)
        if not tab_data:
            continue
        qs = tab_data.get("questions", [])
        context_count = sum(
            1 for q in qs
            if re.search(r'what (does|will|happens?|result|promise|follow)', q["question"], re.I)
            and re.search(r'verse|if you|when you|because', q["question"], re.I)
        )
        if context_count < 1:
            violations.append(f"R4:medium no context questions")

    # --- Rule 7: Theological depth ---
    theol_data = data["tabs"].get("theological")
    if theol_data:
        qs = theol_data.get("questions", [])
        factual_keywords = re.compile(
            r'^(what did|who (said|was|did)|where did|when did|how many|what was the (name|value|amount|number))',
            re.I
        )
        factual_count = sum(1 for q in qs if factual_keywords.match(q["question"]))
        if factual_count > 3:
            violations.append(f"R7:theological {factual_count} shallow factual questions")

        # Check for synthesis questions (should have 2 verse refs in question text)
        synthesis_count = sum(
            1 for q in qs
            if len(re.findall(r'verse\s+\d+|\d+:\d+', q["question"], re.I)) >= 2
        )
        if synthesis_count < 2:
            violations.append(f"R7:theological only {synthesis_count} synthesis questions")

    return len(violations), violations


results = []
for fname in sorted(os.listdir(QUIZ_DIR)):
    if not fname.endswith("-tabbed.json"):
        continue
    path = os.path.join(QUIZ_DIR, fname)
    score, viols = score_file(path)
    if score is None:
        continue
    results.append((score, fname, viols))

results.sort(reverse=True, key=lambda x: x[0])

# Summary
total = len(results)
clean = sum(1 for s, _, _ in results if s == 0)
print(f"\nAudit complete: {total} files, {clean} clean, {total-clean} with violations")
print(f"\nTop 50 worst offenders:")
print(f"{'Score':>6}  {'File':<45}  Violations")
print("-" * 100)
for score, fname, viols in results[:50]:
    slug = fname.replace("-tabbed.json", "")
    vstr = " | ".join(viols[:3])
    if len(viols) > 3:
        vstr += f" (+{len(viols)-3} more)"
    print(f"{score:>6}  {slug:<45}  {vstr}")

# Write machine-readable list for regen
cutoff = 3  # regenerate anything with 3+ violations
regen_list = [fname.replace("-tabbed.json", "") for score, fname, _ in results if score >= cutoff]
with open("scripts/_audit_regen_list.txt", "w") as f:
    f.write("\n".join(regen_list))
print(f"\n{len(regen_list)} chapters need regeneration (score >= {cutoff}) → scripts/_audit_regen_list.txt")
