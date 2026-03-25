# Club Assist x Goji — UX Audit Context

> Synthesized from: FigJam strategy sprint board (screenshots 01–07), 3 Granola meeting notes, screen recording analysis (87 frames, 3 batches), promotional e-invoicing video analysis (65 frames).

---

## Engagement Overview

**Client:** Club Assist US/Canada
**Agency:** Goji Labs
**Product:** Toolbox — mobile app for field battery service technicians
**Scale:** 1.6M invoices generated annually across US and Canada

### Club Assist Team
- Nick Sanfilippo — CTO
- Eric McLeer — Product Manager
- Rich — Director, App Development
- Nathan — Senior Manager, Technical Product
- Marcelo Caravo — Senior Manager, Brand & Digital
- Lindsay Sawyer — Director, Training
- Jocelyn Bella — Operations Support Manager

### Goji Team
- Claudio Lena — Product Manager
- David Barlev — Engagement Manager
- Yota Iwasaki — Product Designer

---

## Users & Demographics

### Primary Users: Field Technicians
- Wide age range: new hires in early 20s through technicians near retirement (60s–70s)
- **Not technically sophisticated** — UX must be highly intuitive
- Many use increased system font size on their devices, which currently breaks Toolbox's layout
- Work outdoors: bright sunlight, gloved hands, vibrating/moving environments
- High time pressure: avg 15–20 min on scene is the core metric
- Use MDM-locked devices (managed by their club/station)
- 3 language contexts required: English, Spanish, French Canadian

### Secondary Users: Club/Station Admins
- Manage technician permissions and station configuration via the My Club Assist (MCA) portal
- Monitor performance via Technician Scorecard and BI reports
- Enterprise-level visibility for Club Assist admins across all clubs

### Age Group Breakdown (FigJam board)
- **New technicians:** 20s–30s
- **Experienced/legacy technicians:** Near retirement
- Primary design target: non-technical, older cohort who may not tolerate UX friction

### User Sentiment (FigJam board)
- "Users want dark mode!"
- "Current users don't have major issues with the app — the goal for this engagement is to audit overall UX rather than address an existing major issue"
- "Workflow isn't necessarily the issue — it's more of the UX"
- "There is room to improve the UX overall and make data easier to understand: what's critical, what's a nice-to-have"

---

## Module Overview

| Module | Status | Notes |
|---|---|---|
| Battery fitment guide | Core / always-on | Every technician; searches by VIN or Make/Model/Year/Engine |
| E-invoicing | Most-used add-on; manually enabled per technician by station manager | Requires logout/login to activate after permission granted |
| Inventory / Stock Assist | Limited deployment — restricted add-on enabled per technician by station manager | The module adds 11 screens to the side-drawer: Assign Location, Unassign Location, Inventory Adjustment, Adjustment Review, Inventory Lookup, My Inventory, My Stock Count, Transfer, Receive Transfer, Transfer Review, and Receiving. Covers the full inventory lifecycle: assigning truck/warehouse locations, recording quantity adjustments with reason codes, conducting physical cycle counts, initiating and receiving inter-location stock transfers, and manually receiving stock against a reference number. Used by technicians pre-job (check stock) and post-job (adjust for batteries used). A station manager desktop counterpart exists for configuration, adjustment review, and station-level dashboards — not yet captured in audit; flagged for follow-up. |
| Technician Scorecard | Club-level decision | Tracks conversion, battery test %, updates nightly at 6:30 PM |
| Prior to 1990 | Tab bar item | Edge-case legacy vehicle lookup |
| Warranty Calculator | Tab bar item | Manual battery/date entry; future: auto-calculate for registered batteries |
| Media library | Always-on | TSBs, installation guides, training videos — not currently vehicle-linked |
| Battery Registration | In development | Serial/barcode tracking, warranty lifecycle management |

---

## Core Technician Workflow

