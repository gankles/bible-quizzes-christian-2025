#!/usr/bin/env python3
"""
Expand lexicon-concepts.json from 8 entries to 50+ using kjvstudy word_studies.json data.
"""

import json
import os
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
CONCEPTS_FILE = os.path.join(PROJECT_DIR, "data", "lexicon-concepts.json")
WORD_STUDIES_FILE = os.path.join(PROJECT_DIR, "data", "kjvstudy", "word_studies.json")

# Category mappings
CATEGORY_MAP = {
    "Theology": [
        "god", "lord", "salvation", "redeem", "covenant", "grace", "mercy",
        "faith", "justify", "sanctify", "propitiation", "reconcile",
        "atonement", "election", "predestine", "adopt", "adoption", "impute",
        "glory", "name", "word", "promise", "fulfill", "elect"
    ],
    "Christology": [
        "messiah", "lamb", "shepherd", "mediator", "cornerstone", "vine",
        "bread", "light", "door", "firstborn", "rock", "king", "bride"
    ],
    "Soteriology": [
        "save", "born again", "repent", "forgive", "confess", "believe",
        "gospel", "blessed"
    ],
    "Eschatology": [
        "resurrection", "eternal", "kingdom", "heaven", "throne", "crown",
        "judgment", "wrath"
    ],
    "Worship": [
        "worship", "prayer", "praise", "sacrifice", "altar", "temple",
        "priest", "tithe"
    ],
    "Pneumatology": [
        "spirit", "comforter", "holy"
    ],
    "Anthropology": [
        "soul", "heart", "flesh", "mind", "life", "death", "sin",
        "transgression", "iniquity"
    ],
    "Ethics": [
        "righteous", "law", "commandment", "obey", "blessing", "curse",
        "abomination"
    ],
    "Ecclesiology": [
        "church", "baptize", "apostle", "disciple", "elder", "witness"
    ],
}


def get_category(slug):
    """Determine category for a word study slug."""
    for category, words in CATEGORY_MAP.items():
        if slug in words:
            return category
    return "General"


def capitalize_name(slug):
    """Convert slug to display name."""
    # Handle multi-word slugs
    return " ".join(word.capitalize() for word in slug.split(" "))


def strip_html(text):
    """Remove HTML tags from text."""
    return re.sub(r"<[^>]+>", "", text)


def generate_title(slug, ws):
    """Generate a descriptive title from word study data."""
    name = capitalize_name(slug)
    ot_trans = ws.get("ot_transliteration", "")
    nt_trans = ws.get("nt_transliteration", "")

    if ot_trans and nt_trans:
        return f"The Biblical Meaning of {name}: {ot_trans} & {nt_trans}"
    elif ot_trans:
        return f"The Biblical Meaning of {name}: Hebrew {ot_trans}"
    elif nt_trans:
        return f"The Biblical Meaning of {name}: Greek {nt_trans}"
    else:
        return f"The Biblical Meaning of {name} in Scripture"


def generate_description(slug, ws):
    """Generate a 1-2 sentence description from word study data."""
    name = capitalize_name(slug)
    ot_trans = ws.get("ot_transliteration", "")
    nt_trans = ws.get("nt_transliteration", "")
    ot_meaning = strip_html(ws.get("ot_meaning", ""))
    nt_meaning = strip_html(ws.get("nt_meaning", ""))

    if ot_trans and nt_trans:
        desc = (
            f"Explore {slug} in the Bible through the Hebrew '{ot_trans}' "
            f"({ot_meaning}) and Greek '{nt_trans}' ({nt_meaning}). "
            f"Discover how every original-language word for {name} "
            f"deepens your understanding of Scripture."
        )
    elif ot_trans:
        desc = (
            f"Study {slug} in the Old Testament through the Hebrew "
            f"'{ot_trans}' ({ot_meaning}). Trace how this concept shapes "
            f"the biblical narrative from Genesis to Malachi."
        )
    elif nt_trans:
        desc = (
            f"Discover {slug} in the New Testament through the Greek "
            f"'{nt_trans}' ({nt_meaning}). See how this concept illuminates "
            f"the teachings of Christ and the apostles."
        )
    else:
        desc = (
            f"Explore the biblical concept of {name} across both Testaments. "
            f"Understand how Scripture uses this term to reveal God's purposes."
        )

    return desc


def main():
    # 1. Read existing concepts
    with open(CONCEPTS_FILE, "r", encoding="utf-8") as f:
        existing_concepts = json.load(f)

    original_count = len(existing_concepts)
    existing_slugs = {c["slug"] for c in existing_concepts}

    # 2. Read word studies
    with open(WORD_STUDIES_FILE, "r", encoding="utf-8") as f:
        word_studies = json.load(f)

    # 3. Generate new entries
    new_concepts = []
    skipped_no_strongs = []
    skipped_existing = []

    for slug, ws in word_studies.items():
        # Skip if already in concepts
        if slug in existing_slugs:
            skipped_existing.append(slug)
            continue

        # Gather Strong's numbers
        ot_strongs = ws.get("ot_strongs", [])
        nt_strongs = ws.get("nt_strongs", [])
        all_strongs = ot_strongs + nt_strongs

        # Skip if no Strong's numbers at all
        if not all_strongs:
            skipped_no_strongs.append(slug)
            continue

        concept = {
            "slug": slug,
            "name": capitalize_name(slug),
            "title": generate_title(slug, ws),
            "description": generate_description(slug, ws),
            "strongs": all_strongs,
            "category": get_category(slug),
        }
        new_concepts.append(concept)

    # 4. Sort new concepts alphabetically by slug
    new_concepts.sort(key=lambda c: c["slug"])

    # 5. Combine: originals first, then new ones
    combined = existing_concepts + new_concepts

    # 6. Write back
    with open(CONCEPTS_FILE, "w", encoding="utf-8") as f:
        json.dump(combined, f, indent=4, ensure_ascii=False)

    # 7. Print summary
    print(f"Expanded from {original_count} to {len(combined)} concepts")
    print(f"  - Kept {original_count} original concepts unchanged")
    print(f"  - Added {len(new_concepts)} new concepts from word studies")
    if skipped_existing:
        print(f"  - Skipped {len(skipped_existing)} (already exist): {', '.join(sorted(skipped_existing))}")
    if skipped_no_strongs:
        print(f"  - Skipped {len(skipped_no_strongs)} (no Strong's numbers): {', '.join(sorted(skipped_no_strongs))}")


if __name__ == "__main__":
    main()
