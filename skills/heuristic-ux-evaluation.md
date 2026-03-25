# Skill: Heuristic UX Evaluation for Field-Service Mobile

## Prompt Template

```
You are performing a heuristic UX evaluation of a mobile app used by roadside
battery technicians in the field. Apply NNG's 10 usability heuristics, adapted
for field-service mobile context.

INPUT:
- Screen recording frames in: screenshots/[MODULE_NAME]/
- Module: [MODULE_NAME]
- App: [APP_NAME] — [brief description of what this module does]
- User context: [technician role, device type, likely environment — e.g.,
  "field technician, iPhone, outdoor daylight, may be wearing gloves"]

HEURISTIC FRAMEWORK:
Evaluate each distinct screen state against these 10 heuristics:

H1  Visibility of system status
    Progress indicators, loading states, sync status, connectivity, availability.
    Does the user always know what the system is doing?

H2  Match between system and real world
    Technician/domain vocabulary. Does UI language match how techs talk about
    their work? Are icons meaningful in this context?

H3  User control and freedom
    Can users undo actions? Is back navigation reliable? Are there dead ends
    with no escape?

H4  Consistency and standards
    iOS platform conventions followed? Consistent within the app itself?
    (button placement, icon usage, terminology)

H5  Error prevention
    Are guard rails in place before mistakes happen? Destructive actions
    confirmed? Required fields indicated before submission?

H6  Recognition over recall
    Is necessary information visible on screen, or does it require the user
    to remember something from a previous screen?

H7  Flexibility and efficiency of use
    Shortcuts for experienced users? Can techs scan quickly to find what they
    need? Does the design reward familiarity?

H8  Aesthetic and minimalist design
    Signal-to-noise ratio. Is the visual hierarchy clear? Does it work in
    outdoor daylight? Is anything irrelevant or distracting present?

H9  Help users recognize, diagnose, and recover from errors
    When errors occur, are messages written in plain language? Do they explain
    what went wrong and what to do next?

H10 Help and documentation
    Is contextual help available? Are empty states informative? Is onboarding
    present where needed?

SEVERITY SCALE:
0 = Not a problem
1 = Minor — cosmetic issue, low frequency or low impact
2 = Moderate — causes friction, workaround exists
3 = Major — significant task disruption, no easy workaround
4 = Critical — prevents task completion or causes errors

FIELD-SERVICE MOBILE FAILURE MODES — specifically check for:
- Semantic color misuse: green used for errors or warnings
- Tap targets too small for gloved hands (minimum 44×44pt, prefer 48×48pt)
- Long lists without search or filter (density problem in field conditions)
- Inline validation shown before user has interacted with a field
- Disabled buttons or controls with no explanation of why
- Terminology mismatch: UI labels that don't match domain language
  (e.g., "asset" vs "battery", "case" vs "job")

TASK:
For each distinct screen state in the module:

1. Name the screen and describe its purpose (1 sentence)
2. List heuristic violations found, format:
   - [H#] [Heuristic name] | Severity [0-4]
     Issue: [specific description — what is wrong]
     Evidence: [what you see in the frame — be specific]
     Recommendation: [specific, actionable fix — not generic advice]
3. Note any positive patterns worth preserving

Then produce:

## Prioritized Findings Table
| # | Screen | Heuristic | Severity | Issue | Recommendation |
|---|--------|-----------|----------|-------|----------------|
(sorted by severity descending, then by heuristic number)

## Positive Patterns
- [Pattern]: [where observed, why it works]

OUTPUT FORMAT: Use the structure above. Be specific in evidence and
recommendations. "Replace green #4CAF50 with red #D32F2F for error states"
is a good recommendation. "Fix colors" is not.
```

---

## Methodology

### Why NNG's 10 heuristics, adapted

NNG's heuristics are the industry standard for structured expert evaluation without requiring live user testing. The adaptation for field-service mobile matters because the original heuristics were written for desktop software. Field conditions change the priority ordering: H8 (aesthetic and minimalist design) becomes a safety/legibility concern outdoors; H2 (match between system and real world) is especially loaded when domain vocabulary is highly specialized; H7 (efficiency) matters more when techs are performing high-volume repetitive tasks.

### Severity scale rationale

The 0–4 scale maps to prioritization decisions:
- 4 (Critical) and 3 (Major) go into the immediate action backlog
- 2 (Moderate) go into the next sprint consideration
- 1 (Minor) are tracked but deprioritized
- 0 is documented only to show it was considered

Record severity 0 findings sparingly — the point is not to document non-issues exhaustively, but to demonstrate that common problem areas were checked and found acceptable.

### Per-screen structure

Evaluate screen by screen first, then synthesize. This order matters: screen-level findings are concrete and evidence-backed; cross-screen patterns emerge from the synthesis pass. Don't skip to synthesis too early or you lose the specificity that makes recommendations actionable.

### Common field-service failure modes

These appear repeatedly across field-service mobile apps and are worth checking explicitly rather than waiting for them to surface organically:

- **Semantic color misuse** is surprisingly common — green status indicators repurposed for error alerts because the designer added an alert to an existing status row
- **Tap target sizing** is frequently under-spec on secondary actions (info icons, filter chips, inline delete)
- **Long lists without search** tend to appear in reference data screens (parts catalogs, customer lists) that were added late in development
- **Premature validation** (error shown before field is touched) creates a hostile first impression on forms
- **Disabled states without explanation** leave techs guessing whether something is a permissions issue, a data dependency, or a bug
- **Terminology mismatch** is often discovered only in field testing — audit vocabulary carefully against any domain glossary available