```
Pre-dispatch
  └─ Review general reference docs (optional; mainly new technicians)

Dispatch received
  └─ Salesforce → MVC1000 tester: passes work order / call ID

On-scene diagnosis
  └─ MVC1000: 2-min battery test
  └─ Sync to Toolbox via button press:
      VIN, UUID, test results, call ID auto-populate
  └─ 40% of technicians use rival testers (B2Q) — no sync, manual 4-field entry

Battery search
  └─ Single fitment → Battery Details
  └─ Multiple options → OE option trim page

Review battery details
  └─ Specs, Member/Non-Member pricing, installation precautions, TSBs

Start estimate / invoice
  └─ Select Member or Non-Member pricing tier
  └─ Core Fee dialog → VIN modal → form entry
  └─ Add line items, enter Call ID, select payment method
  └─ Signature → Customer Details (12 fields) → Payment Details

Payment collection
  └─ Square, Clover, cash, or phone payment to club office
  └─ Record approval code on invoice
  └─ Member receives invoice via email

Battery installation
  └─ Complete physical fitment
  └─ May need TSB / install guide access during installation
     (currently lose access after invoice is completed)

Total on-scene time: 15–25 minutes (north star: reduce)
```

### Integration Chain
```
Salesforce → MVC1000 tester → Toolbox app → E-invoicing → member email receipt
           ↑
           Salesforce also auto-populates member info into E-invoicing
```

- ~60% of technicians use MVC1000 integration; 40% use rival testers without sync
- Western Central NY: direct integration active; national rollout in progress (7+ small clubs)

---

## User Goals (from FigJam board)

### Primary User Goals (Technicians)
1. **Streamlined battery identification** — fit the customer's vehicle with minimal friction and required input
2. **Contextual reference access** — get relevant docs (TSBs, install guides) while disturbing real-world workflow as little as possible
3. **Fast, low-friction invoicing** — avoid manual input and complex forms
4. **Centralized view** — see everything relevant to each workflow step without jumping across app sections
5. **Clarity and confidence** — understand each step and know what will happen next
6. **State disambiguation** — reduce confusion between member/non-member, tax inclusive, fee adjusted, and out-of-stock states
7. **Resource efficiency** — avoid overwhelm; turn the resource library into contextual support

### Secondary User Goals (Admins)
- Centralized performance oversight across technicians
- Inventory management
- Enterprise-level analytics

---

## Key Pain Points

### Navigation & Information Architecture
- Two competing navigation systems (hamburger menu + bottom tab bar) with no clear hierarchy or hierarchy signal
- No breadcrumb, progress indicator, or job context anywhere in the app
- Technicians must jump across screens to get information that should coexist (specs, TSBs, invoice)
- Documents scattered across different sections; difficult to browse/find specific resources
- Limited Club Assist brand visibility — only present on the login screen

### Battery Search & Vehicle Selection
- Drum picker (no search, no type-ahead, no alphabet index) for Make (~35+ options) and Model — requires long imprecise scrolls; over-scroll/correction observed repeatedly in recording
- Engine pickers with 1–2 options still require a full drum picker interaction; should auto-populate
- Barcode graphic on Battery Search is decorative, non-functional, yet occupies significant vertical space
- "Display Results" disabled state uses only opacity difference — near-invisible especially outdoors
- No "Clear / New Search" affordance — prior vehicle selection persists between jobs, risking carry-over errors
- No dispatch/job context (member name, vehicle plate, job ID) surfaced on any screen

### Battery Results & Unavailability
- "Unavailable" result row styled identically to a successful result (same cyan background, same chevron) — a failure state should not look like an actionable success state
- No path forward from unavailability: no "modify search," no "contact dispatch," no substitute recommendation — full restart required
- "Unavailable Battery Reasons" explainer is a visual dead end with no corrective CTA
- Three consecutive unavailable results observed in screen recording with zero escalation path

### Installation Precautions & TSBs
- "Difficult Installation" flag uses same visual weight as "AGM Required" — safety-critical warning not visually distinguished
- "Install Info" training button is inactive exactly when a vehicle is flagged as "Difficult Installation" — the most-needed resource is absent at peak need
- TSBs are critical but currently buried in the Media library (not vehicle-linked)
- Technicians lose access to install guides after completing invoice — need docs during actual installation
- If a TSB exists for the customer's model, it should be prominently highlighted (FigJam: "Potential area for improvement to focus on")

