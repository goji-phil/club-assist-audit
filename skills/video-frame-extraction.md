# Skill: Video Frame Extraction for UX Analysis

## Prompt Template

```
You are performing UX analysis frame extraction for a mobile app screen recording.

INPUT:
- Video file: [PATH_TO_VIDEO]
- Module name: [MODULE_NAME] (e.g., "job-detail", "battery-test", "home-dashboard")
- Output directory: screenshots/[MODULE_NAME]/

TASK:
1. Extract frames from the video using ffmpeg at 1 frame per 3 seconds:

   ffmpeg -i [PATH_TO_VIDEO] -vf fps=1/3 screenshots/[MODULE_NAME]/frame_%04d.png

   If the video contains fast multi-step transitions or modal flows, re-extract
   the relevant segment at 1 frame per second:

   ffmpeg -i [PATH_TO_VIDEO] -ss [START_TIME] -to [END_TIME] -vf fps=1 \
     screenshots/[MODULE_NAME]/detail_%04d.png

2. Read the extracted frames in batches of ~25. For each batch:
   - Note the timestamp range covered (frame number × interval seconds)
   - List distinct UI states observed
   - Flag near-duplicate sequences (same screen, no state change) — note the range
     but do not document each frame individually
   - Call out any screens where higher-rate resampling would be valuable

3. Produce an initial observations document with:
   - Total frames extracted, timestamp range, batch count
   - Screen inventory: list of distinct states seen, in order of appearance
   - Flags for resampling (with timestamps)
   - Any immediately obvious UX issues noticed during extraction
     (do not evaluate yet — just note them for the heuristic pass)

OUTPUT FORMAT:
## Frame Extraction Summary
- Video: [filename]
- Duration: [X]s | Frames extracted: [N] at [rate]
- Batches read: [N] (~25 frames each)

## Distinct Screen States
1. [State name] — frames [X–Y], ~[timestamp]
2. ...

## Resampling Recommendations
- [Timestamp range]: [reason]

## Initial Observations (pre-evaluation)
- ...
```

---

## Methodology

### Why ffmpeg rather than manual screenshots

Manual screenshots require someone to watch the video in real time and judge when to capture — this introduces selection bias toward "interesting" moments and misses transitional states (loading spinners, validation feedback, partial renders). ffmpeg extracts deterministically: every state is captured at a consistent interval regardless of how visually compelling it looks.

For a UX audit, transitional states are often where the most heuristic violations live (H1: visibility of system status). Deterministic extraction catches them.

### Frame rate selection

- **1 frame per 3 seconds** — default for dense workflow apps. Captures most discrete UI states without generating hundreds of near-identical frames. A 3-minute recording yields ~60 frames, readable in 2–3 batches.
- **1 frame per 5 seconds** — use for marketing or promo videos where content changes slowly and transitions are decorative rather than functional.
- **1 frame per 1 second** — use for targeted resample of complex segments: multi-step modals, permission dialogs, error recovery flows, or any sequence with fast state transitions.

### Naming convention

`frame_%04d.png` — zero-padded four-digit index. Sorts correctly in any file browser, works with glob patterns, and makes batch ranges human-readable ("frames 0025–0049 cover the battery test flow").

### Directory structure

```
screenshots/
  [module-name]/
    frame_0001.png
    frame_0002.png
    ...
```

One directory per module. If a module has both standard and high-rate resampled frames, use a subdirectory: `screenshots/[module]/detail/`.

### Batch reading strategy

Read ~25 frames per batch to avoid context overflow. Before reading each batch, note the timestamp range it covers (frame number × extraction interval). This means if you need to revisit a specific moment, you can calculate which batch contains it without re-reading everything.

### Handling near-duplicate frames

Note the range ("frames 0012–0018 appear to be the same loading state") but only document the distinct entry and exit states. Over-documenting identical frames inflates the screen inventory and obscures the actual flow.
