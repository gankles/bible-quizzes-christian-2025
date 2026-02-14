#!/usr/bin/env python3
"""
Scrape Ellicott's Commentary for English Readers from BibleHub.
The commentary text is Public Domain (Charles John Ellicott, 1878-1884).
Outputs: data/commentaries/ellicott.json

Uses concurrent fetching with ThreadPoolExecutor for speed.
"""

import re, json, os, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'commentaries', 'ellicott.json')

# BibleHub book slugs and chapter counts (KJV)
# (biblehub_slug, our_slug, num_chapters)
BOOKS = [
    ("genesis", "genesis", 50), ("exodus", "exodus", 40), ("leviticus", "leviticus", 27),
    ("numbers", "numbers", 36), ("deuteronomy", "deuteronomy", 34), ("joshua", "joshua", 24),
    ("judges", "judges", 21), ("ruth", "ruth", 4), ("1_samuel", "1-samuel", 31),
    ("2_samuel", "2-samuel", 24), ("1_kings", "1-kings", 22), ("2_kings", "2-kings", 25),
    ("1_chronicles", "1-chronicles", 29), ("2_chronicles", "2-chronicles", 36),
    ("ezra", "ezra", 10), ("nehemiah", "nehemiah", 13), ("esther", "esther", 10),
    ("job", "job", 42), ("psalms", "psalms", 150), ("proverbs", "proverbs", 31),
    ("ecclesiastes", "ecclesiastes", 12), ("songs", "song-of-solomon", 8),
    ("isaiah", "isaiah", 66), ("jeremiah", "jeremiah", 52), ("lamentations", "lamentations", 5),
    ("ezekiel", "ezekiel", 48), ("daniel", "daniel", 12), ("hosea", "hosea", 14),
    ("joel", "joel", 3), ("amos", "amos", 9), ("obadiah", "obadiah", 1),
    ("jonah", "jonah", 4), ("micah", "micah", 7), ("nahum", "nahum", 3),
    ("habakkuk", "habakkuk", 3), ("zephaniah", "zephaniah", 3), ("haggai", "haggai", 2),
    ("zechariah", "zechariah", 14), ("malachi", "malachi", 4),
    ("matthew", "matthew", 28), ("mark", "mark", 16), ("luke", "luke", 24),
    ("john", "john", 21), ("acts", "acts", 28), ("romans", "romans", 16),
    ("1_corinthians", "1-corinthians", 16), ("2_corinthians", "2-corinthians", 13),
    ("galatians", "galatians", 6), ("ephesians", "ephesians", 6),
    ("philippians", "philippians", 4), ("colossians", "colossians", 4),
    ("1_thessalonians", "1-thessalonians", 5), ("2_thessalonians", "2-thessalonians", 3),
    ("1_timothy", "1-timothy", 6), ("2_timothy", "2-timothy", 4),
    ("titus", "titus", 3), ("philemon", "philemon", 1), ("hebrews", "hebrews", 13),
    ("james", "james", 5), ("1_peter", "1-peter", 5), ("2_peter", "2-peter", 3),
    ("1_john", "1-john", 5), ("2_john", "2-john", 1), ("3_john", "3-john", 1),
    ("jude", "jude", 1), ("revelation", "revelation", 22),
]


def clean_html(text):
    """Strip HTML tags and clean up commentary text."""
    text = re.sub(r'<span class=\s*"bld">(.*?)</span>', r'**\1**', text)
    text = re.sub(r'<span class=\s*"ital">(.*?)</span>', r'*\1*', text)
    text = re.sub(r'<a[^>]*>(.*?)</a>', r'\1', text)
    text = re.sub(r'<p>', '\n', text)
    text = re.sub(r'<br\s*/?>', '\n', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = text.replace('&mdash;', '--').replace('&ndash;', '-')
    text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    text = text.replace('&quot;', '"').replace('&#39;', "'")
    text = re.sub(r'&#\d+;', '', text)
    text = re.sub(r'&\w+;', '', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def fetch_chapter(bh_book, slug, chapter):
    """Fetch a chapter's Ellicott commentary. Returns list of (key, text) tuples."""
    url = f"https://biblehub.com/commentaries/ellicott/{bh_book}/{chapter}.htm"

    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
    })

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode('utf-8-sig', errors='replace')
    except Exception as e:
        return []

    entries = []
    parts = re.split(r'<div class="versenum">', html)

    for part in parts[1:]:
        verse_match = re.search(r'(\d+):(\d+)', part)
        if not verse_match:
            continue

        verse_num = int(verse_match.group(2))

        commentary = re.sub(r'<div class="verse">.*?</div>', '', part, count=1, flags=re.DOTALL)
        commentary = re.sub(r'.*?</div>', '', commentary, count=1, flags=re.DOTALL)

        for boundary in ['<div class="vheading">', '<div id="leftbox">', '<div class="padleft">',
                        '<div class="chap">', '</div></div></div>']:
            idx = commentary.find(boundary)
            if idx > 0:
                commentary = commentary[:idx]

        commentary = clean_html(commentary)

        if commentary and len(commentary) > 20:
            key = f"{slug}-{chapter}-{verse_num}"
            entries.append((key, commentary))

    return entries


def main():
    # Build list of all chapter fetch jobs
    jobs = []
    for bh_book, slug, num_chapters in BOOKS:
        for ch in range(1, num_chapters + 1):
            jobs.append((bh_book, slug, ch))

    total_chapters = len(jobs)
    print(f"Fetching {total_chapters} chapters with 10 concurrent workers...")
    sys.stdout.flush()

    result = {}
    done = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_chapter, bh, sl, ch): (bh, sl, ch) for bh, sl, ch in jobs}

        for future in as_completed(futures):
            bh, sl, ch = futures[future]
            done += 1

            try:
                entries = future.result()
                for key, text in entries:
                    result[key] = text
            except Exception as e:
                errors += 1

            if done % 50 == 0 or done == total_chapters:
                print(f"  [{done}/{total_chapters}] {len(result)} verses extracted ({errors} errors)")
                sys.stdout.flush()

    # Write output
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False)

    size_mb = os.path.getsize(OUT_PATH) / 1024 / 1024
    print(f"\n=== DONE ===")
    print(f"Total: {len(result)} verse commentaries")
    print(f"Errors: {errors}")
    print(f"Written to {OUT_PATH} ({size_mb:.1f} MB)")
    sys.stdout.flush()


if __name__ == '__main__':
    main()