### E-Invoicing Flow
- Two sequential modal interruptions on every Estimate entry: "Add Core Fee?" → "Please enter VIN" — before the form is accessible
- "Add Core Fee?" dialog provides no explanation of the fee's purpose, cost, or when it applies; Yes/No buttons have equal visual weight
- Core Fee dialog fires again if technician backs out and re-enters — no session memory
- Duplicate VIN entry: inline VIN field on form AND a VIN modal, no clear canonical path
- Green colour used for required-field validation errors throughout — green conventionally signals success; semantic mismatch causes technicians to overlook errors
- Pre-emptive validation errors appear on screen load before any user interaction — noise that trains users to ignore warnings
- No persistent indicator of Member vs. Non-Member pricing tier on the Estimate form
- "Next" button disabled with no summary of which fields are blocking progress
- VIN field can be above the scroll position when "Next" is greyed out — technician cannot see the blocking field
- Payment method picker uses text-only Yes/No style with no primary/secondary hierarchy
- 99.9% of technicians click "No" on Core Fee — the confirmation dialog is nearly always noise
- "No tax rate specified" is a persistent dead-end warning on Battery Details, Warranty Calculator, and Estimate forms with no action affordance or settings link

### Warranty Calculator
- Non-standard drum wheel date picker; narrow columns, ambiguous "OK" button trigger
- Previous session state (date, battery SKU) persists silently — stale input causes incorrect results without warning
- "Months Used: 84" shown with no reference to warranty duration (e.g., "84 of 36 months — expired")
- "Start Estimate: Warranty Sale" label shown even when warranty is expired and discount is $0.00 — misleading

### Media Library
- Search fires a full network request and full-content-replace loading overlay on every keystroke
- Zero-results state is a completely blank screen — no message, no feedback that the search ran
- All document titles truncated with ellipsis — no way to see full name without tapping
- No category filtering by document type; videos and documents interleaved
- No metadata per item (date, vehicle applicability, file size, make/model tag)
- Section headers barely differentiated from document title items — same visual weight
- TSB reference codes ("07-213-22r") opaque to newer technicians without plain-language summaries

### Visual & Technical Issues
- Keyboard covers Password field on login — no layout reflow; CTA buttons hidden
- Ghost white rectangle rendering artefact on Battery Search transition (from login spinner)
- VIN scanner launches to blank dark blue screen — no viewfinder, no reticle, no guide, no instruction
- "Flashlight" label has no button affordance (no border, background, or icon)
- Confirm FAB (cyan circular checkmark) on all picker sheets is non-standard, unlabelled, unexplained
- Floating blue checkmark FAB on Estimate screen conflicts with "Next" button — two competing proceed affordances
- Tab bar labels "Warranty Calculator" and "Prior to 1990" wrap to 2 lines at default font size — worse with accessibility scaling
- Dark/dim inactive tile state for installation precautions fails in direct sunlight

### Brand & Web Views
- "Battery Benefits" and "Climate Map" screens open as white-background web views inside a dark navy native app — jarring visual discontinuity
- Climate Map loads via `api.clubassist.com` — API subdomain exposed in browser URL bar (security/professionalism concern)
- Three-frame load sequence (blank → grey → content) for Climate Map on presumably good connectivity
- Standard Safari browser chrome (not app chrome) appears for web views
- Version number "2025.12.1 (365)" exposed as plain text on login screen
- Notification permission dialog fires on cold launch before any app value shown — anti-pattern

### Sync & Offline
- Sync frequency may be excessive (every 20 minutes)
- Offline state is a hard block: "Your device appears to be offline" with no draft/queue mode for poor coverage areas
- Permission changes (new module access) only take effect after logout/login

### Inventory Management Module
- **[Critical]** Negative AVBL QTY (-3) displayed in Inventory Lookup without any visual differentiation — a data integrity alert (more stock committed than exists) is invisible to the technician making stocking decisions
- **[Major]** Green text used for inline validation errors throughout the module (Inventory Adjustment, Receiving) — semantic inversion of error/success colour; technicians read errors as success states; confirms the same shared-component issue documented in the main e-invoicing audit
- **[Major]** Premature validation on form mount: "Reason is required." and "Reference number is required." appear before any user interaction on Inventory Adjustment and Receiving; same root cause as the main app's pre-emptive estimate validation
- **[Major]** "Confirm Assignment" button disabled on Location Assignment with zero explanation of prerequisites — user is in a dead end with no diagnostic or recovery path
- **[Major]** "Complete Receiving" button enabled despite required Reference Number field being empty — a user who ignores the green (error-coloured) validation message can submit an incomplete record
- **[Major]** Transfer quantity validation deferred to confirmation step — user can enter impossible quantities (exceeding available stock) without real-time feedback; only caught on Confirm Transfer tap
- **[Major]** No barcode scan path for item selection across five screens (Adjust Item, Inventory Lookup, My Stock Count, Transfer, Receiving) — every SKU lookup requires dropdown scrolling; a scan-to-select component would transform field usability
- **[Major]** Inline table-cell editing for quantity entry (My Stock Count, Transfer, Receiving) — non-standard iOS pattern, no visible affordance, inaccessible with gloved hands
- **[Major]** No search, filter, or sort on My Inventory — catalogues of 20+ SKUs require full-list scrolling to locate a specific item
- **[Major]** "Warning" modal fires on load for normal empty states on Receive Transfer and Transfer Review — severity mislabelling creates false alarm for a routine "no records" condition
- **[Moderate]** Inventory section in side-drawer has no section header — the 11 inventory items are visually indistinguishable from general app navigation items; the GENERAL section below has a header but inventory does not
- **[Moderate]** AVBL QTY, RSVD QTY, and ADJ QTY abbreviations appear across six screens but are never defined or spelled out; new technicians must rely on training to interpret column data

