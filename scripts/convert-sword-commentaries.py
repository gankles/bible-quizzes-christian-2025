#!/usr/bin/env python3
"""
Convert SWORD commentary modules (zCom and zCom4) to JSON.
Outputs one JSON file per commentary: data/commentaries/{name}.json
Each file maps "book-chapter-verse" keys to commentary text (HTML stripped).
"""

import struct, zlib, os, json, re, sys

SWORD_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'sword-modules')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'commentaries')

# KJV versification: book order and verse counts per chapter
# (book_name, osis_abbrev, chapters: [verse_counts])
KJV_BOOKS_OT = [
    ("Genesis", "Gen", [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]),
    ("Exodus", "Exod", [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]),
    ("Leviticus", "Lev", [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]),
    ("Numbers", "Num", [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]),
    ("Deuteronomy", "Deut", [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]),
    ("Joshua", "Josh", [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]),
    ("Judges", "Judg", [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]),
    ("Ruth", "Ruth", [22,23,18,22]),
    ("1 Samuel", "1Sam", [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]),
    ("2 Samuel", "2Sam", [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]),
    ("1 Kings", "1Kgs", [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]),
    ("2 Kings", "2Kgs", [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]),
    ("1 Chronicles", "1Chr", [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]),
    ("2 Chronicles", "2Chr", [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]),
    ("Ezra", "Ezra", [11,70,13,24,17,22,28,36,15,44]),
    ("Nehemiah", "Neh", [11,20,32,23,19,19,73,18,38,39,36,47,31]),
    ("Esther", "Esth", [22,23,15,17,14,14,10,17,32,3]),
    ("Job", "Job", [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]),
    ("Psalms", "Ps", [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]),
    ("Proverbs", "Prov", [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]),
    ("Ecclesiastes", "Eccl", [18,26,22,16,20,12,29,17,18,20,10,14]),
    ("Song of Solomon", "Song", [17,17,11,16,16,13,13,14]),
    ("Isaiah", "Isa", [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]),
    ("Jeremiah", "Jer", [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]),
    ("Lamentations", "Lam", [22,22,66,22,22]),
    ("Ezekiel", "Ezek", [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]),
    ("Daniel", "Dan", [21,49,30,37,31,28,28,27,27,21,45,13]),
    ("Hosea", "Hos", [11,23,5,19,15,11,16,14,17,15,12,14,16,9]),
    ("Joel", "Joel", [20,32,21]),
    ("Amos", "Amos", [15,16,15,13,27,14,17,14,15]),
    ("Obadiah", "Obad", [21]),
    ("Jonah", "Jonah", [17,10,10,11]),
    ("Micah", "Mic", [16,13,12,13,15,16,20]),
    ("Nahum", "Nah", [15,13,19]),
    ("Habakkuk", "Hab", [17,20,19]),
    ("Zephaniah", "Zeph", [18,15,20]),
    ("Haggai", "Hag", [15,23]),
    ("Zechariah", "Zech", [21,13,10,14,11,15,14,23,17,12,17,14,9,21]),
    ("Malachi", "Mal", [14,17,18,6]),
]

KJV_BOOKS_NT = [
    ("Matthew", "Matt", [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]),
    ("Mark", "Mark", [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]),
    ("Luke", "Luke", [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]),
    ("John", "John", [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]),
    ("Acts", "Acts", [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]),
    ("Romans", "Rom", [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]),
    ("1 Corinthians", "1Cor", [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]),
    ("2 Corinthians", "2Cor", [24,17,18,18,21,18,16,24,15,18,33,21,14]),
    ("Galatians", "Gal", [24,21,29,31,26,18]),
    ("Ephesians", "Eph", [23,22,21,32,33,24]),
    ("Philippians", "Phil", [30,30,21,23]),
    ("Colossians", "Col", [29,23,25,18]),
    ("1 Thessalonians", "1Thess", [10,20,13,18,28]),
    ("2 Thessalonians", "2Thess", [12,17,18]),
    ("1 Timothy", "1Tim", [20,15,16,16,25,21]),
    ("2 Timothy", "2Tim", [18,26,17,22]),
    ("Titus", "Titus", [16,15,15]),
    ("Philemon", "Phlm", [25]),
    ("Hebrews", "Heb", [14,18,19,16,14,20,28,13,28,39,40,29,25]),
    ("James", "Jas", [27,26,18,17,20]),
    ("1 Peter", "1Pet", [25,25,22,19,14]),
    ("2 Peter", "2Pet", [21,22,18]),
    ("1 John", "1John", [10,29,24,21,21]),
    ("2 John", "2John", [13]),
    ("3 John", "3John", [14]),
    ("Jude", "Jude", [25]),
    ("Revelation", "Rev", [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]),
]

