# UX Audit Board Writer

A reusable FigJam plugin that creates UX audit findings — sections, sticky notes, and screenshots — on a FigJam board page.

Structured for reuse: only the data file changes per project.

---

## File structure

```
figjam-plugin/
  manifest.json     — Plugin metadata (Figma reads this)
  code.js           — GENERATED file (do not edit manually)
  template.js       — Rendering engine (project-agnostic, reuse as-is)
  build.js          — Build script: reads images, generates code.js
  findings-data.js  — THIS PROJECT'S data only (swap for new projects)
  README.md         — This file
```

---

## How it works

1. `findings-data.js` defines all content: page target, context cards, screenshots, findings, and framework reference.
2. `build.js` reads any referenced image files, encodes them as base64, and combines everything with `template.js` to generate `code.js`.
3. `code.js` is what Figma loads and executes as the plugin. It is fully self-contained.

`template.js` and `build.js` are project-agnostic and do not need to change between projects.

---

## Running the plugin (first time or after changes)

### Step 1: Build

```bash
cd figjam-plugin
node build.js
```

This reads all referenced screenshots, encodes them as base64, and writes `code.js`.

### Step 2: Load in Figma desktop

1. Open the FigJam file in Figma desktop
2. Navigate to the target page — the name must match `targetPage` in `findings-data.js`
3. Go to Plugins → Development → Import plugin from manifest...
4. Select `figjam-plugin/manifest.json`

### Step 3: Run

1. Go to Plugins → Development → UX Audit Board Writer
2. Wait approximately 5–10 seconds while content is created
3. The board auto-fits to show all content when complete

---

## Reusing for a new project

Only one file needs to change.

**Replace `findings-data.js`** with the new project's content, following the same schema:

| Field | Description |
|---|---|
| `targetPage` | Name of the blank FigJam page to write to |
| `contextCards` | Header cards — each has a title, body, and color |
| `boardScreenshots` | Board screenshot images — each has a key, label, and path relative to project root |
| `painPointSections` | Findings grouped by area — each sticky has text and a severity level (1–4) |
| `positivePatterns` | String array of observed good patterns |
| `framework` | Heuristics and severity scale reference content |
| `appFrames` | Key app recording frames — each has a key, label, and path relative to project root |

After replacing `findings-data.js`, run `node build.js` and reload the plugin in Figma.

**Do not edit:** `template.js`, `build.js`, or `manifest.json` (unless you need to change the plugin name or ID).

---

## Severity color coding

| Level | Label | Color |
|---|---|---|
| 4 | Critical | Red |
| 3 | High | Orange |
| 2 | Medium | Yellow |
| 1 | Low | Light green |
| — | Positive | Sky blue |

---

## Safety

The plugin finds the target page by name at runtime. If no page with that name exists, it aborts without modifying anything. It never touches other pages.

---

## Re-running

If you run the plugin a second time on the same page, it will add duplicate content. Before re-running, either delete the existing content from the page manually, or undo the previous run with Cmd+Z immediately after an accidental execution.