---

## Challenges & Questions (from FigJam board)

- **How much time usually goes between diagnosis and fix/replacement?** (open question — operational context needed)
- **How can we categorize reference docs and resources to surface them at the appropriate time?**
  - Replacement guides by vehicle model/year/hybrid status
  - Battery location PDFs (90% vehicle coverage)
  - TSBs — from OEMs; Subaru specifically has a lawsuit requiring a specific battery type in all Subarus
  - Installation instructions for difficult installs (~40% coverage)
  - General reference / training docs
- **Are invoices paid on the spot prior to labor being completed?** (varies by club)
- **Is replacement labor typically completed by the same technician as the diagnosis?** Yes
- **How do we handle the MBC1000 dependency for the 40% of technicians without it?**
- **Should we investigate/streamline the sync process?** (FigJam board: "Investigate sync process")

---

## Desired Outcomes (from FigJam board)

| Priority | Outcome |
|---|---|
| North Star | **Reduce time on scene** — increases member satisfaction, reduces wait time, allows more members served per shift |
| Brand | Increase Club Assist brand visibility throughout the app (currently only on login screen) |
| Visibility | Visibility in bright daylight is a priority |
| Modernization | Modernize the app to improve technician efficiency and align with Club Assist brand |
| Friction | Less friction interrupting the workflow — finding reference docs, inputting forms, navigating the app |
| Accuracy | Fewer fitment and invoicing mistakes |
| Consistency | More consistent technician performance |
| Customer | Better customer experience |
| Alignment | Tighter alignment between training, products, and field execution |
| Language | Must account for English, Spanish, and French Canadian |
| Feedback | Streamline feedback process by technicians |
| Infrastructure | Investigate sync process |
| Branding | Branding doc shared; open to alternate palettes that provide better UX |

---

## Live App Observations (Screen Recording)

*87 frames @ 1 per 3 seconds captured 2026-03-20. Full analysis in batch files.*

### Navigation Architecture
- Hamburger menu (top-left) + bottom tab bar (4 items) — two parallel navigation systems with no clear hierarchy
- Bottom tab bar: Warranty Calculator | Media | Prior to 1990 | E-Invoice
- Hamburger: Notifications, Settings, Contact Us, User Guide, Price List, Battery Online, Training, Invoices, Logout
- No scrim on drawer open — Battery Search remains partially visible behind drawer
- "SAFETY" section in drawer appears with no items visible — empty or clipped
- No current-screen indicator or active state in hamburger menu

### Login
- Notification permission dialog on cold launch (anti-pattern — fires before any value shown)
- Keyboard covers Password field; CTA buttons hidden while keyboard is active
- iOS AutoFill surfaces personal email on MDM devices (`textContentType` not configured)
- "Sign Up" and "Login" equal visual weight — B2B tool should not give equal weight to Sign Up
- Password eye icon tap target ~20×20px — too small for gloved hands

### Battery Search (Home Screen)
- Decorative barcode graphic occupies ~15% screen height — non-functional, takes up space
- Ghost white rectangle rendering bug on transition from login spinner
- Four dropdowns show no dependency logic — all appear equally active/available
- "Or Select a Vehicle" separator has no visual weight or divider line
- Tab labels "Warranty Calculator" and "Prior to 1990" wrap to 2 lines at system default font size
- Year auto-populates to current year after scan attempt (positive — silent default, no feedback)
- Previous vehicle selection persists without a "Clear / New Search" affordance

