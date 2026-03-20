# Screen Recording Analysis — Batch 2 (Frames 30–58)

---

## Frame-by-frame observations

### Frames 30–33: Battery Search — Model Picker (Bottom Sheet, continued)

**Screen name / purpose:** Vehicle selection — Model picker active for "Subaru" make.

**What is shown:**
- The drum/scroll picker bottom sheet is open. The user is scrolling through Subaru model options: Crosstrek, Forester, Impreza, Legacy (frame 30, selected), then scrolling back up to Impreza (frame 31). Frame 32 shows "Outback" snapping into the Model field (picker dismissed, slight transparent ripple visible mid-screen). Frame 33 shows the fully resolved state: 2025 / Subaru / Outback / H4 2.5L — all four dropdowns populated, bottom tab bar visible, "Display Results" button now active (bright cyan).

**UI issues:**
- The user visibly scrolls past "Legacy" (frame 30) and then back to "Impreza" (frame 31) before settling on "Outback" (frame 32) — behavioural evidence of accidental over-scroll in the drum picker. This is a direct consequence of the picker having no snap-to-search or alphabet index.
- In frame 32, a semi-transparent light rectangle/overlay flashes briefly over the lower half of the form during picker dismissal — likely a UIKit sheet dismiss animation artefact. Same class of rendering noise as the ghost rectangle seen in Batch 1 (frame 14).
- The bottom tab bar is hidden while the picker sheet is open (frames 30–31) and re-appears on dismissal (frame 33). This inconsistency means the technician has no access to bottom-nav during model selection.
- The "Display Results" button shifts from a ghosted/disabled state to active with no visual transition or animation — state change is abrupt and silent.
- The cyan confirm FAB (circular, bottom-right) reappears on picker close; its purpose is still ambiguous — it appears to confirm the selection but is never explicitly labelled.

**Moments of friction:**
- Over-scroll and re-scroll between Legacy → Impreza → Outback across three frames indicates the picker is physically imprecise. On a vibrating/outdoor device, this is worse.
- No haptic or audio feedback on selection confirmation.

**Positives:**
- Once all four dropdowns are populated the "Display Results" button activates — the dependency logic does enforce completeness before search, preventing partial queries.
- The fully-resolved state (frame 33) is the cleanest screen in the batch: four dropdowns all labelled, large CTA prominent, bottom tab bar clear.

---

### Frames 34–35: "Unavailable Battery Reasons" — Help / Reference Screen

**Screen name / purpose:** Informational explainer page — reached via the "Unavailable" result row (chevron tap). Explains why a battery may show as unavailable in Toolbox.

**What is shown:**
- White background, light grey card, standard iOS back button ("< Back"). Title: "Unavailable Battery Reasons". Body text lists 5 numbered reasons with sub-bullets. Both frames 34 and 35 show the identical state — no scroll occurred between them; the page appears fully visible in one screen height.

**UI issues:**
- This screen sits in a completely different visual language from the rest of the app: white background, dark body text, no dark navy, no cyan. The visual discontinuity is jarring and makes the screen feel like an external web view or injected document, not a native app screen. (It may in fact be a web view.)
- The font size is approximately 14–15px equivalent for a wall of text — adequate for desk reading, marginal for a technician standing outside in variable light.
- The "< Back" button is the only navigation affordance — no contextual "what do I do next?" CTA. The user reads the reasons and is then left to go back, with no bridge to a corrective action (e.g., "Search a different vehicle" or "Contact support").
- No visual hierarchy: all five numbered reasons use the same text weight. Reasons 1 and 5 are most actionable (no battery carried; wrong technology type) but are not distinguished.
- The screen title "Unavailable Battery Reasons" is accurate but clinical. Technicians may not immediately associate this with "why no battery showed up."

**Moments of friction:**
- The technician navigates to this screen from the "Unavailable" result row (seen arriving in frame 36). This represents a dead end: the result is unavailable, the explanation is read, then the user must back out entirely and re-enter the search flow to try a different vehicle.
- No suggested next steps after the explanation.

