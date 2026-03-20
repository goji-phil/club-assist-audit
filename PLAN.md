# Plan: FigJam Board Analysis & UX Audit Setup

## Context

Club Assist x Goji engagement to modernize the **Toolbox app** — a legacy mobile app used by roadside technicians for battery replacement (fitment, diagnostics, e-invoicing). 1.6M invoices/year. Core functionality is solid; the goal is UI/UX modernization and brand alignment.

Six sources of context to synthesize:
1. **FigJam strategy sprint board** — programmatically accessible via Figma MCP
2. **workshop-context/ screenshots** — 4 manual FigJam captures already on disk
3. **Granola meeting notes** — 3 files in `workshop-context/`:
   - `club-assist-x-goji-strategy-kickoff.md`
   - `club-assist-x-goji-strategy-workshop-1` (user journeys, integrations, battery selection)
   - `club-assist-x-goji-startegy-workshop-2` (onboarding, payment flow, permissions, scorecard)
4. **Screen recording of the live app** — `video/ScreenRecording_03-20-2026 15-13-53_1.MP4`
5. **Club Assist promotional video (e-invoicing)** — `video/promotional-eInvoicing.mp4`

**FigJam file key:** `uQMrRsuXiezSGuAEkU9Hyj`
**FigJam URL:** `https://www.figma.com/board/uQMrRsuXiezSGuAEkU9Hyj/Club-Assist-x-Goji----Strategy-Sprint`
**Nodes to process:**
- `107-279` — strategy sprint (goals, challenges, desired outcomes)
- `107-280` — current customer journey workshop
- `212-1244` — app screens for visual analysis

---

## Progress Checklist

> Track execution status here. Update each item as work completes.

### Wave 1 (parallel)
- [ ] **A — Screen recording frames extracted** → `screenshots/app-recording/`
- [ ] **A — Screen recording analyzed** → observations written to scratch notes
- [ ] **B — Promo video frames extracted** → `screenshots/promo/`
- [ ] **B — Promo video analyzed** → brand/style notes written
- [ ] **C — FigJam board text extracted** → all sticky note content from 107-279, 107-280, 212-1244
- [ ] **C — FigJam section screenshots exported** → `screenshots/01-06`

### Wave 2 (sequential)
- [ ] **BOARD-CONTEXT.md created** — full synthesis of all 6 sources
- [ ] **Plan file copied to project** → `PLAN.md` in project root
- [ ] **Verification passed** — all checklist items in Verification section confirmed

---

## Parallelization Strategy

Work is split into three independent tracks run in **Wave 1** simultaneously. Wave 2 begins only after all three complete.

```
Wave 1 (all 3 agents run in parallel):
┌─────────────────────────────────────────────────────────┐
│  Agent A: Video — Screen Recording                      │
│  - mkdir screenshots/app-recording                      │
│  - ffmpeg extract frames (1 per 3s)                     │
│  - Read all frames, document screens + friction points  │
│  Output: frame images + written observations            │
├─────────────────────────────────────────────────────────┤
│  Agent B: Video — Promotional Video                     │
│  - mkdir screenshots/promo                              │
│  - ffmpeg extract frames (1 per 5s)                     │
│  - Read frames, document brand style + claims           │
│  Output: frame images + written brand notes             │
├─────────────────────────────────────────────────────────┤
│  Agent C: Figma MCP                                     │
│  - get_file to walk document tree                       │
│  - Extract all text from nodes 107-279, 107-280,        │
│    212-1244                                             │
│  - Export PNG for each section (01–06)                  │
│  Output: screenshots/01-06 + text content dump          │
└─────────────────────────────────────────────────────────┘
          ↓ all complete ↓

Wave 2 (sequential):
┌─────────────────────────────────────────────────────────┐
│  Synthesis                                              │
│  - Read outputs from A, B, C                           │
│  - Read 3 Granola notes files                          │
│  - Write workshop-context/BOARD-CONTEXT.md             │
│  - Copy plan to project root as PLAN.md                │
└─────────────────────────────────────────────────────────┘
```

---

## Step 0: Save plan to project

Copy this plan to `PLAN.md` in the project root so it's tracked in version control alongside the audit materials.

---

## Step 1 (Wave 1) — Agent A: Screen recording analysis

```bash
mkdir -p screenshots/app-recording
ffmpeg -i "video/ScreenRecording_03-20-2026 15-13-53_1.MP4" \
  -vf fps=1/3 screenshots/app-recording/frame_%04d.png
```

Read all extracted frames in sequence. For each screen, document:
- Screen name / purpose
- Primary action or content
- UI issues observed (clutter, text size, tap targets, affordances, contrast)
- Moments of friction (hesitation, backtracking, errors)
- Positive patterns worth preserving

---

## Step 2 (Wave 1) — Agent B: Promotional video analysis

```bash
mkdir -p screenshots/promo
ffmpeg -i "video/promotional-eInvoicing.mp4" \
  -vf fps=1/5 screenshots/promo/frame_%04d.png
```

Read all extracted frames. Document:
- Visual brand language (colours, typography, iconography, tone)
- How e-invoicing is framed/positioned for technicians
- Claims and benefits shown — note gaps vs. real workflow
- Any UI shown that differs from the live screen recording

---

## Step 3 (Wave 1) — Agent C: FigJam MCP extraction + screenshot export

Using Figma MCP (`http://127.0.0.1:3845/mcp`):