### VIN Scanner
- Launches to blank dark blue screen — no viewfinder, reticle, guide text, or instruction
- "Flashlight" label has no button affordance
- No scanning reticle or alignment guide
- No timeout or fallback prompt on scan failure

### Make / Model / Engine Pickers
- ~35+ make options with no search or type-ahead — reaching "Acura" from "Subaru" requires long imprecise scroll
- Over-scroll and correction observed on every multi-step make/model selection in the recording
- Selected value not confirmed with feedback — technicians re-open pickers to verify selection
- Single-option engine pickers require full drum picker interaction for one choice
- Confirm FAB (cyan circular checkmark, bottom-right) non-standard, unlabelled, unexplained
- Bottom tab bar hidden while picker sheet is open
- Cascading field reset on Make change is correct and should be preserved

### Battery Search Results
- **Unavailable state:** "Unavailable" row uses identical cyan background and chevron as a successful result — failure state looks identical to success state
- No corrective path from unavailability — full search restart required
- "Unavailable Battery Reasons" explainer is a white web-view dead end with no CTA
- **Available state:** Part number, Member/Non-Member pricing, OE spec all visible in one row — strong pattern
- Installation precautions grid: active vs. inactive tiles differentiated only by brightness — fails in sunlight
- "Difficult Installation" same visual weight as "AGM Required" — safety-critical flag not distinguished
- "Install Info" inactive for "Difficult Installation" flagged vehicle — absent resource at peak need
- "Battery Location" inactive with no explanation or fallback

### Battery Details
- Most functionally complete screen — part number, full electrical spec, dimensions (both units), dual-tier pricing in one view
- "Start Estimate" directly bridges lookup to invoicing — good pattern
- Spec table lacks grouping — 11 data points in undivided list (Electrical / Physical / Pricing grouping would help)
- No vehicle name in header — technician has no confirmation of which vehicle the specs apply to
- "Vendor Part" (internal code) shown without explanation alongside consumer-facing part number
- "Submit Feedback" buried at very bottom below all operational content — invisible without extensive scroll
- "No tax rate specified" dead-end warning with no action affordance

### Battery Benefits / Climate Map
- White-background web views within dark navy native app — jarring visual discontinuity
- Climate Map loads via `api.clubassist.com` — API URL exposed in browser address bar
- Three-frame load sequence: blank white → full grey → content (slow even on good connectivity)
- Breaks app navigation context — technician is in Safari chrome, not app chrome
- Content is genuinely valuable (competitive pricing table, climate heat map) — needs native-quality presentation

### Warranty Calculator
- Accessed from Battery Details or tab bar
- Battery dropdown pre-filled from Battery Details context (positive)
- Drum wheel date picker with narrow columns and ambiguous "OK" trigger
- Previous session date (03/20/2019) silently retained — stale input risk
- Result screen: picker remains active simultaneously with result — vertical overload
- "WARRANTY STATUS" heading with orange for expired — correct semantic use of orange
- "Months Used: 84" without "of 36 months" framing — ambiguous
- "Start Estimate: Warranty Sale" shown even on expired warranty with $0.00 discount — misleading label
- "No tax rate specified" persistent dead-end warning

### Estimate / E-Invoice
- Two sequential modal dialogs on every entry: "Add Core Fee?" → "Please enter VIN"
- "Add Core Fee?" no explanation of purpose, cost, or when it applies; equal-weight No | Yes buttons
- Core fee dialog fires again on re-entry — no session memory of prior answer
- Inline validation in green for all required fields — wrong semantic colour; errors overlooked
- Pre-emptive validation appears before user interaction — trains users to ignore it
- Duplicate VIN entry: inline field on form + "Please enter VIN" modal — canonical path unclear
- No persistent Member/Non-Member tier indicator on the form
- "Next" button disabled with no summary of blocking fields; VIN (a blocker) can be above scroll position
- Auto-populated battery line item, provider details, and service timestamp — strong positive patterns
- Floating blue checkmark FAB conflicts with "Next" button — ambiguous competing proceed affordances
- Payment method picker slides up from bottom per iOS convention — correct pattern
- "Taxes" rendered as underlined link (tappable?) — inconsistent with non-tappable items around it