# Slug mapping for output keys
BOOK_SLUGS = {
    "Genesis": "genesis", "Exodus": "exodus", "Leviticus": "leviticus",
    "Numbers": "numbers", "Deuteronomy": "deuteronomy", "Joshua": "joshua",
    "Judges": "judges", "Ruth": "ruth", "1 Samuel": "1-samuel",
    "2 Samuel": "2-samuel", "1 Kings": "1-kings", "2 Kings": "2-kings",
    "1 Chronicles": "1-chronicles", "2 Chronicles": "2-chronicles",
    "Ezra": "ezra", "Nehemiah": "nehemiah", "Esther": "esther",
    "Job": "job", "Psalms": "psalms", "Proverbs": "proverbs",
    "Ecclesiastes": "ecclesiastes", "Song of Solomon": "song-of-solomon",
    "Isaiah": "isaiah", "Jeremiah": "jeremiah", "Lamentations": "lamentations",
    "Ezekiel": "ezekiel", "Daniel": "daniel", "Hosea": "hosea",
    "Joel": "joel", "Amos": "amos", "Obadiah": "obadiah", "Jonah": "jonah",
    "Micah": "micah", "Nahum": "nahum", "Habakkuk": "habakkuk",
    "Zephaniah": "zephaniah", "Haggai": "haggai", "Zechariah": "zechariah",
    "Malachi": "malachi", "Matthew": "matthew", "Mark": "mark",
    "Luke": "luke", "John": "john", "Acts": "acts", "Romans": "romans",
    "1 Corinthians": "1-corinthians", "2 Corinthians": "2-corinthians",
    "Galatians": "galatians", "Ephesians": "ephesians",
    "Philippians": "philippians", "Colossians": "colossians",
    "1 Thessalonians": "1-thessalonians", "2 Thessalonians": "2-thessalonians",
    "1 Timothy": "1-timothy", "2 Timothy": "2-timothy", "Titus": "titus",
    "Philemon": "philemon", "Hebrews": "hebrews", "James": "james",
    "1 Peter": "1-peter", "2 Peter": "2-peter", "1 John": "1-john",
    "2 John": "2-john", "3 John": "3-john", "Jude": "jude",
    "Revelation": "revelation",
}


def strip_osis(text):
    """Strip OSIS XML markup to plain text, preserving paragraph breaks."""
    # Convert paragraph/div breaks to newlines
    text = re.sub(r'<div[^>]*type="x-p"[^>]*/>', '\n', text)
    text = re.sub(r'<div[^>]*>', '', text)
    text = re.sub(r'</div>', '', text)
    # Convert <hi type="bold"> to **bold**
    text = re.sub(r'<hi type="bold">(.*?)</hi>', r'**\1**', text)
    # Convert <hi type="italic"> to *italic*
    text = re.sub(r'<hi type="italic">(.*?)</hi>', r'*\1*', text)
    # Convert <hi type="super"> (verse numbers)
    text = re.sub(r'<hi type="super">(\d+)</hi>', r'[\1]', text)
    # Convert <hi type="small-caps"> (LORD etc)
    text = re.sub(r'<hi type="small-caps">(.*?)</hi>', lambda m: m.group(1).upper(), text)
    # Convert scripture references to plain text
    text = re.sub(r'<reference[^>]*>(.*?)</reference>', r'\1', text)
    # Strip remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    # Clean whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()