**Positives:**
- The explanations are clear and complete — five well-defined reasons covering most real-world scenarios. The content is genuinely useful.
- The list is short enough to read in a single screen without scrolling.

---

### Frames 36–37: Battery Search Results — "Unavailable" State

**Screen name / purpose:** Battery Search Results page — no matching battery in stock/catalogue for the 2025 Subaru Outback H4 2.5L.

**What is shown:**
- Dark navy header with "Battery Search Results" title and back button. Vehicle confirmed: "Manufacturer's Original Equipment / 2025 Subaru Outback H4 2.5L". OE spec row: "O.E. Group Size: 47 | CCA: 620 / AGM". Below the "Best Fits for Replacements" label sits a single bright cyan row labelled "Unavailable" with a right-pointing chevron. Below that: "Installation Precautions" grid (6 tiles, 2 rows of 3). Only "AGM Required" is active/lit; the other five tiles (EV/HEV PHEv, Multiple Batteries Required, Venting Required, Reset Required, Difficult Installation) are dim/inactive. At the bottom: "Training Material" section with two buttons — "Battery Location" (dim/inactive) and "TSB & Video" (active/cyan).

**UI issues:**
- The "Unavailable" row is styled identically to a normal battery result row (same cyan background, same chevron), except the text says "Unavailable" where a part number and price would be. This is extremely confusing: the row looks like something to tap to proceed, when in reality it is a dead end that only leads to an explanation page. A negative result should not look like a positive result.
- The "Unavailable" row uses bright cyan — the same colour the app uses for active, actionable elements. This colour encoding is backward: unavailability should be communicated in a muted, warning, or neutral colour, not the app's primary call-to-action colour.
- No explanation of *why* unavailable is presented inline. The technician must tap the row to discover the reason list. Many will not tap it; they will simply back out confused.
- The inactive Installation Precaution tiles (five of six are dimmed) have very low contrast — icons and labels are barely readable at normal viewing distance, worse in sunlight. The contrast between active ("AGM Required", full brightness) and inactive tiles is the only signal that those tiles don't apply — but there is no label or legend explaining this.
- "Battery Location" training button is dim/inactive for the Outback, meaning no location reference is available for this vehicle on this screen. No tooltip or explanation is given.
- The Station ID ("6F441") in the header sub-line is small and low-contrast — adds noise without utility on this screen.

**Moments of friction:**
- This is the most critical friction point in the batch: the technician has completed a four-step vehicle selection flow and receives an unavailable result with no obvious path forward. The screen offers no "try a different battery," no "contact dispatch," no "substitute recommendation" link.
- The entire search must be restarted from scratch — no in-place "modify search" affordance exists.

**Positives:**
- OE spec data (Group Size, CCA, chemistry) is shown clearly and is useful even when a specific result is unavailable — the technician knows what to look for.
- Showing applicable installation precautions (AGM Required) even when unavailable is genuinely helpful context.
- "TSB & Video" remaining active when "Battery Location" is inactive is appropriate selective availability.

---

### Frame 38: Battery Search — Return to Form (After Unavailable Result)

**Screen name / purpose:** Battery Search form — user has backed out from an "Unavailable" result and is back at the search form, which retains its previous values (2025 / Subaru / Outback / H4 2.5L).

**What is shown:**
- Identical to the resolved state in frame 33. All four dropdowns still populated. "Display Results" button active.