### Media Library
- Search fires full network request + full-content-replace overlay on every keystroke — unusable in poor connectivity
- Zero-results state is completely blank — no "No results for..." message
- All document titles truncated; no metadata (date, vehicle applicability, file size)
- Section headers (e.g., "Technical Service Bulletins") barely differentiated from item titles
- No filter by document type; videos and documents interleaved
- TSB reference codes opaque to newer technicians
- iOS autocorrect suggesting "Toyota" when searching near it — happy accident, not designed affordance

---

## Brand & Marketing Reference (Promotional Video)

*65 frames analyzed from `video/promotional-eInvoicing.mp4` (2021 Club Assist US, LLC training video).*

### Visual Brand Language
| Role | Colour |
|---|---|
| Primary dark background | Deep navy `#0D2D5C`–`#1A3F7A` |
| Mid background | Medium blue `#1565C0`–`#1E88E5` |
| Light accent | Sky blue `#2196F3`–`#42A5F5` |
| Primary CTA / active element | Bright cyan `#00B0F0`–`#29B6F6` |
| White labels | `#FFFFFF` |
| AAA logo | Red `#CC0000` |

- Almost entirely a single blue family (dark navy → bright cyan)
- Typography: system sans-serif (Roboto, Android native); ~14–16sp body, ~18–20sp headers; invoice total ~48sp bold — highest emphasis element in the entire video
- Iconography: outlined/line-art white on dark; status badges (Difficult Install, Reset Required, Venting Required) use dark circular filled — inconsistent with nav icons
- "Blue palette is load-bearing brand identity — retain but add white surface areas for data-heavy screens" (recommendation)

### E-Invoicing Documented Workflow (Video)
1. Login (email/password with email confirmation)
2. Vehicle Search — VIN scan or manual Make/Model/Year/Engine
3. Battery Search Results — part number, Member/Non-Member pricing, status badges
4. Battery Details — specs + "Start Estimate" entry
5. Estimate — line items, Core Fee dialog, VIN entry, Call ID entry, Add Item, Payment Method, Comments
6. Signature — customer signs on tablet; legal warranty text; failed-test checkbox
7. Customer Details — 12 fields: VIN, Member Number, Name, Address, City, Country, State, Zip, Phone, Email, License Plate, Odometer
8. Payment Details — invoice total ($275.73 shown), Approval Code, email for receipt, SAVE
9. Generated Invoice — AAA-branded printed document
10. Invoice History — accessible via hamburger > Invoices

### Gaps Between Positioning and Reality
1. Terminology mismatch: "E-Invoicing" externally; primary creation screen is called "Estimate"
2. VIN scan failure explicitly shown in video — fallback to 4-field manual entry is significant on-scene friction
3. Customer Details is 12 fields — major friction point for non-member customers with no pre-populated data
4. Call ID defaults to "0" (invalid) — origin unexplained for technicians without dispatch integration
5. MBC-1000 dependency: smooth pre-populated flow only works with specific tester hardware at specific firmware; 40% of technicians face materially worse workflow
6. Payment is offline-first: "Approval Code" field is a post-payment record, not integrated payment processing
7. Offline = complete block — no draft/queue mode for poor coverage areas
8. Item list: ~18 items in flat alphabetical list with inconsistent naming (internal codes mixed with descriptions)
9. Two paths to Estimate: via E-Invoice tab AND via "Start Estimate" in Battery Details — relationship unclear

---

## Current Customer Journey (FigJam node 107:280)

Documented workflow mapped in workshop 1. Key stages:
1. **Pre-dispatch** — General reference doc review (battery safety, climate charts, regulations); mainly relevant for new technicians
2. **Integration handoff** — Salesforce → MVC1000 passes work order/call ID; MVC1000 → Toolbox carries diagnostic info, VIN, call ID; Salesforce → E-invoicing auto-populates member info
3. **Battery Search** — VIN scan or manual 4-field selection; auto-populate from MVC1000 sync
4. **OE Options / Battery Details** — Single fitment → direct to details; multiple options → trim page
5. **Estimate** — Initiate from Member or Non-Member pricing row; line items, fees, Call ID, payment method
6. **Invoice/Signature** — Customer signature, warranty terms, payment collection, email receipt
7. **Installation** — Physical battery installation; needs TSB/install guide access (currently lost after invoice)
8. **Completion** — Technician moves to next call

---

## App Screens Inventory (FigJam node 212:1244)

