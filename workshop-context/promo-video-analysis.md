# Club Assist Toolbox 2.0 — E-Invoicing Promo Video Analysis

**Source:** 65 extracted frames from `screenshots/promo/`
**Video type:** Training video for Battery Service Technicians (not public-facing marketing)
**Copyright:** © 2021 Club Assist US, LLC. v0621

---

## Brand Language

### Colour Palette

| Role | Colour | Approx Hex |
|---|---|---|
| Primary background (dark) | Deep navy blue | `#0D2D5C` – `#1A3F7A` |
| Primary background (mid) | Medium blue gradient | `#1565C0` – `#1E88E5` |
| Primary background (light) | Sky / cornflower blue | `#2196F3` – `#42A5F5` |
| Splash/title background | Dark teal-blue radial glow | `#0A2040` |
| Primary CTA button | Bright cyan-blue | `#00B0F0` – `#29B6F6` |
| Annotation highlights | Vivid lime green | `#76FF03` – `#AEEA00` |
| White text / labels | Pure white | `#FFFFFF` |
| AAA logo | Red | `#CC0000` |

**Summary:** Almost entirely a single blue family — dark navy to bright cyan. Lime green used only for training annotations (not brand). The app itself carries no surface-level variety — all data-heavy screens are white text on dark blue.

### Typography
- **App body:** System sans-serif (likely Roboto, Android native). White on dark blue. ~14–16sp body, ~18–20sp headers.
- **Screen titles** ("Vehicle Search", "Battery Details", "Estimate"): Bold white, ~20sp, left-aligned.
- **Invoice total amount:** Bold, very large (~48sp), white — the most typographically emphasised element in the entire video.
- **Issue:** No consistent typographic scale. Estimate/data table text is too small for outdoor readability.

### Iconography
- **Style:** Outlined/line-art, white on dark. Mix of outlined nav icons and dark filled status badges — inconsistent.
- **Status badges** (Difficult Install, Reset Required, Venting Required): Dark circular filled icons — visually inconsistent with the rest.
- **Nav icons:** Warranty Calculator, Media, Prior to 1990, E-Invoice

### Logo Usage
- Login screen: Club Assist "A" chevron mark + wordmark — primary in-app brand placement
- Generated invoice: AAA logo (three interlocking ovals, red) on printed document — Club Assist is subordinate
- App icon: Blue background, white "A" chevron, "Toolbox" wordmark

### Tone
- Instructional / procedural training video (not a sales pitch)
- Functional and honest — shows error states (VIN decode failure, offline error, VIN mismatch)
- Modest production quality: screen recordings with green arrows overlaid in post

---

## E-Invoicing Positioning

**Names used:** "E-Invoice" (nav tab), "E-Invoicing" (title/closing), "Estimate" (primary creation screen) — terminology inconsistency

**Benefits shown (implied, not stated):**
- Speed: estimate auto-built from battery search
- Accuracy: VIN scan auto-populates vehicle; auto-calculated taxes/fees
- Documentation: warranty terms on signature screen; invoice retained in history
- Customer experience: pre-filled comment "Thank you for your business!", email receipt

**Complete documented workflow:**
1. Login (email/password, email confirmation required)
2. Vehicle Search — scan VIN via camera OR manual Make/Model/Year/Engine
3. Battery Search Results — part number, Member/Non-Member pricing, status badges
4. Battery Details — specs + "Start Estimate" entry point
5. Estimate — line items, Core Fee dialog, VIN entry, Call ID entry, Add Item, Payment Method, Comments
6. Signature — customer signs on tablet, legal warranty text, checkbox for failed test
7. Customer Details — 12-field form: VIN, Member Number, Name, Address, City, Country, State, Zip, Phone, Email, License Plate, Odometer
8. Payment Details — invoice total ($275.73 shown), Approval Code, email for receipt, SAVE
9. Generated Invoice — AAA-branded printed document
10. Invoice History — hamburger menu > Invoices

---

## UI Shown in Video

**This is the actual production app** recorded on a real Android tablet (Samsung).
Evidence: system clock changes, real error states shown, real Android system UI visible.

**Key screens and frames:**
- Login: frames 6–8
- Vehicle Search: frames 9–16, 56–58
- VIN decode failure dialog: frames 17–21
- Battery Search Results: frames 23–24
- Battery Details: frames 25–26
- Estimate (Add Core Fee): frames 26–28
- Estimate (full with VIN, Call ID): frames 29–30
- VIN Mismatch dialog: frames 31–32
- Add Item modal: frames 37–38
- Signature: frame 43
- Customer Details: frames 46–51
- Payment Details: frames 52–53
- Generated invoice document: frames 54–55
- Hamburger nav: frames 59, 62
- Invoice list: frame 60
- Offline error: frames 63–64
- Closing screen: frames 64–65

---

## Gaps Between Marketing and Reality

1. **Terminology mismatch:** "E-Invoicing" externally but primary screen is called "Estimate" — confusing
2. **VIN scan reliability:** Video explicitly shows VIN scan failure (frames 17–21). Fallback to 4-field manual entry is significant friction roadside.
3. **Customer Details form is 12 fields** — presented as smooth but a major friction point in practice, especially for non-member customers with no pre-populated data
4. **Call ID is required but unexplained** — defaults to "0" (invalid), video points to it but doesn't explain where it comes from or what to do without dispatch integration
5. **MBC-1000 integration dependency** — smooth pre-populated VIN flow only works with specific tester hardware at specific firmware version. Technicians without it face materially worse workflow
6. **Payment is manual/offline-first** — "Approval Code" field is a post-payment record field, not in-app payment processing. Selecting "Visa" is just a label, not integrated payment
7. **Offline = complete block** — "Your device appears to be offline. Please connect to a network." Hard stop, no draft/queue mode for poor coverage areas
8. **Item management complexity** — ~18 line items in flat alphabetical list with inconsistent naming (internal codes mixed with descriptions)
9. **Two paths to Estimate** — via E-Invoice tab AND via "Start Estimate" in Battery Details, but video doesn't clarify if they produce the same result

---

## Design Direction Clues

1. **Blue palette is load-bearing identity** — retain but add white surface areas for data-heavy screens. Current dark blue on dark blue for form fields is hard to read outdoors.
2. **Bottom nav pattern is sound** — 4 tabs, E-Invoice always one tap away. Retain and possibly simplify.
3. **Every annotation arrow reveals a discoverability problem** — every green arrow points to a hidden or underemphasised element. Those need to become self-evident in the redesign.
4. **VIN scan is the hero interaction** — retain primacy, but add clearer feedback states and a graceful failure path.
5. **Inline validation uses green for errors** — incorrect colour convention. Needs fixing.
6. **Printed invoice carries brand equity** — well-structured AAA document. The digital experience should feel as complete and professional as that printed output.
7. **Invoice list is bare** — no search, filter, customer name, or status. Unusable at scale.
8. **Drawer = support/settings, bottom nav = workflow** — architecturally correct distinction. Preserve it.
9. **Linear step-by-step flow is correct** — Vehicle Search → Battery Results → Battery Details → Estimate → Signature → Customer Details → Payment Details. Preserve linearity, reduce field count at each step, add a progress indicator (currently none).
