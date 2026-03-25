# End-to-End Process: UX Audit → FigJam Research Board

A replicable methodology for turning raw research sources (screen recordings, meeting notes, strategy boards) into a structured, programmatically-populated FigJam board via a custom plugin.

---

## Phase 1 — Gather & Structure Context

**Sources consumed:**
- FigJam strategy sprint board (exported as screenshots)
- Granola meeting notes (exported as text)
- Screen recordings of the product (main app + restricted modules)
- Promotional or onboarding videos

**Frame extraction (ffmpeg):**
```bash
# Standard rate for dense app recordings
ffmpeg -i "video/recording.MP4" -vf fps=1/3 screenshots/folder/frame_%04d.png

# Lower rate for marketing/promo videos
ffmpeg -i "video/promo.MP4" -vf fps=1/5 screenshots/promo/frame_%04d.png
```

Frames are then read in batches of ~25 using a multimodal model (Claude can render PNGs directly), documenting observations per screen as a running scratch file.

**Synthesis into BOARD-CONTEXT.md:**
A single synthesis document produced from all sources, covering:
- Engagement overview, users, goals, desired outcomes
- Module overview (all product modules)
- Core workflow
- Key pain points (organised by area, not screen)
- App screens inventory
- UX audit framework (NNG heuristics adapted for the product context, severity scale 0–4)

**Per-module audit docs (e.g. INVENTORY-AUDIT.md):**
For restricted or separately-recorded modules, a second document structured as:
- Module context + navigation architecture
- Screens inventory
- Heuristic evaluation (H1–H10 with per-screen findings)
- Prioritised findings table (each finding: ID, screen, heuristic, severity, recommendation)
- Systemic patterns (shared-component issues across screens)
- Positive patterns to preserve
- Design principles derived from findings
- Open questions

---

## Phase 2 — Build the FigJam Plugin

The plugin is a **self-contained `code.js`** loaded into Figma's plugin runner. It has no runtime dependencies — all images are base64-embedded at build time.

**Architecture (3 source files → 1 generated file):**

```
findings-data.js   ←  project-specific data (findings, images, context cards)
template.js        ←  rendering engine (Figma Plugin API calls)
build.js           ←  bundler (base64-encodes images, concatenates, writes code.js)
manifest.json      ←  plugin metadata (name, entry point, editor type)
                       ↓  node build.js
code.js            ←  GENERATED — what Figma loads; ~8 MB; gitignored
```

**`findings-data.js` structure:**
```js
module.exports = {
  targetPage: "Audit Test",       // FigJam page name to target
  contextCards: [...],            // Row 1: 4 context overview cards
  boardScreenshots: [...],        // Row 2: strategy sprint screenshots
  painPointSections: [...],       // Row 3: sections with severity-rated stickies
  positivePatterns: [...],        // Row 4 left: patterns to preserve
  framework: { heuristics, severityScale },  // Row 4 right: methodology ref
  appFrames: [...],               // Row 4 bottom: curated app screenshots
  inventoryFrames: [...]          // Row 5: additional module screenshots
};
```

**Sticky severity colours (NNG scale):**
| Severity | Label | Colour |
|---|---|---|
| 4 | Critical | Red |
| 3 | Major | Orange |
| 2 | Moderate | Yellow |
| 1 | Minor | Light green |
| 0 | Not a problem | White |

**Build step:**
```bash
cd figjam-plugin && node build.js
# Outputs: "Wrote code.js — N KB"
# Any "WARNING: image not found" → fix the path and re-run
```

---

## Phase 3 — Curate Key Frames

For each module's "key screens" row, frames were selected by:

1. Identifying the ~10–12 most important screens from the audit document
2. Estimating approximate frame numbers from the video timeline (`duration_seconds ÷ frame_interval × screen_position_fraction`)
3. Visually spot-checking candidate frames by reading the PNG (a multimodal model renders them inline)
4. Swapping to adjacent frames (±1–3) if a frame caught a transition or wrong state

**Goal per frame:** capture the specific UI state being cited in the audit finding, not just the screen in general. For example, the frame showing a negative AVBL QTY of –3 is more useful than a clean version of the same screen.

---

## Phase 4 — Extend the Plugin for a New Module

When a new module is added (e.g. the Inventory module was added in a second session), only three types of changes are needed:

**`findings-data.js`** — add new data:
- Append new sections to `painPointSections`, preceded by a `{ title: "MODULE NAME", moduleDivider: true, stickies: [] }` sentinel
- Append new positive patterns to `positivePatterns`
- Add a new `inventoryFrames` (or equivalent) array

**`template.js`** — add new rendering logic:
- Handle `moduleDivider: true` in the section loop (renders a full-width heading bar instead of a grid cell)
- Add a new row rendering block that checks for the new image array

**`build.js`** — include the new image array in the bundler's `imageEntries` and `cleanData`

The `template.js` and `build.js` changes are **generic** — any future module addition primarily requires new data in `findings-data.js`.

---

## Phase 5 — Load & Run in Figma

1. Open the FigJam file in **Figma desktop** (not browser — plugins require the desktop app)
2. Ensure a blank page named exactly as specified in `targetPage` exists in the file
3. **Plugins → Development → Import plugin from manifest...** → select `figjam-plugin/manifest.json`
4. **Plugins → Development → UX Audit Board Writer** → run
5. Wait ~15–20 seconds — the board renders and auto-zooms to fit

> **Re-running:** The plugin appends — it does not clear the page first. Delete all content on the page before re-running to avoid duplicates.

---

## Replication Checklist

```
□ Screen recording(s) of the product
□ Any strategy/research board screenshots (FigJam, Miro, etc.)
□ Meeting notes or transcripts
□ ffmpeg installed (for frame extraction)
□ Node.js installed (for the build step)
□ Figma desktop app + a FigJam file with a blank target page
□ findings-data.js populated with your audit content
□ node build.js run successfully (no image warnings)
□ manifest.json imported into Figma desktop
```

---

## Skill Templates

The `/skills/` folder contains prompt templates that codify the methodology for future Claude sessions:

| File | Purpose |
|---|---|
| `skills/video-frame-extraction.md` | ffmpeg settings + batch reading strategy |
| `skills/heuristic-ux-evaluation.md` | How to apply H1–H10 to mobile screenshots |
| `skills/ux-audit-synthesis.md` | How to synthesise multi-source findings into a structured document |

Each skill file contains a **Prompt Template** section (copy-paste ready for a new session) and a **Methodology** section (rationale and configuration choices).