| Screen | Purpose | Key Notes |
|---|---|---|
| Login | Authentication | Notification interrupt anti-pattern; keyboard covers password field; no SSO |
| Battery Search | Primary entry — vehicle selection | Drum pickers, decorative barcode, ghost rectangle bug |
| Scan VIN | Camera-based VIN capture | Blank launch screen, no viewfinder, no reticle |
| Side Drawer | Navigation / settings access | No scrim, empty SAFETY section, all items equal weight |
| Battery Search Results | Available battery matches | Unavailable styled as available; no forward path on failure |
| Unavailable Battery Reasons | Explanation of unavailability | Dead-end; no corrective CTA; different visual language (white background) |
| Battery Details | Full spec + estimate entry | Best-designed screen; no vehicle name; Submit Feedback buried |
| Battery Benefits | Sales/reference content | Web view; white background; competitive pricing table |
| Climate Map | Regional battery life reference | Web view via `api.clubassist.com`; slow load; breaks nav context |
| Warranty Calculator | Warranty date calculation | Stale state; ambiguous trigger; misleading "Warranty Sale" label on expiry |
| Estimate | Invoice creation form | Double modal interrupt; green errors; no tier indicator; conflicting FABs |
| Media Library | Documents, TSBs, training videos | Per-keystroke search; blank empty state; truncated titles; no vehicle linking |
| Invoice History | Prior invoices | Via hamburger → Invoices; no search/filter/customer name/status |
| — Inventory Management Module — | | Restricted add-on; enabled per technician; accessed via side-drawer only |
| Navigation Menu (Inventory) | Side-drawer wayfinding for all 11 inventory items | No section header; items unlabelled as inventory; GENERAL section below has a header |
| Location Assignment | Assign an inventory location via QR scan or dropdown | "Scan VIN or QR Code" wrong-context label; Confirm Assignment disabled with no prerequisite explanation |
| Inventory Adjustment | Record manual quantity delta with reason code | Unlabelled FAB as primary action; green error text; premature validation; no row-delete |
| Adjust Item (sub-screen) | Select SKU and enter adjustment delta | Dropdown-only item selection; full QWERTY keyboard on numeric field; no available qty visible |
| Adjustment Review | Read-only 7-day adjustment history | Email address in "By" column; blank image placeholder in detail view; no date window control |
| Inventory Lookup | Per-location stock breakdown for a selected SKU | Negative AVBL QTY shown without visual alert (critical data integrity issue); no total row; no scan |
| My Inventory | Full catalogue with on-hand and reserved quantities | Redundant Item + Description columns; no search/sort/filter; missing AVBL QTY column |
| My Stock Count | Physical cycle count entry for current location | No barcode scan; inline cell editing; no reference quantities shown; ambiguous back-navigation |
| Transfer | Initiate stock movement to another location | Two-section scroll (destination + quantities); selected destination scrolls off-screen; validation deferred to confirm |
| Receive Transfer | View and accept incoming transfers | "Warning" modal for normal empty state; scope: Open + Last 7 days |
| Transfer Review | View outgoing transfer history | "Warning" modal for normal empty state; symmetric with Receive Transfer |
| Receiving (Manual) | Record stock receipt against a reference number | Green error text; premature validation; Complete Receiving button active when required field empty; inline cell editing |

---

## Technical Constraints

| Constraint | Detail |
|---|---|
| Offline-first | Periodic sync; offline = hard block, no draft/queue mode |
| MDM-locked devices | Club-managed; technicians cannot install apps, change settings |
| Language support | English, Spanish, French Canadian (required now); GDPR consideration for future Europe expansion |
| No in-app payment | Payment via Square, Clover, cash, or phone; Approval Code entered manually |
| Sync trigger | Currently every 20 minutes — potentially excessive |
| Permission changes | Require logout/login to take effect after station manager grants access |
| MVC1000 dependency | 40% of technicians without it have materially degraded workflow |
| Battery Registration (future) | In development; 3-year build to create full registry; serial/barcode tracking; auto warranty calculation |

---

## UX Audit Framework

### Scope & Objectives

Audit the full Toolbox field technician workflow against heuristic and task-flow criteria. Produce a prioritized findings list to guide the redesign. Focus areas: battery fitment lookup, TSB/doc surfacing, e-invoicing, payment flow, onboarding, feedback, sync visibility, brand presence, accessibility.