def read_sword_commentary(module_dir, mod_drv):
    """Read a SWORD commentary module and return {testament: {verse_index: text}}."""
    result = {}

    for testament in ['ot', 'nt']:
        # Find the data directory — files may be .bzs/.bzv/.bzz or .czs/.czv/.czz
        data_dir = None
        ext_prefix = 'b'
        for root, dirs, files in os.walk(module_dir):
            if f'{testament}.bzz' in files:
                data_dir = root
                ext_prefix = 'b'
                break
            if f'{testament}.czz' in files:
                data_dir = root
                ext_prefix = 'c'
                break

        if not data_dir:
            print(f"  Warning: No {testament} data found")
            continue

        bzs_path = os.path.join(data_dir, f'{testament}.{ext_prefix}zs')
        bzv_path = os.path.join(data_dir, f'{testament}.{ext_prefix}zv')
        bzz_path = os.path.join(data_dir, f'{testament}.{ext_prefix}zz')

        with open(bzs_path, 'rb') as f:
            bzs_data = f.read()
        with open(bzv_path, 'rb') as f:
            bzv_data = f.read()
        with open(bzz_path, 'rb') as f:
            bzz_data = f.read()

        # Parse block index (always 12 bytes per entry)
        blocks = []
        for i in range(len(bzs_data) // 12):
            offset, size, _ = struct.unpack_from('<III', bzs_data, i * 12)
            blocks.append((offset, size))

        # Parse verse index
        if mod_drv == 'zCom4':
            entry_size = 12
            entry_fmt = '<III'  # block_num, offset, size (all u32)
        else:
            entry_size = 10
            entry_fmt = '<IIH'  # block_num, offset, size (u32, u32, u16)

        num_verses = len(bzv_data) // entry_size

        # Cache decompressed blocks
        block_cache = {}
        testament_data = {}

        for vi in range(num_verses):
            block_num, offset_in_block, size_in_block = struct.unpack_from(
                entry_fmt, bzv_data, vi * entry_size
            )

            if size_in_block == 0:
                continue

            if block_num >= len(blocks):
                continue

            # Decompress block if not cached
            if block_num not in block_cache:
                block_offset, block_size = blocks[block_num]
                if block_size == 0:
                    continue
                try:
                    compressed = bzz_data[block_offset:block_offset + block_size]
                    block_cache[block_num] = zlib.decompress(compressed)
                except Exception:
                    continue

            if block_num not in block_cache:
                continue

            decompressed = block_cache[block_num]
            if offset_in_block + size_in_block > len(decompressed):
                continue

            raw = decompressed[offset_in_block:offset_in_block + size_in_block]
            try:
                text = raw.decode('utf-8', errors='replace')
                text = strip_osis(text)
                if text and len(text) > 10:
                    testament_data[vi] = text
            except Exception:
                continue

        result[testament] = testament_data

    return result


def verse_index_to_key(verse_index, testament):
    """Convert a continuous verse index to book-chapter-verse key."""
    books = KJV_BOOKS_OT if testament == 'ot' else KJV_BOOKS_NT
    idx = verse_index

    for book_name, _, chapters in books:
        for ch_num, verse_count in enumerate(chapters, 1):
            if idx < verse_count:
                verse_num = idx + 1
                slug = BOOK_SLUGS.get(book_name)
                if slug:
                    return f"{slug}-{ch_num}-{verse_num}"
                return None
            idx -= verse_count

    return None


def convert_module(name, module_dir, mod_drv):
    """Convert a single SWORD module to JSON."""
    print(f"\nConverting {name} ({mod_drv})...")

    data = read_sword_commentary(module_dir, mod_drv)
    output = {}
    total = 0

    for testament in ['ot', 'nt']:
        if testament not in data:
            continue
        for verse_idx, text in data[testament].items():
            key = verse_index_to_key(verse_idx, testament)
            if key:
                output[key] = text
                total += 1

    print(f"  Extracted {total} verse commentaries")
    return output


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    modules = {
        'MHC': ('MHC', 'zCom4'),
        'MHCC': ('MHCC', 'zCom'),
        'Barnes': ('Barnes', 'zCom'),
        'Clarke': ('Clarke', 'zCom'),
        'JFB': ('JFB', 'zCom4'),
        'Wesley': ('Wesley', 'zCom'),
        'CalvinCommentaries': ('CalvinCommentaries', 'zCom'),
        'RWP': ('RWP', 'zCom'),
        'KD': ('KD', 'zCom4'),
    }

    summary = {}

    for name, (dir_name, mod_drv) in modules.items():
        module_dir = os.path.join(SWORD_DIR, dir_name)
        if not os.path.exists(module_dir):
            print(f"Skipping {name}: directory not found")
            continue

        output = convert_module(name, module_dir, mod_drv)

        out_path = os.path.join(OUT_DIR, f'{name.lower()}.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False)

        size_mb = os.path.getsize(out_path) / 1024 / 1024
        summary[name] = {'verses': len(output), 'size_mb': round(size_mb, 1)}
        print(f"  Written to {out_path} ({size_mb:.1f} MB)")

    print("\n=== SUMMARY ===")
    for name, info in summary.items():
        print(f"  {name}: {info['verses']} verses, {info['size_mb']} MB")


if __name__ == '__main__':
    main()
