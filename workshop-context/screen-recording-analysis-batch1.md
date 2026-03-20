# Club Assist Toolbox — Screen Recording UX Analysis (Frames 1–29)

---

## Overall Visual Style (established in these frames)

- **Post-login palette:** Dark navy (#0d2a5c range), bright cyan-blue CTAs, white text, near-black bottom tab bar
- **Typography:** Sans-serif white on dark; body text ~14–15px equivalent — marginal for outdoor use; tab bar labels very small (~11px, two-line wraps for "Warranty Calculator", "Prior to 1990")
- **Density:** Moderate to high; form-like layouts feel administrative, not task-oriented
- **Navigation:** Hamburger (top-left) + bottom tab bar (4 items) — two systems with no clear hierarchy, no breadcrumb, no progress indicator

---

## Screen Inventory

### 1 — Login + Notification Interrupt (frames 1, 2)

**UI Issues:**
- Notification permission dialog fires on cold launch before any app value shown — anti-pattern; "Don't Allow" is styled as the primary blue action (iOS default)
- Decorative rolling hills background photo: lowers contrast, adds zero utility, hurts outdoor readability
- Version number "2025.12.1 (365)" exposed as plain text below app name — support artefact, not user-facing
- "Sign Up" and "Login" are equal-weight CTAs — for a closed B2B field tool, Sign Up should not compete equally
- "PRIVACY POLICY" all-caps small link at bottom adds clutter

**Positive:** App name and logo mark are clean and well-sized

### 2 — Login Form / Keyboard Active (frames 3–12)

**UI Issues:**
- Keyboard covers Password field — no layout reflow; CTA buttons completely hidden while keyboard is up
- No "Next" / "Go" return key visible — keyboard behaviour on submit unclear
- iOS AutoFill surfacing personal email ("shellmao@gmail.com") — `textContentType` not configured to suppress on shared/MDM devices
- "Hide My Email" (iCloud Relay) option appearing — same cause
- No inline validation after email entry — no confirmation field accepted input
- Password eye icon tap target ~20×20px — too small for gloves/cold hands

**Loading state (frame 13):** "One moment please…" spinner — functional but spinner icon non-standard

**Friction:** No SSO or credential AutoFill configured — full manual email entry every login on MDM devices

### 3 — Battery Search (Default State) (frames 14–16, 18, 21–22)

**UI Issues:**
- **Ghost white rectangle** over Make/Model dropdowns (frame 14 only) — rendering bug on transition from login spinner
- Decorative barcode graphic occupies ~15% screen height, communicates nothing actionable
- "Station: 6F441" header label has no visual differentiation from navigable elements
- Four dropdowns show no dependency logic — all appear equally active; locked/cascading state invisible
- "Display Results" disabled state is near-invisible — subtle opacity difference only, no shape/position change
- "Or Select a Vehicle" separator has no divider line or visual weight — reads as afterthought
- Bottom tab bar: "Warranty Calculator" and "Prior to 1990" wrap to 2 lines; icons small and low-contrast
- No hamburger badge/notification indicator — technicians have no in-context nudge to new dispatches

**Positive:** "Scan VIN" CTA is the largest, most prominent element — correct prioritisation

### 4 — Side Drawer / Navigation (frame 17)

**UI Issues:**
- No scrim over background — Battery Search remains partially visible on right ~25%; two UIs compete
- "SAFETY" category label appears with no items beneath it — either empty vestigial section or items clipped
- Nine menu items (Notifications, Settings, Contact Us, User Guide, Price List, Battery Online, Training, Invoices, Logout) with no iconography
- All items equal-weight white text on blue — "Logout" (destructive) styled identically to "Notifications"
- "Battery Online" and "Training" appear to be web links with no external-link indicator
- No current-screen indicator / active state

### 5 — Scan VIN / Camera (frames 19–20)

**UI Issues:**
- Scanner launches to blank dark blue screen — no viewfinder, no reticle, no guide overlay, no instructional text
- "Flashlight" label has no button affordance (no border, no background, no icon)
- No scanning reticle or alignment guide — standard scanner UX expects a visible target zone
- No timeout or fallback prompt when scan fails
- Severity: **High** — a technician unfamiliar with the feature has no idea what to do

### 6 — Make Picker Bottom Sheet (frames 22–29)

**UI Issues:**
- ~35-item scrollable drum picker with **no search, no type-ahead, no alphabet index** — reaching "Toyota" requires scrolling through ~30 makes
- Selected item highlight visible, but faded items around it are low-contrast on dark background — fails in bright sunlight
- Confirm button (cyan circular FAB with white checkmark) in bottom-right overlaps picker content — non-standard iOS pattern, unlabelled
- Full Battery Search form remains visible above the picker sheet — visual noise, dead area during selection
- Make field still shows "Make" placeholder while scrolling — picker scroll and field population appear visually disconnected
- Year auto-populates to "2025" after scan attempt — positive default but origin is silent (no feedback)
- Severity: **High** — one of the most frequent interactions in the workflow, heavily friction-loaded

---

## Navigation Friction Summary

| Frames | Friction | Severity |
|---|---|---|
| 1 | Notification permission on cold launch | High |
| 3–12 | Full manual email entry, no SSO | Medium |
| 14 | Ghost rectangle rendering bug | Medium |
| 15–16 | Disabled "Display Results" nearly invisible | Medium |
| 17 | Drawer without scrim; empty SAFETY section | Low–Medium |
| 19 | VIN scanner: blank screen, no guidance | High |
| 19–20 | Flashlight has no button affordance | Medium |
| 23–28 | Make picker: no search, ~35 items | High |
| 23–29 | Confirm FAB: non-standard, unlabelled | Medium |

---

## Systemic Issues Identified

1. **No workflow progress indicator** — no step indicator, breadcrumb, or job status anywhere
2. **Two navigation systems** (hamburger + tab bar) with overlapping purpose and unclear hierarchy
3. **No dispatch/job context** on Battery Search — member name, vehicle, job ID all absent
4. **Font scaling not accommodated** — tab bar labels already clip at system default; worse with accessibility size
5. **Outdoor legibility** — mid-blue dropdown rows + white text is borderline; drum picker fades fail in direct sunlight