### Methodology
1. **Heuristic walkthrough** — Adapted Nielsen's 10 heuristics for field-service mobile
2. **User flow audit** — Full technician journey (dispatch → completion), step by step
3. **Prioritization matrix** — Severity × frequency × user impact

### Heuristics (adapted for field-service mobile)

| # | Heuristic | Field-mobile adaptation |
|---|---|---|
| 1 | Visibility of system status | Sync status, job context, current screen always visible |
| 2 | Match with real-world workflow | No scroll required for primary actions; linear job flow |
| 3 | User control & error recovery | Back/undo available; no dead-ends; clear escape paths |
| 4 | Consistency & standards | Single colour coding per state; one nav system; one confirm pattern |
| 5 | Error prevention | Correct CCA inputs; no stale vehicle pre-fill without warning |
| 6 | Recognition over recall | TSBs, install docs surfaced contextually; job context always visible |
| 7 | Flexibility & efficiency | MVC1000 sync fast path; manual fallback always available |
| 8 | Aesthetic & minimalist design | Only critical info visible; specs progressive-disclosed by default |
| 9 | Accessibility | Font scaling supported; contrast for direct sunlight; glove-friendly tap targets |
| 10 | Help & documentation | Contextual (TSBs on battery result, install guides on difficult flag) not buried |

### Severity Scale

| Level | Label | Definition |
|---|---|---|
| 0 | Not a problem | Cosmetic or preference; no workflow impact |
| 1 | Minor | Minor friction; easy workaround; low frequency |
| 2 | Moderate | Repeated friction; workaround exists but adds time; happens regularly |
| 3 | Major | Significant time cost or confusion; no obvious workaround; affects many users |
| 4 | Critical | Blocks task completion, causes errors with downstream consequences, or creates safety/compliance risk |

### Key Audit Areas

| Area | Primary Concern |
|---|---|
| Battery fitment lookup & vehicle selection | Picker friction, no search, cascading dependency clarity |
| TSB / install doc surfacing | Context-linking to vehicle; persistence after invoice; prominence when flag fires |
| Battery result states | Unavailable styled as available; no forward path; precaution visual hierarchy |
| E-invoicing flow | Double modal entry; VIN duplication; green errors; no tier indicator |
| Payment flow | Core fee dialog; payment method picker; approval code UX |
| Warranty Calculator | Stale state; date picker; result labelling |
| Reference library (Media) | Vehicle linking; search quality; empty state; category structure |
| Onboarding / first-run | No guided tutorial; contextual module intro; outdated user guide |
| Feedback submission | Buried; should distinguish product issues from operational questions |
| Sync status visibility | Sync indicator; offline mode; permission change flow |
| Brand presence & visual consistency | Navy-on-white web view discontinuity; login/splash brand weight |
| Multilingual content & layout | String length variability (ES/FR-CA); font scaling |
| Outdoor readability | Contrast ratios; tap target sizes; picker legibility in sunlight |
| Job context | Dispatch/member info surfaced throughout; no anonymous search |
| Inventory Management (Stock Assist) | Location assignment, adjustments, cycle counts, inter-location transfers, receiving |

### Prioritization Framework

```
Critical    → Fix before anything ships
High        → Address in initial redesign release
Medium      → Backlog with clear spec
Low         → Nice-to-have / future sprint
```

---

## Positive Patterns to Preserve

1. **Pricing surfaced on results row** — Member and Non-Member pricing visible in search results without tapping through
2. **Battery Details as central hub** — Full spec + pricing + estimate entry on one screen
3. **Form state preserved on back-navigation** — Dropdowns retain values when returning from results
4. **Cascading field reset on Make change** — Prevents stale Make/Model/Engine mismatches
5. **VIN scan as primary CTA** — Correctly prioritized as the fastest path; larger than any other element
6. **Auto-populated Estimate fields** — Battery line item, provider details, service timestamp all pre-filled
7. **Dispatch integration chain** — Salesforce → MVC1000 → Toolbox pre-population significantly reduces time on scene
8. **Bottom nav = workflow, drawer = support/settings** — Architecturally correct distinction; preserve and reinforce
9. **Selective availability for Training Material** — Showing which buttons are active vs. inactive (even if execution needs work)
10. **Warranty Calculator from Battery Details** — Co-located with estimate entry; appropriate for warranty-claim scenario
11. **Months Used in Warranty result** — Right data to surface; needs better framing (of N months)
