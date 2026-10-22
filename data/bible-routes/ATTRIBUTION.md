# UBS Bible Routes Attribution

Route geometry sourced from [Bible Routes from UBS Project MARBLE](https://github.com/ubsicap/ubs-open-license/tree/main/ubs-bible-routes), part of the United Bible Societies' open-license collection.

© United Bible Societies 2023. Routes created for UBS by Dr. Leen Ritmeyer.

`raw/GeoJsonRoutes/` (179 files) and `raw/metadata.csv` are vendored as-is from that repository. The SVG counterparts were not vendored — this project renders its own styled paths from the GeoJSON coordinates rather than embedding the Illustrator-exported SVGs.

`routes.json` (and any other normalized/derived file in this directory) is produced from that raw data by `scripts/parse-bible-routes.ts` in this repo and is itself a **CC BY-SA 4.0 adaptation** — see License below.

## License

CC BY-SA 4.0 — Creative Commons Attribution-ShareAlike 4.0 International.

Full text: https://creativecommons.org/licenses/by-sa/4.0/ (also vendored at `raw/LICENSE.md`).

**This is a ShareAlike license.** Any page, dataset, or export on this site that uses this route geometry (directly or via `routes.json`) must:
- Credit "UBS Bible Routes, © United Bible Societies / Dr. Leen Ritmeyer" with a link back to the source repository above.
- Remain available under CC BY-SA 4.0 if redistributed as data (not just displayed as part of a page).

Do not strip this attribution when reusing `routes.json` elsewhere in the codebase.