1. `get_file` with key `uQMrRsuXiezSGuAEkU9Hyj` — retrieve full document tree
2. Walk nodes to find all sections; extract all text content from:
   - `107-279` — strategy sprint (goals, challenges, desired outcomes)
   - `107-280` — customer journey workshop
   - `212-1244` — app screens
3. `get_images` export each section node as PNG (2x scale) → save to `screenshots/`:
   - `01-general-download.png`
   - `02-user-goals.png`
   - `03-challenges-questions.png`
   - `04-desired-outcome.png`
   - `05-customer-journey.png` (node 107-280)
   - `06-app-screens.png` (node 212-1244 — export sub-frames individually if it contains multiple screens)

---

## Step 4 (Wave 2) — Synthesize BOARD-CONTEXT.md

Create `workshop-context/BOARD-CONTEXT.md` combining outputs from all three Wave 1 agents plus the three Granola notes.

### Structure

```
# Club Assist x Goji — UX Audit Context

## Engagement Overview
  - Client, scope, Goji/Club Assist team members
  - Toolbox app: what it is, scale (1.6M invoices/yr), three modules

## Users & Demographics
  - Primary: Field technicians (age 20s–70s)
  - Secondary: Club/location managers
  - Device context: MDM-locked, outdoor use, bright sun
  - Language: EN, ES, FR-CA

## Core Workflow (Technician Journey)
  - Pre-dispatch → Dispatch → MVC1000 sync → Battery selection
    → Estimate → Invoice → Payment → Installation → Completion
  - Time on scene: 15–25 min (north star: reduce)
  - Integration chain: Salesforce → MVC1000 → Toolbox → E-invoicing

## Module Overview
  - Battery fitment guide (core)
  - E-invoicing (most-used add-on)
  - Inventory/Stock Assist (limited deployment)
  - Technician scorecard (club decision)

## Key Pain Points
  (from FigJam board + workshops + screen recording)

## Open Questions & Challenges
  (from FigJam Challenges/Questions section)

## Desired Outcomes
  (from FigJam Desired Outcome section)

## Live App Observations
  (from screen recording: screen-by-screen, friction points, positives)

## Brand & Marketing Reference
  (from promotional video: style, claims, positioning)

## Current Customer Journey
  (from FigJam node 107-280: step-by-step map, gaps)

## App Screens Inventory
  (from FigJam node 212-1244: per-screen purpose + observations)

## Technical Constraints
  - Offline-first, MDM-locked, EN/ES/FR-CA, no in-app payment, GDPR future

## UX Audit Framework

  ### Scope & Objectives

  ### Methodology
    - Heuristic walkthrough (adapted Nielsen's 10)
    - User flow audit (full technician journey)
    - Prioritization matrix

  ### Heuristics (adapted for field-service mobile)
    1. Visibility of system status
    2. Match with real-world workflow (no scroll)
    3. User control & error recovery
    4. Consistency & standards
    5. Error prevention (fitment, CCA input)
    6. Recognition over recall (TSBs, docs)
    7. Flexibility & efficiency
    8. Aesthetic & minimalist design
    9. Accessibility (font scaling, contrast, outdoor)
    10. Help & documentation (contextual)

  ### Severity Scale
    0 = Not a problem | 1 = Minor | 2 = Moderate
    3 = Major | 4 = Critical

  ### Key Audit Areas
    - Battery fitment lookup & vehicle details
    - TSB / install doc surfacing + persistence
    - E-invoicing flow (item selection, tiers, tax)
    - Payment flow (timing variation, UX)
    - Reference library (pre-dispatch docs)
    - Onboarding / first-run
    - Feedback submission
    - Sync status visibility
    - Brand presence & visual consistency
    - Multilingual content & layout

  ### Prioritization Framework
    Critical → High → Medium → Low/Nice-to-have
```

---

## Files to Create

| File | Source |
|------|--------|
| `PLAN.md` | Copy of this plan for project version control |
| `workshop-context/BOARD-CONTEXT.md` | Synthesized context + audit framework |
| `screenshots/01-general-download.png` | Figma MCP export — node 107-279 |
| `screenshots/02-user-goals.png` | Figma MCP export — node 107-279 |
| `screenshots/03-challenges-questions.png` | Figma MCP export — node 107-279 |
| `screenshots/04-desired-outcome.png` | Figma MCP export — node 107-279 |
| `screenshots/05-customer-journey.png` | Figma MCP export — node 107-280 |
| `screenshots/06-app-screens.png` | Figma MCP export — node 212-1244 |
| `screenshots/app-recording/frame_NNNN.png` | ffmpeg from screen recording |
| `screenshots/promo/frame_NNNN.png` | ffmpeg from promotional video |

**Read-only (do not modify):**
- `workshop-context/club-assist-x-goji-strategy-kickoff.md`
- `workshop-context/club-assist-x-goji-strategy-workshop-1`
- `workshop-context/club-assist-x-goji-startegy-workshop-2`
- `workshop-context/CleanShot *.png`
- `video/*.MP4` / `video/*.mp4`

---

## Verification

1. `PLAN.md` exists in project root
2. `workshop-context/BOARD-CONTEXT.md` exists and covers all sections
3. `screenshots/01–06` all contain non-empty PNGs from FigJam
4. `screenshots/app-recording/` contains extracted frames
5. `screenshots/promo/` contains extracted frames
6. Live App Observations and Brand Reference sections are populated in the context file
7. All 3 Granola notes are reflected in the context file
8. UX audit framework includes heuristics, severity scale, and audit areas