**UI issues:**
- No indication that the previous search returned an unavailable result — the form presents exactly as if no search has been run. A technician returning here after a failed lookup has no contextual reminder of what they just found (or didn't find).
- No "last search" summary or recent searches list.

**Positive:**
- Form state is correctly preserved on back-navigation — the technician does not have to re-enter all four dropdowns. This is the correct behaviour and a genuine usability win.

---

### Frames 39–40: Engine Picker and Immediate Results (Subaru Outback, H4 2.5L — second attempt)

**Screen name / purpose:** Engine picker bottom sheet active, then Battery Search Results (same vehicle, repeated search).

**What is shown:**
- Frame 39: Engine picker open, showing "H4 2.4L" and "H4 2.5L" — only two options visible. "H4 2.5L" is highlighted/selected. The cyan confirm FAB is present bottom-right.
- Frame 40: Battery Search Results for 2025 Subaru Outback H4 2.5L — identical to frames 36–37. "Unavailable" result again.

**UI issues:**
- The engine picker (frame 39) is opened mid-flow when the user apparently taps the Engine dropdown again — possibly to confirm the value or re-check. The fact that the picker is opened again with the same value already selected suggests the technician wasn't sure if their previous selection had registered. This is a trust/feedback gap: after selection, the closed dropdown shows the value but there is no confirmation moment (no brief highlight, no checkmark, no toast).
- With only two engine options visible and "H4 2.5L" highlighted, this re-open adds a full interaction cost for zero value — the technician confirms the same selection and reaches the same "Unavailable" result.
- Frame 40 is a duplicate of frame 36–37: same unavailable result for the same vehicle.

**Moments of friction:**
- User re-opens a picker to verify a value already selected — a classic sign of low confidence in the app's state feedback.

---

### Frames 41–43: Make Picker Reopened — Browsing to Forester

**Screen name / purpose:** Make picker (bottom sheet) reopened. User scrolls to "Ascent" at the top of the visible list (frame 41), then navigates to the make "Forester" model (frame 43 shows Battery Search with 2025 / Subaru / Forester / H4 2.5L).

**What is shown:**
- Frame 41: Model picker open, scrolled to top — "Ascent" at the highlighted position, with BRZ, Crosstrek, Forester below. The user is now browsing Subaru models looking for Forester.
- Frame 42: Engine picker open for Forester, showing only "H4 2.5L" (single option). Picker is effectively a one-choice confirmation step.
- Frame 43: Battery Search Results for 2025 Subaru Forester H4 2.5L — "Unavailable" again. OE spec: Group Size 154R (Q85), CCA 620, AGM.

**UI issues:**
- Frame 42 shows a picker with a single option — presenting a drum scroll picker for a single value is pure friction. If only one engine option exists for a model, that field should auto-populate silently and not require a user tap-and-confirm.
- The OE spec "154R (Q85)" notation is ambiguous: the parenthetical "(Q85)" is an alternate group size label (Japanese standard) that is never explained. Technicians unfamiliar with this notation may be confused.
- For the third consecutive search result, the outcome is "Unavailable." The pattern of unavailability — multiple vehicles, same outcome — suggests either a stock issue, a data issue, or a station configuration issue. The app provides no diagnostic signal or escalation path.

**Moments of friction:**
- Three consecutive "Unavailable" results with no guidance = accumulating dead ends. This is a high-stress scenario for a technician on a roadside call.

---

### Frames 45–47: Make Picker Reopened — Switching to Acura

**Screen name / purpose:** Make picker bottom sheet reopened to change make entirely. User scrolls from Subaru to Audi area (frame 46), then selects Acura (frame 47).

**What is shown:**
- Frame 45: Make picker open, scrolled to the bottom — "Subaru" highlighted, with Ram, Rivian, Rolls-Royce above and Tesla, Toyota, VinFast below. Full make count visible: the list spans from Acura to VinFast — approximately 35+ makes.
- Frame 46: Picker scrolled to top — "Audi" highlighted, Acura, Alfa Romeo, Aston Martin above. The user overshoots Acura and lands on Audi.
- Frame 47: Battery Search form with Acura selected, Model and Engine reset to placeholder ("Model", "Engine"). "Display Results" is now disabled (ghosted).

**UI issues:**
- The picker scroll from "Subaru" (near bottom) to "Acura" (near top) requires a long drag — visible in the two-frame traversal. Again, the absence of search/type-ahead makes any make near alphabetical extremes expensive to reach.
- Frame 46 shows the user overshooting Acura and highlighting Audi — requires a careful corrective scroll.
- When the Make is changed, Model and Engine correctly reset to placeholders (frame 47) — this is correct cascading behaviour, but it means the technician must re-complete two more pickers before searching. No shortcut exists.
- The confirm FAB reappears on make change and is presumably required to commit — but its role in this flow remains unexplained by the UI.

**Positive:**
- Cascading reset of dependent fields (Model, Engine) on Make change is correct behaviour and prevents stale/mismatched data submissions.

---

### Frames 48–50: Acura MDX V6 3.0L — First Successful Battery Result

**Screen name / purpose:** Battery Search Results — successful match. First result with an available battery in the batch.

**What is shown:**
- Frame 48: Model picker for Acura — showing ADX, Integra, MDX (highlighted), RDX, TLX, ZDX.
- Frame 49: Engine picker for Acura MDX — showing "V6 3.0L" (highlighted at top) and "V6 3.5L" below.
- Frame 50: Battery Search Results for 2025 Acura MDX V6 3.0L. OE spec: Group Size 94R, CCA 800, AGM. "Best Fits for Replacements" row: "94RAGM-C | Member $255 / Non-Member $280" with right chevron — active, cyan background. Installation Precautions: "AGM Required" (active/bright) and "Difficult Installation" (active/bright). Four remaining tiles are dim/inactive. "Training Material" section: "Battery Location" and "TSB & Video" buttons visible, both appear active.

**UI issues:**
- The first successful result finally appears here (frame 50) — but the visual difference between an available result row and the "Unavailable" row seen earlier is only the text content: both use the identical cyan row with right chevron. There is no iconographic or colour signal to distinguish "here is a battery you can sell" from "no battery exists." The success state deserves more positive visual reinforcement (e.g., a green accent, a checkmark, a part number badge).
- The pricing display "Member $255 / Non-Member $280" shows both tiers stacked, which is good, but the member/non-member distinction is label-only — no explanation of which tier applies to the current customer. The technician must know or ask.
- Two active installation precaution tiles ("AGM Required" and "Difficult Installation") are highlighted in the same cyan as "AGM Required" on previous screens — but "Difficult Installation" is a notably more significant warning. It uses the same weight and colour as a routine precaution, which risks being missed.
- The page is cut off at the bottom — "TSB & Video" button and lower content are partially visible, indicating more scrollable content below the fold with no scroll indicator.
- The part number "94RAGM-C" is shown in the result row without any plain-language description (e.g., "94R AGM group-size battery"). Technicians unfamiliar with part numbering conventions cannot verify correctness at a glance.

**Positive:**
- Pricing shown directly in the search results row is excellent — the technician can confirm price before tapping through. No extra navigation needed to get the price.
- Two precaution states (active vs. inactive tiles) effectively communicate which warnings apply to this specific vehicle.
- The part number, group size, CCA, and chemistry (AGM) are all visible on one screen — comprehensive spec at a glance.

---

### Frame 51: Battery Search Results — Scrolled Down (Acura MDX)

**Screen name / purpose:** Same results screen, scrolled to reveal Training Material section fully.

**What is shown:**
- The header with OE spec is now scrolled off. Visible: Best Fits row ("94RAGM-C, Member $255 / Non-Member $280"), Installation Precautions grid (AGM Required, Difficult Installation lit), Training Material section with four buttons: "Battery Location" (dim), "TSB & Video" (active/cyan), "Install Info" (dim), "Battery Benefits" (active/cyan).

**UI issues:**
- "Battery Location" and "Install Info" buttons are both dim/inactive for this vehicle. A technician who sees "Difficult Installation" flagged would naturally tap "Install Info" for guidance — but the button is unavailable with no explanation. This is a critical gap: the very situation that would make "Install Info" most needed (flagged as difficult) is exactly where the content is absent.
- Four training material buttons with inconsistent availability and no explanation for why some are inactive creates confusion. Are they permanently unavailable for this vehicle or temporarily unavailable due to missing content?
- The two active buttons ("TSB & Video" and "Battery Benefits") are distinguishable from inactive only by colour brightness — no disabled/greyed state with a tooltip or label.

**Moments of friction:**
- Technician likely to tap "Install Info" for a "Difficult Installation" flagged vehicle and receive no response. No error, no message, no fallback.

---

### Frames 52–54: "Battery Benefits" Screen — Tester Results & Comparative Pricing

**Screen name / purpose:** Battery Benefits — a customer-facing or technician-facing reference page explaining battery test results and market pricing comparison. Accessed via "Battery Benefits" button from the results screen.

**What is shown:**
- Frame 52: "Battery Benefits" screen (white background, dark text). Header: "Tester Results". Two sections visible:
  - "Caution" — describes a still-serviceable battery with reduced capacity
  - "Recharge & Retest" — describes possible deep discharge causes (lights left on, vehicle storage, etc.) with sub-bullets and options (take to shop, or install AAA/CAA Premium Battery with 3-year warranty)
- Frame 53: Scrolled down on same screen. Continues Recharge & Retest content (State of Health bullet). Then: "Market Based Comparative Pricing" table with four columns (Retail Outlet, Flooded, AGM, Warranty) and four rows: AutoZone $209.99/$259.99/3yr, Advance $219.99/$259.99/3yr, O'Reilly $209.99/$259.99/3yr, NAPA $219.99/$259.99/3yr.
- Frame 54: Further scroll — pricing table concludes (O'Reilly, NAPA rows). Small asterisk note: "Prices are for comparable premium batteries and may be subject to change." Below: "Benefits of the AAA Premium Battery" section with three numbered points (Convenience, Value, Warranty). At the bottom: "Climate Map" button (cyan, full-width).

**UI issues:**
- The "Battery Benefits" screen is entirely white-background with dark text — again the complete visual language shift from the dark navy app. This strongly suggests a web view or a PDF-style document loaded in a web frame. On a dark navy app, this sudden white flash is jarring and reduces perceived quality.
- The "Tester Results" title appears to relate to battery tester output states ("Caution", "Recharge & Retest") — but the screen was opened from a Battery Search results flow where no battery test was performed or referenced. The content feels contextually disconnected from the user's current task (looking up a replacement battery for a new vehicle).
- The pricing table (frame 53) is a small fixed table — readable at normal size, but if the technician has increased system font size the layout would likely break.
- The "Climate Map" button (frame 54) is a full-width cyan CTA — this is the primary visual action on the page, but it launches an external resource (confirmed in next frames). No external link indicator is shown.
- Asterisk note about pricing being subject to change is very small and grey — may be missed.

**Positive:**
- The competitive pricing table is a genuine sales tool — showing AAA/CAA pricing vs. AutoZone, Advance, O'Reilly, NAPA in one view gives the technician a confident value pitch. The data is concrete and specific.
- The "Warranty" column reinforces a consistent 3-year warranty claim.
- "Benefits of the AAA Premium Battery" bullet points (Convenience, Value, Warranty) are well-structured and customer-facing appropriate.

---

### Frames 55–57: "Climate Map" — External Web View (Blank / Loading / api.clubassist.com)

**Screen name / purpose:** External browser/web view loading the Climate Map resource. Appears to be an in-app web view launched from the "Climate Map" button.

**What is shown:**
- Frame 55: In-app Safari browser chrome appears (X close button top-left, browser toolbar bottom with share, close, compass icons). Page is completely blank white — still loading. Blue progress bar visible at top (~20% loaded).
- Frame 56: Same browser chrome. Page now loaded but rendered as a uniform medium grey — content is not rendering correctly. URL bar shows "api.clubassist.com". The page body is entirely grey with no discernible text or image.
- Frame 57: Page has now fully loaded and rendered correctly — a graphic image showing "What We Test" info-panel at top (Healthy/Caution/Replace colour band with bullet explanations) and "Avg Battery Life per Climate" with a heat-map of North America (58+ months in north, 41 months in south/Florida zone). URL still "api.clubassist.com".

**UI issues:**
- The page loads via an API subdomain (`api.clubassist.com`) — the domain name signals a backend API endpoint, not a content page. The browser is exposing an internal/API URL to the technician, which is a security and professionalism concern. A properly configured web view or deep link should use a content URL, not an API subdomain.
- Frame 56 shows a full grey blank screen during render — a broken intermediate state lasting at least one recording frame. Depending on network conditions, this could persist for multiple seconds. No loading indicator is visible during the grey state; the progress bar that was visible in frame 55 is no longer shown.
- The browser chrome (X button, Safari bottom toolbar) is standard iOS Safari in-app web view — functional but inconsistent with the app's own navigation patterns. There is no "back to app" context label; the X button is the only escape.
- Frame 55 shows the page blank with only a loading bar — if a technician taps the X at this point (natural behaviour on a slow connection), they lose the content entirely with no way to reopen it from context.
- The "Climate Map" is a static JPEG/image — useful but not interactive, not personalised to the vehicle or location being serviced.

**Moments of friction:**
- Three-frame load sequence (blank white → grey → content) on what is presumably WiFi/LTE suggests the resource is slow. On a cellular connection at a roadside, load times would be longer.
- Navigating away from the app to a browser web view breaks the flow entirely — the technician is now outside the app context.

**Positive:**
- The "Avg Battery Life per Climate" graphic (frame 57) is a strong visual selling tool — immediately understandable, regionally relevant, and communicates urgency for hot-climate customers.
- The Healthy/Caution/Replace band with bullet explanations is clear and legible.

---

### Frame 58: Battery Details Screen — 94RAGM-C

**Screen name / purpose:** Battery Details — full technical specification and pricing for part number 94RAGM-C. Accessed by tapping the battery result row from the Search Results screen.

**What is shown:**
- Dark navy background, white text. Header: "Battery Details" with "< Back". Sub-header: "Station: 6F441 / 94RAGM-C".
- Spec table: O.E. Group Size (94RAGM), Cold Cranking Amps (CCA) 800, Reserve Capacity (RA) 140, Cranking Amps (CA) 920, AMP Hours 80, Vendor Part 9A94R, Weight KG 23.6 / LBS 51.92, Dimensions Inches 12.41 x 6.9 x 7.49 / MM 315 x 175 x 190.
- "Start Estimate: New Battery Sale" section with two tappable rows: "Member $255.00 >" and "Non-Member $280.00 >", plus "Warranty Calculator >" below.

**UI issues:**
- The spec table uses a two-column label/value layout with no visual grouping — 11 data points in a single undivided list. Grouping into logical sections (Electrical Specs, Physical Specs, Pricing) with subheadings or dividers would improve scannability.
- "Vendor Part: 9A94R" is shown with no explanation — this appears to be an internal or supplier part code distinct from the consumer-facing "94RAGM-C". Technicians may be confused about which number to reference for ordering vs. invoicing.
- Weight is shown in both KG and LBS — dual units are useful for different markets but the LBS value (51.92 lbs) is the more operationally relevant number for a US technician lifting the battery. It should be the primary, not secondary, value.
- Dimensions are shown in both Inches and MM — same dual-unit comment applies. Neither is labelled as primary.
- "Start Estimate: New Battery Sale" as a section header is oddly phrased — "Start Estimate" suggests initiating a process, but it appears to be the label for the pricing/invoicing row section. The action being initiated (an e-invoice) is not described.
- "Member $255.00 >" and "Non-Member $280.00 >" are two equal-weight rows — no indicator of which tier is appropriate for the current job or customer. If the system knows the dispatch context (member vs. non-member), this should be pre-selected or flagged.
- "Warranty Calculator >" is a separate row below pricing — appropriate placement but small text and no icon makes it easy to overlook.
- The screen is not shown scrolled — it's unclear if there is additional content below "Warranty Calculator."

**Positive:**
- This is the most data-dense useful screen in the app: part number, full electrical spec, physical dimensions, and pricing all in one place. A technician who reaches this screen has everything they need to confirm fit and begin the sale.
- The dual-unit display (KG/LBS, Inches/MM) accommodates different technician contexts (regional standards, van organisation by imperial/metric).
- Showing Member and Non-Member pricing side by side removes ambiguity about the price range.
- The ">" chevron on each pricing row clearly indicates these are interactive/actionable — they likely initiate the estimate/invoice flow.

---

## Summary of key findings (batch 2)

- **The "Unavailable" result row is a UX anti-pattern.** It uses the same cyan background and chevron as a successful battery match, making a dead end look like an active result. Three consecutive "Unavailable" results (Outback twice, Forester once) with no suggested next action constitute the highest-severity friction sequence in the batch.

- **No path forward from failure states.** Neither the "Unavailable" results screen nor the "Unavailable Battery Reasons" explainer offers a corrective action (modify search, contact dispatch, try a substitute). The technician must back out and restart the entire search flow manually.

- **Form state is preserved on back-navigation.** When the user backs out of a results screen to the Battery Search form, all four dropdown values are retained. This is correct behaviour and reduces re-entry burden — it should be preserved in any redesign.

- **Single-option pickers are unnecessary friction.** Frame 42 (Forester engine: one choice) and frame 49's two-choice engine picker both show the drum picker for near-trivial selections. Engine fields with one or two options should auto-populate or use a simpler inline selector.

- **The picker over-scroll problem recurs throughout.** Frames 30–31 (Legacy → Impreza), frame 46 (Audi when seeking Acura) — the drum picker's lack of search or type-ahead continues to cause corrective scrolling in every make/model selection observed.

- **Installation precaution tiles are context-critical but partially invisible.** The "Difficult Installation" flag (frame 50) is actionable and safety-relevant, but is rendered at the same visual weight as "AGM Required." Simultaneously, the "Install Info" training button is inactive precisely for vehicles flagged as difficult — the most needed resource is absent where it matters most.

- **The Climate Map web view exposes api.clubassist.com in the browser URL bar.** An API subdomain should not be user-visible. The content loads slowly, renders through a grey blank intermediate state, and breaks the app's navigation context by dropping the user into a browser chrome.

- **Battery Benefits / Climate Map are a different visual language.** White-background web-view content within a dark navy native app produces a jarring flash and signals inconsistent design ownership. These screens feel bolted on rather than designed in.

- **Battery Details (frame 58) is the most functionally complete screen.** Full spec, dimensions, dual-unit weight, and dual-tier pricing in one view. The "Start Estimate" section directly bridges lookup to invoicing. This pattern (single-screen spec + CTA to next workflow step) is worth preserving and extending to other screens.

- **Pricing is well-surfaced throughout.** Both Member and Non-Member prices appear in the search results row and on the Battery Details screen — the technician never has to dig for a price. This is a strong positive pattern.

- **No job/dispatch context is ever present.** Across all frames in this batch the app shows "Station: 6F441" but no customer name, vehicle plate, job ID, or dispatch reference. Every search is effectively anonymous, requiring the technician to maintain job context in their head or on paper.

- **Confirm FAB (cyan circular checkmark) remains unexplained.** It appears on every picker sheet interaction throughout this entire batch and Batch 1. It has no label, no tooltip, and no obvious iOS precedent. Technicians must learn by trial what it does (confirms the picker selection).
