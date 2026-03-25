# Skill: UX Audit Synthesis

## Prompt Template

```
You are synthesizing UX analysis notes into a structured audit document for a
single module of a field-service mobile app.

INPUT SOURCES (provide all that are available):
- Frame-by-frame scratch notes: [PATH or paste content]
- Heuristic evaluation output: [PATH or paste content]
- FigJam board context / BOARD-CONTEXT.md: [PATH or paste content]
- Meeting or workshop notes: [PATH or paste content]
- Promotional video analysis: [PATH or paste content]
- Module name: [MODULE_NAME]
- App name and version: [APP_NAME] [VERSION if known]

OUTPUT FILE: [MODULE_NAME]-AUDIT.md

DOCUMENT STRUCTURE:
Produce the audit document using this exact structure:

---

# [Module Name] UX Audit

## 1. Context
- What this module is for (1–2 sentences)
- Who uses it and when (user role, trigger condition)
- Key tasks it supports
- Device / OS context
- Any known constraints or design intent from stakeholder sources

## 2. Screen Inventory
| # | Screen Name | Purpose | Notes |
|---|-------------|---------|-------|
(list every distinct UI state observed, numbered, in task-flow order)

## 3. Heuristic Evaluation

### [Screen Name]
**[H# Heuristic Name]** | Severity [N]
Issue: [specific description]
Evidence: [what was observed]
Recommendation: [specific, actionable]

(repeat for each screen with findings; screens with no findings: note "No violations observed")

## 4. Prioritized Findings
| Priority | Screen | Heuristic | Severity | Issue | Recommendation |
|----------|--------|-----------|----------|-------|----------------|
(all findings, sorted severity 4→0, then by screen order)

## 5. Cross-Module Patterns
(findings that have also appeared in other modules — note the pattern name,
where else it appears, and why it is systemic rather than isolated)

## 6. Positive Patterns
(design decisions that work well and should be preserved or replicated)

## 7. Out of Scope / Assumptions
(items observed but not evaluated: back-end behavior, data quality issues,
anything requiring live testing to assess, deferred items)

---

SYNTHESIS RULES:

1. GROUP BY HEURISTIC, NOT BY SCREEN, when a finding spans multiple screens.
   If disabled-button-no-explanation appears on three screens, document it
   once in each screen's section (with screen-specific evidence), then elevate
   it to Cross-Module Patterns — do not duplicate the full recommendation
   three times.

2. RECOMMENDATIONS must be specific:
   Good: "Replace green #4CAF50 with red #D32F2F for all error state indicators"
   Bad: "Fix the color scheme"
   Good: "Increase tap target on the filter icon from 24×24pt to 44×44pt"
   Bad: "Make buttons bigger"

3. RECONCILE CONFLICTING SOURCES: If scratch notes and the heuristic pass
   disagree on severity, use the heuristic pass severity (it is structured)
   but note the discrepancy in the finding.

4. DO NOT INVENT FINDINGS. If you are uncertain whether something is a
   violation, flag it as an assumption in section 7 and note what additional
   information would confirm it.

5. DEDUPLICATION with existing baseline: If a BOARD-CONTEXT.md exists,
   check whether a finding is already listed as a known pattern. If so,
   reference it rather than restating it in full.

After producing the audit document, produce a BOARD-CONTEXT.md UPDATE BLOCK:

---
## BOARD-CONTEXT.md Update Block

### Module Overview → [Module Name]
[Expanded description — 3–5 sentences]

### Key Pain Points → [Module Name]
- [Severity 3-4 findings as bullet points]

### App Screens Inventory — new rows to append
| Screen Name | Module | Notes |
|-------------|--------|-------|

### UX Audit Framework → Key Audit Areas — new entry
**[Module Name]:** [2-sentence summary of audit focus and key findings]
---
```

---

## Methodology

### Input sources and their roles

Each input source contributes differently to the synthesis:

- **Frame-by-frame scratch notes** — raw observations, often redundant, always specific. Use for evidence; do not use verbatim as findings.
- **Heuristic evaluation output** — structured findings with severity ratings. This is the primary input for sections 3 and 4.
- **FigJam board / BOARD-CONTEXT.md** — stakeholder framing, known issues, module intent. Use to calibrate severity (a known-low-priority item may not warrant severity 3 in the audit) and to identify cross-module patterns already documented.
- **Meeting/workshop notes** — often contain the "why" behind design decisions. A finding that looks like a violation may have a deliberate rationale; check here before writing a recommendation that contradicts a known constraint.
- **Promotional video** — useful for identifying intended user experience vs. actual experience. Mismatch between promo and functional app is itself a finding.

### Document structure decisions

The structure moves from context to specifics to synthesis, mirroring how a reader will process it:

1. Context first — establishes what the module is supposed to do before listing what it does wrong
2. Screen inventory — creates a shared reference frame (numbered screens can be cited in findings)
3. Heuristic evaluation — detailed, screen-level findings with evidence
4. Prioritized table — executive summary; most stakeholders will read only this
5. Cross-module patterns — the highest-value synthesis output; systemic issues get fixed once, not screen by screen
6. Positive patterns — prevents the audit from reading as purely negative; also documents what not to change
7. Out of scope — establishes audit boundaries and surfaces deferred work

### Grouping by heuristic, not screen

Grouping under the heuristic name in Cross-Module Patterns forces stakeholders to see recurrence as a design system problem, not a per-screen fix list. "Disabled buttons with no explanation" appearing in three modules is a component-level problem, not three separate issues.

### Writing actionable recommendations

Generic recommendations ("improve error messaging") cannot be acted on without additional analysis. Specific recommendations ("rewrite the 'Connection failed' message to read: 'Could not reach server. Check your mobile signal and try again.'") can be handed directly to a designer or developer. The extra effort in the audit saves multiple rounds of clarification later.

### Integrating into BOARD-CONTEXT.md

The baseline context document grows with each module audit. The update block format ensures new module findings slot into the existing structure without requiring someone to manually reformat the whole document. Treat BOARD-CONTEXT.md as an append-only log of the audit's growing understanding of the app — never overwrite existing entries, only extend them.

### What belongs in Out of Scope

Assumptions, data quality issues, back-end behavior, and anything that requires live device testing to verify should go here rather than into findings. An audit based on screen recordings cannot assess haptic feedback, response time under real network conditions, or behavior on low-end devices. Documenting these as out of scope is not a limitation — it is intellectual honesty that protects the audit's credibility.
