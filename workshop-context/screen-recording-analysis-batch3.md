# Screen Recording Analysis — Batch 3 (Frames 59–87)

---

## Frame-by-frame observations

### Frames 59: Battery Details — pre-estimate view

**Screen name / purpose:** Battery Details screen for battery SKU 94RAGM-C (Station 6F441). Shows full technical spec and entry points into the estimate flow.

**Content shown:**
- Header: "Battery Details" with station ID "6F441" as subtitle; "94RAGM-C" as secondary subtitle
- Technical specification rows: O.E. Group Size (94RAGM), Cold Cranking Amps CCA (800), Reserve Capacity RA (140), Cranking Amps CA (920), AMP Hours (80), Vendor Part (9A94R)
- Weight section: KG (23.6), LBS (51.92)
- Dimensions section: Inches (12.41 x 6.9 x 7.49), MM (315 x 175 x 190)
- "Start Estimate: New Battery Sale" section with two tappable rows: Member ($255.00 >) and Non-Member ($280.00 >)
- "Warranty Calculator" tappable row at the bottom

**UI issues:**
- Section headers ("Weight", "Dimensions") use the same visual weight as data labels — no typographic hierarchy differentiates categories from leaf-level fields. Everything is the same size and colour.
- The indented sub-rows for KG/LBS and Inches/MM use only whitespace for grouping; no dividers, borders, or colour coding to reinforce structure. On a bright outdoor screen this is barely legible.
- "Start Estimate: New Battery Sale" label is split across two lines with inconsistent treatment — "Start Estimate:" in light weight and "New Battery Sale" in bold, which reads like two separate elements rather than a compound label + mode descriptor.
- The Member and Non-Member rows look identical in style to navigation rows, yet they represent two distinct price points for two distinct customer types. There is no visual emphasis, colour-coding, or badge to call out which applies to the current job — the technician must remember which membership status was established earlier.
- "No tax rate specified" is not visible in this frame but appears in other frames of the same screen — a persistent operational warning that goes unresolved with no action affordance.
- No "add to estimate" button is visible without scrolling; the flow requires tapping a price row to enter the estimate — a non-obvious interaction pattern for first-time users.

**Positive patterns:**
- Surfacing both Member and Non-Member pricing on one screen avoids a round-trip to look up pricing.
- Warranty Calculator is co-located with the estimate entry, appropriate for a warranty-claim scenario.

---

### Frames 60–63: Warranty Calculator — battery picker + date wheel (no battery selected / 94RAGM-C / 95RAGM-C)

**Screen name / purpose:** Warranty Calculator screen. Allows the technician to select a battery SKU and enter the original invoice date to determine warranty status and applicable discount.

**Content shown (frames 60–61):** Battery dropdown pre-filled with "94RAGM-C". Date picker is a three-column drum/wheel scroll selector (Month | Day | Year) with currently selected row highlighted in green: 03 | 20 | 2019. Visible rows below: 04/21/2020, 05/22/2021, partial 06/23/2022. "OK" button at bottom-right of picker. No result is displayed yet.

**Content shown (frame 62–63):** Battery dropdown has changed to "95RAGM-C" — the technician has switched the SKU. The date wheel remains at 03 | 20 | 2019 and no result is yet shown (OK not yet tapped).

**UI issues:**
- The drum/wheel date picker is a non-standard pattern on iOS for this type of data entry. iOS's native `.datePickerStyle(.wheels)` can work, but here the column widths are very narrow and the selected row highlight (green pill) spans all three columns making the individual values harder to read at a glance.
- The year column only shows years starting from 2019 in these frames — it's unclear whether older years (e.g. 2017, 2018) can be scrolled to; if not, this is a hard constraint not communicated to the user.
- No instructions or tooltip explain what "Original Invoice Date" means in operational context — is it the date the customer bought the battery or the date the original fitment job was invoiced?
- The battery dropdown sits above the date picker with a chevron but no clear affordance that it is changeable from this screen — a technician might expect to go back to Battery Details to change SKU, not realise it is editable here.
- No "Calculate" or explicit submit button is visible; the only action is "OK" inside the picker widget, which is ambiguous — does OK confirm just the date, or does it trigger the warranty calculation?
- Large empty dark navy area below the picker with no content — the result area that will populate is not previewed or indicated, which may prompt the user to tap elsewhere thinking the screen is incomplete.
- Station ID ("Station: 6F441") appears as a subtitle but is not needed on every inner screen — adds redundant clutter.

**Positive patterns:**
- The ability to change the battery SKU from within the Warranty Calculator itself saves a back-navigation.
- Green highlight on the selected date row is visible at a glance.

---

### Frame 64: Warranty Calculator — result displayed (expired warranty)

**Screen name / purpose:** Warranty Calculator results state. The calculation has run after tapping OK.

**Content shown:**
- Date picker remains visible at the top, still showing 03 | 20 | 2019 selected
- "WARRANTY STATUS" heading in bold white
- "Warranty coverage has expired" in orange/amber text
- Orange note: "AAA batteries purchased after 12/31/2022 are subject to a 3-year free replacement warranty without proration."
- "Months Used: 84"
- "Discount Applied: $0.00"
- "Start Estimate: Warranty Sale" section with Member ($255.00 >) and Non-Member ($280.00 >) rows
- "No tax rate specified" in small text at the bottom

**UI issues:**
- The date picker remains fully visible and interactive after the result is displayed — the screen is now vertically overloaded with both input and output active simultaneously. The result ("WARRANTY STATUS") is pushed to the middle of the screen with no visual separation from the picker above it.
- "Warranty coverage has expired" is rendered in orange — this is the correct use of a semantic colour, but the orange note below it uses the same orange for a policy clarification that is informational, not a warning. The two orange elements fight for attention and dilute the severity signal.
- "Months Used: 84" is raw data with no contextual framing — no indication of what the warranty period was (e.g. "84 of 36 months used") making the figure ambiguous to a technician who doesn't have the warranty terms memorised.
- "Discount Applied: $0.00" for an expired warranty is technically correct but feels like a broken result — there is no explanation of why $0.00 is shown alongside "expired" status.
- "Start Estimate: Warranty Sale" label appears even when the warranty has expired, implying a warranty-discounted sale when in fact no discount applies. The label is misleading.
- "No tax rate specified" sits in small grey text at the very bottom — a persistent error state with no resolution path or call to action.
- The Member / Non-Member price rows are identical to the Battery Details screen ($255/$280), reinforcing that the "Warranty Sale" mode label is cosmetic and adds confusion.

**Positive patterns:**
- The explicit "WARRANTY STATUS" heading and semantic orange for expired status provide a fast scannable result.
- Surfacing months used is a useful detail for technicians needing to explain the warranty situation to a customer.

---

### Frames 65–66: Estimate screen — "Add Core Fee?" dialog + "Please enter VIN" modal (Member flow)

**Screen name / purpose:** Estimate entry screen, reached by tapping "Member" on Battery Details. Two sequential modal dialogs interrupt the user before the form is accessible.

**Content shown (frame 65):**
- Estimate screen visible in background: Station 6F441, Service Time 3:17PM 03/20/2026, Provider Details: Hanna's Wrecker Service Inc, 1064 E 16th Street, Seymour IN 47274. VIN field (empty) with inline validation "A VIN should be 17 or 18 characters long." Call ID field (empty). Item table header and "+" button visible. Payment Method dropdown (empty, with inline error "Payment method is required."). Subtotal $255.00, Taxes $0.00, Total $255.00.
- Modal dialog: "Confirm / Add Core Fee? / No | Yes" — bare alert-style modal, grey background.

**Content shown (frame 66):**
- "Add Core Fee?" modal is dismissed.
- New modal: "Please enter VIN" with an empty VIN text field and a "Continue" button. Keyboard is active (alphabetic). Close (X) button top-right of modal.

**UI issues:**
- Two sequential modals on entry to the Estimate screen creates immediate friction. The user has tapped "Member $255" and is confronted with a confirmation dialog before even seeing the form. There is no prior context establishing what a Core Fee is, its cost, or when it would apply.
- "Add Core Fee?" modal has no explanation of what a Core fee is, its dollar value, or the implication of selecting Yes vs No. A technician new to the workflow has no basis for an informed choice.
- The "No | Yes" button layout in the modal uses text-only, same-weight links — no primary/secondary button hierarchy. The destructive or additive choice ("Yes" = adds a fee) should be visually distinct.
- "Please enter VIN" modal fires immediately after the Core Fee dialog — a second interruption before the form is even visible. If VIN is required, the inline VIN field on the Estimate form (already visible in the background) exists but is apparently not used as the primary input.
- Having both an inline VIN field on the form AND a separate VIN modal is duplicated UI — it is unclear which entry point is canonical.
- Inline validation labels ("A VIN should be 17 or 18 characters long", "Call ID should be between 1 and 2000000000", "Payment method is required") appear before the user has touched those fields — pre-emptive error states, not validation feedback. They read as permanent instructional text, not errors, yet they are styled in green (an unusual and confusing colour choice for what are effectively validation rules/errors).
- Green colour for field hints/errors is non-standard — green conventionally signals success or safe state; using it for required-field warnings is a semantic mismatch.

**Positive patterns:**
- Provider details (name, address) are pre-filled and visible at the top of the Estimate screen — reduces manual data entry.
- Service timestamp is auto-populated, which is useful for audit purposes.

---

### Frame 67: Estimate screen — Call ID field focused, item table visible, payment picker partially revealed

**Screen name / purpose:** Estimate form with numeric keyboard active for Call ID entry. Payment method picker is sliding up from the bottom.

**Content shown:**
- Call ID field focused with numeric telephone-style keyboard
- Inline hint in green: "Call ID should be between 1 and 2000000000."
- Item line table: columns Item | Description | QTY | Unit Price. Single row: 95RAGM-C | AAA Battery | 1 | $255.00
- "Payment method is required." error visible
- Floating blue checkmark (tick) FAB button bottom-right — purpose unclear in this context
- Payment picker emerging from bottom: "Master Card / Other / Visa" — a native iOS action sheet style picker, partially revealed

**UI issues:**
- The item table has a single-row body with a large white empty region below it, making the form feel incomplete and wasting screen space.
- The floating blue checkmark FAB overlaps the item table and has no label — its function in this context (confirm Call ID entry? submit form?) is entirely ambiguous. It co-exists with a "Next" button visible in other frames, creating two competing "proceed" affordances.
- Payment method options visible ("Master Card", "Other", "Visa") are generic — there is no "AAA Member Account" or club-specific tender type visible, which may be correct but looks incomplete given the audience.
- Call ID range "between 1 and 2000000000" is a raw constraint copied from backend validation, not a user-friendly hint. Technicians won't know what a valid Call ID looks like from this instruction.
- The telephone-style numeric keyboard (with letters on number keys) is presented for a numeric-only dispatch ID — a numeric keypad without letters would be more appropriate.
- "95RAGM-C" appears in the item table (Non-Member SKU), yet this screen was accessed via the Member price row ($255.00). The SKU may be correct but the label "AAA Battery" strips the model context already established on Battery Details.

**Positive patterns:**
- Auto-populating the battery line item in the estimate table from the Battery Details selection removes manual entry.
- Payment picker slides up from bottom per iOS convention — familiar interaction.

---

### Frames 68–69: Estimate form — scrolled to payment/summary/next, and payment picker open with full form visible

**Screen name / purpose:** Lower portion of the Estimate form, showing payment, totals, comments, and the Next CTA.

**Content shown (frame 68):**
- Upper half shows the blank item table area (large white space)
- "Payment Method" label with chevron dropdown, "Payment method is required." in green text
- Subtotal $255.00, Taxes (underlined link) $0.00, Total $255.00
- Comments field (empty, unfocused)
- "Next" button (cyan/teal, full-width, slightly muted — appears disabled)
- Floating blue checkmark FAB still present
- Bottom picker partially visible: "Master Card / Other / Visa"

**Content shown (frame 69):**
- Same form, now showing the full upper section including VIN field (empty), validation hint, Call ID (empty), item table with 95RAGM-C / AAA Battery / 1 / $280.00 (price has changed to Non-Member)
- Payment picker still partially visible at bottom
- Floating checkmark FAB visible

**UI issues:**
- The "Next" button appears at a muted/disabled cyan on frame 68, yet all required fields (VIN, Call ID, Payment Method) are still empty. The button being visually de-emphasised is good feedback, but there is no explicit "Complete required fields to continue" summary — the user must hunt for which fields are blocking progress.
- "Taxes" is rendered as an underlined hyperlink — suggesting it is tappable to configure tax rate, but this is not obvious and inconsistent with the non-tappable financial line items around it.
- Comments field is placed between the total summary and the Next button, creating an awkward flow: total is usually the final confirmation item, not a mid-position element between data entry and submit.
- The price changed from $255 (Member) to $280 (Non-Member) between frame 65 and frame 69 without any visible user action or explicit confirmation — this suggests the technician has navigated out and back in via the Non-Member row. There is no persistent indicator on screen of which pricing tier (Member vs Non-Member) is active for this estimate.
- Large white empty space in the item table (designed for multiple line items) creates a visual hole in the form — unclear whether more items can be added or whether the space is simply unused.

**Positive patterns:**
- Full-width Next button is easy to tap.
- Subtotal / Taxes / Total breakdown is clear and prominent.

---

### Frame 70: Estimate screen — "Add Core Fee?" dialog, Non-Member flow ($280)

**Screen name / purpose:** Repeat of the "Add Core Fee?" confirmation dialog, this time in the Non-Member estimate flow (total shows $280).

**Content shown:**
- Background estimate form with VIN field (empty), validation hint, Call ID (empty)
- "Confirm / Add Core Fee? / No | Yes" modal
- Payment Method error, Subtotal $280.00, Taxes $0.00, Total $280.00

**UI issues:**
- The Core Fee dialog fires again on entry to this estimate flow — the user has now encountered it twice within the same session, having navigated back from the Member flow. There is no mechanism to remember the previous answer (No) or to pre-set Core Fee preference at the job level before entering estimates.
- At this point, the total is $280 (Non-Member) but no indicator on the Estimate form identifies this as a Non-Member job — if the technician loses track of which row they tapped, there is no disambiguation on screen.

---

### Frame 71: Estimate — "Please enter VIN" modal over Non-Member estimate

**Screen name / purpose:** VIN entry modal, same as frame 66 but in the Non-Member flow.

**Content shown:**
- "Please enter VIN" modal with empty VIN field, Continue button, X dismiss button
- Background Estimate form: Call ID field focused, Non-Member total $280
- Numeric keyboard active

**UI issues:**
- The VIN modal appears again (second time in session) despite the user not having entered a VIN in the Member flow either. The app does not carry forward or pre-populate any data from the prior estimate attempt.
- "Please enter VIN" modal appears over an already-active numeric keyboard for Call ID — the modal overlay renders the keyboard orphaned (visually attached to no field). This creates a jarring visual state.
- No way to skip the VIN modal if VIN scanning is intended to be the primary path; the modal forces text entry or dismissal via X.

---

### Frame 72: Estimate — lower form visible, numeric keyboard for Call ID, Non-Member ($280)

**Screen name / purpose:** Estimate form bottom half during Call ID entry in the Non-Member flow.

**Content shown:**
- Large blank item table area
- "Payment method is required." error (green)
- Subtotal $280, Taxes $0.00, Total $280
- Comments field
- "Next" button (muted/disabled state)
- Floating blue checkmark FAB
- Telephone numeric keyboard at bottom

**UI issues:**
- Same structural issues as frame 68 — no change. The form is in the same incomplete state as the Member flow without progression.
- The floating checkmark FAB continues to sit over the item table with no contextual label. At this point in both Member and Non-Member flows it has appeared persistently without being used, suggesting it may be a remnant or low-discoverability action.

---

### Frame 73: Battery Details — scrolled down, "Submit Feedback" row visible

**Screen name / purpose:** Battery Details screen scrolled to reveal lower content, including the "Submit Feedback" row.

**Content shown:**
- Cranking Amps CA (920), AMP Hours (80), Vendor Part (9A94R)
- Weight: KG 23.6, LBS 51.92
- Dimensions: Inches 12.41 x 6.9 x 7.49, MM 315 x 175 x 190
- "Start Estimate: New Battery Sale" with Member ($255) and Non-Member ($280) rows
- Warranty Calculator row
- "No tax rate specified" in small text
- "Submit Feedback" row with chevron at the very bottom

**UI issues:**
- "Submit Feedback" is buried at the very bottom of a content-heavy scrollable screen — it is effectively invisible unless the technician scrolls past all the operational content. For a field tool that could benefit from technician feedback on battery data quality, this placement is counterproductive.
- "No tax rate specified" persists with no action affordance — it is not a tappable row, there is no link to settings, and no explanation of who can set the tax rate or how. It is a dead-end warning.

**Positive patterns:**
- Including Submit Feedback on the Battery Details screen (even if buried) shows intent to capture field corrections — a good concept worth surfacing more prominently.

---

### Frame 74: Battery Search — main screen (previously viewed vehicle pre-populated)

**Screen name / purpose:** Battery Search home screen. The user has navigated back to this screen from the estimate flow. Previous vehicle selection (2025 / Acura / MDX / V6 3.0L) is still populated in the dropdowns.

**Content shown:**
- "Battery Search" title, "Station: 6F441" subtitle
- Barcode graphic (decorative) below station ID
- "Scan VIN" button (cyan, full-width, camera icon)
- "Or Select a Vehicle" label
- Four dropdown rows: 2025, Acura, MDX, V6 3.0L (all pre-filled from prior selection)
- "Display Results" button (cyan, full-width)
- Bottom tab bar: Warranty Calculator | Media | Prior to 1990 | E-Invoice

**UI issues:**
- The previous vehicle selection is retained from the prior search — useful persistence, but there is no visual indicator that these are retained values vs default values. A technician starting a new job might not notice they are looking at a previous vehicle.
- The barcode graphic below the station ID is decorative and non-functional here — it does not scan, it is just an image. It takes up significant vertical space and could mislead users into thinking they can tap it to scan.
- "Or Select a Vehicle" separator label between the Scan VIN button and the dropdowns is useful, but the dropdowns themselves take up more screen height than needed — each row is generously spaced, meaning the "Display Results" button requires scrolling awareness even on a standard phone.
- Bottom tab bar icons are very small with two-line labels ("Warranty Calculator" wraps; "Prior to 1990" wraps) — the tab targets are minimal and the labels are cramped.
- The hamburger menu (top-left) and bottom tab bar are both present — dual navigation systems with no clear hierarchy.

**Positive patterns:**
- Retaining prior vehicle selection reduces re-entry for repeat battery types on multi-job shifts.
- "Scan VIN" as the prominent primary CTA is the right hierarchy — it is the fastest path.
- Clear "Display Results" CTA at the bottom of the form.

---

### Frame 75: Warranty Calculator — accessed from tab bar, no battery pre-selected, validation error visible

**Screen name / purpose:** Warranty Calculator screen, accessed directly from the bottom tab bar (not from Battery Details). Battery field is empty, with an error message visible.

**Content shown:**
- "Warranty Calculator" title, "Station: 6F441" subtitle
- Battery dropdown (empty, chevron)
- "A battery must be selected to continue." error in green text below the dropdown
- "Original Invoice Date" label
- Date wheel: Month | Day | Year, currently showing 03 | 20 | 2019 selected
- "OK" button at bottom-right of picker

**UI issues:**
- The error "A battery must be selected to continue." appears immediately on screen load before the user has had any interaction with the Battery field — another pre-emptive validation state. This should only appear after the user attempts to proceed.
- Green text for a "required field" error is a repeated systematic issue across the app — green is the wrong semantic colour for errors or required-field warnings. It should be red or amber.
- The date wheel still shows the same date from the previous Warranty Calculator session (03/20/2019) — state is persisted from a prior flow without indication. If the technician is now running a fresh warranty check on a new battery, this retained date could lead to an incorrect result without being noticed.
- No "Calculate" button is visible — the user must interact with the date picker and tap "OK" to trigger calculation. The flow is unclear.

---

### Frame 76: Media screen — loading state ("Retrieving...")

**Screen name / purpose:** Media library screen, initial loading state. Accessed from the bottom tab bar.

**Content shown:**
- "Media" title, Back button
- Search bar: "Search Videos, Documents..." placeholder
- Central loading indicator: custom spinner icon with "Retrieving..." label inside a white card on the dark background

**UI issues:**
- The loading indicator is a custom circular dashed spinner inside a white card — it reads as a modal/alert rather than an inline loading state, making it feel like a blocking popup rather than background content fetch.
- The white card has no border-radius styling consistent with the rest of the app — it looks like an unstyled `<View>` container.
- No estimated load time or skeleton state — the screen is entirely empty except for the loading card, giving no sense of what content will appear.
- No error state or retry affordance is prepared — if retrieval fails, it is unclear how the user would recover.

**Positive patterns:**
- "Retrieving..." label is better than a spinner-only state — it communicates that something is happening.
- Search bar is present immediately, so a user who knows what they're looking for could start typing before content loads (though results would be network-dependent).

---

### Frame 77: Media — full document list loaded (no search active)

**Screen name / purpose:** Media library with content loaded. Shows a mixed list of technical documents.

**Content shown:**
- "Media" title, Back button, search bar
- Unheadered document list (no category label visible at top):
  - "2014-2018 Mazda 3, 5, CX5 Proper Jump start…" (document icon)
  - "2015-2025 Toyota Hybrid JumpStart" (video icon — different icon style)
  - "2015-2025 Toyota/lexus Hybrid Jump Start D…" (document icon)
  - "2017 and newer Hyundai IONIQ HEV Jump st…" (document icon)
  - "2018 Subaru Forester (With Battery Current S…" (document icon)
  - "2019-2023 Toyota Hybrid Jump-Start Precaut…" (document icon)
  - "2021-2023 Ford F-150 Battery Replacement P…" (document icon)
  - "Battery Heat Shields" (document icon)
  - "BCI Group 400 (AUX14) Battery" (document icon)
  - "BMW/Mini/Mercedes Parasitic draw concerns" (document icon)
  - "Enhanced Flooded Batteries (EFB)" (document icon)

**UI issues:**
- All items are truncated with ellipsis ("…") — titles are cut off at the right edge with no way to see the full title without tapping. Document names like "2015-2025 Toyota/lexus Hybrid Jump Start D…" offer no clue what the "D" suffix holds.
- No category grouping is visible at the top — in the next frames the list is revealed to have a "Technical Service Bulletins" section header, meaning this initial view may be showing items from the first category without a visible header, which is confusing.
- Mixed document and video icons appear in the list but there is no filter or sort control — documents and videos are interleaved without the user being able to filter by type.
- Each list row has no secondary metadata: no date, no make/model tag, no file size — the technician has only the title to identify relevance.
- Row tap targets appear adequate (full-width rows) but there is no disclosure indicator (chevron) unlike other list items in the app — inconsistent interaction affordance.

**Positive patterns:**
- Including a searchable media library within the app (rather than sending technicians to an external knowledge base) keeps the workflow contained.
- Document and video type differentiation via icon is useful.

---

### Frame 78: Media — keyboard active, "Technical Service Bulletins" section revealed, no query typed yet

**Screen name / purpose:** Media search state with keyboard raised but no query entered. The scroll position has changed to show a "Technical Service Bulletins" section header.

**Content shown:**
- Search bar focused (empty), keyboard active (alphabetic)
- "Technical Service Bulletins" bold section header (white on dark navy)
- List items under it:
  - "07-213-22r Subaru Technical Service Bulletin"
  - "07-219-23r Subaru Technical Service Bulletin"
  - "2007-2018 BMW/Mini KAM usage precautions"
  - "2011 & Newer Ford F-Series Pickup Bulletin"
  - "2013-2018 Toyota Rav4 Potential Vehicle Fire…" (truncated)
  - Partial sixth item just visible

**UI issues:**
- The section header "Technical Service Bulletins" only becomes visible after the user scrolls (manually or by tapping search which scrolls the view). The initial view in frame 77 shows no section header, suggesting the list starts mid-section or the header is above the initial scroll position — a disorienting entry state.
- Section headers exist (good) but their styling (bold white on dark navy) is barely differentiated from the bold document title items — the header needs more visual weight or a background treatment to clearly delineate sections.
- TSB reference codes ("07-213-22r", "07-219-23r") are meaningful to technically experienced users but may be opaque to newer technicians — no plain-language summary or vehicle applicability tag is shown.

---

### Frame 79: Media — search query "Yoyo" typed, no results

**Screen name / purpose:** Media search with a nonsense query ("Yoyo") — likely a test or accidental input by the recording user — returning no results.

**Content shown:**
- Search bar: "Yoyo" (with autocorrect suggestions: "Yoyo" / "Yo-yo" / "Toyota" in iOS suggestion bar)
- Entire content area is blank — no results, no "No results found" message

**UI issues:**
- Zero-results state shows nothing — not even an empty state message. The screen is a blank dark navy void. The user receives no feedback confirming the search ran, no "No results for 'Yoyo'" messaging, and no suggestions to refine the query.
- Empty state is a critical missing pattern — without feedback the user may assume the app has crashed or stalled.
- The iOS autocorrect bar suggests "Toyota" as an autocorrect option (contextually relevant to the app content!) but tapping it would require the user to recognise the suggestion — this is a happy coincidence of iOS behaviour, not a designed affordance.

---

### Frames 80–83: Media — search "Toyo" / "Toyota", results loading and returned

**Screen name / purpose:** Media search with "Toyo" / "Toyota" entered. Shows the loading state during search and the returned filtered results.

**Content shown (frame 80):** Query "Toyo" in search bar. "Retrieving…" loading card appears centrally again. "Technical Service Bulletins" list visible behind the loading overlay (full list, unfiltered — appears to be the pre-fetch state).

**Content shown (frame 81):** Query "Toyota" in search bar. "Retrieving…" loading card appears again over the full unfiltered list, which is still visible in the background.

**Content shown (frame 82):** Query "Toyota" in search bar. Results are now filtered:
- "Technical Service Bulletins" section header
- 2013-2018 Toyota Rav4 Potential Vehicle Fire… (truncated)
- 2015-2025 Toyota Hybrid JumpStart
- 2015-2025 Toyota/lexus Hybrid Jump Start D… (truncated)
- 2019-2023 Toyota Hybrid Jump-Start Precaut… (truncated)
- Enhanced Flooded Batteries (EFB)
- Partial sixth item visible

**Content shown (frame 83):** Same results as frame 82, at 3:18 timestamp — user is lingering on the result screen, keyboard still active.

**UI issues:**
- The "Retrieving…" loading card (white box, centred) appears on every keystroke delay during search — this is a full-content-replace loading pattern. Because the old list is visible behind the semi-opaque card, the visual result is a ghosted-behind-overlay effect that is jarring.
- "Enhanced Flooded Batteries (EFB)" appears in Toyota search results — this item does not contain "Toyota" in its title, suggesting either a tag/keyword match system or a false positive. There is no relevance ranking or match highlighting to explain why this result appears.
- Titles are still truncated in results — the user still cannot see the full document name without tapping.
- The search appears to fire on every character change (not on submit), which causes repeated "Retrieving…" flashes — each letter typed triggers a new network fetch. This is especially problematic in low-connectivity field conditions.
- No result count is shown ("5 results for Toyota") — the user has no sense of how many items matched.

**Positive patterns:**
- Search does return relevant results for "Toyota" quickly.
- Filtering by keyword across both document types is useful in a library of this size.

---

### Frames 84–85: Battery Search — navigated back from Media, previous vehicle still populated

**Screen name / purpose:** Battery Search screen, user has navigated back from the Media section. The vehicle selection (2025 / Acura / MDX / V6 3.0L) remains populated.

**Content shown:**
- Hamburger menu icon (top-left, three horizontal lines) — Back button is absent; this is the root screen
- "Battery Search" title, "Station: 6F441"
- Decorative barcode, "Scan VIN" button, "Or Select a Vehicle" separator
- Dropdowns: 2025 | Acura | MDX | V6 3.0L (still pre-filled)
- "Display Results" button
- Bottom tab bar: Warranty Calculator | Media | Prior to 1990 | E-Invoice

**UI issues:**
- The hamburger menu replaces the Back button here — the switch in navigation control between screens (Back pill on inner screens, hamburger on root) is consistent with the app's pattern but creates a mental model shift. The hamburger on this screen implies a global menu, but earlier frames showed it is contextual navigation.
- All four dropdown values are retained from the prior session. No "Clear / New Search" affordance is visible. In a high-turnover roadside scenario (different vehicles back-to-back), this risks a technician accidentally fetching results for the wrong vehicle if they don't notice the pre-filled state.

---

### Frame 86: Estimate screen — full form visible (Non-Member, $280, no VIN or Call ID)

**Screen name / purpose:** Estimate form in a clean (keyboard-dismissed) state for the Non-Member flow.

**Content shown:**
- Call ID field (empty), inline hint: "Call ID should be between 1 and 2000000000."
- Item table: 95RAGM-C | AAA Battery | 1 | $280.00
- Payment Method dropdown (empty), "Payment method is required." error in green
- Subtotal $280.00, Taxes $0.00, Total $280.00
- Comments field (empty)
- "Next" button (muted cyan — disabled state)

**UI issues:**
- The full form is now visible without keyboard obstruction — three fields/sections are still incomplete (Call ID, VIN is above the scroll, Payment Method). The "Next" button is visually de-emphasised but still not paired with any summary of what is preventing progress.
- Payment Method row has a single thin underline and a chevron — stylistically it resembles a navigation row, not a form control. This is an inconsistent affordance pattern.
- "Taxes" continues to appear as an underlined link. There is no resolution path for "No tax rate specified" visible anywhere in the form or navigable from here.
- VIN field is above the current scroll position, so the unresolved VIN validation is out of view — a technician might see "Next" greyed out and not understand that the VIN (not visible) is the blocking issue.

---

### Frame 87: iOS Control Centre — accidental swipe-down gesture

**Screen name / purpose:** iOS Control Centre has been opened (swipe down from top-right), interrupting the app session.

**Content shown:**
- iOS Control Centre overlay: Airplane mode, Wi-Fi, Bluetooth, Focus mode, brightness, volume, music player (Not Playing), screen lock, flashlight, timer, HomePod controls (Della's Room — Paused; Living Room 4K TV — Stopped), and various iOS utility tiles.
- "Toolbox" is visible in the top status bar as the active app.

**UI issues:**
- This is an accidental system-level gesture captured in the recording — not an app-level issue. However, it highlights that the app provides no session persistence or recovery state. If a technician is mid-form and accidentally opens Control Centre (or leaves the app), there is no indication whether form data is preserved on return.
- The recording ends here — no confirmation of whether the Estimate form data was retained after returning to the app.

---

## Summary of key findings (batch 3)

- **Repeated modal interruption on Estimate entry.** Every path into the Estimate screen triggers two sequential dialogs — "Add Core Fee?" then "Please enter VIN" — before the technician can interact with the form. Neither dialog provides enough context (no Core Fee amount, no explanation of purpose) for an informed decision. This is the single highest-friction moment in this batch.

- **Green used for errors and required-field validation throughout.** Green text is used consistently across the app for inline validation rules ("A VIN should be 17 or 18 characters long", "Payment method is required", "A battery must be selected to continue"). Green conventionally signals success. This is a systematic semantic colour error that could cause technicians to overlook required fields.

- **Pre-emptive validation errors appear before any user interaction.** Required-field errors are shown on screen load, not on submit-attempt or field-blur. This is noise that trains users to ignore the green text, undermining its utility as real-time feedback.

- **No active pricing-tier indicator on the Estimate form.** The Estimate screen shows a total ($255 or $280) but never explicitly labels the job as "Member" or "Non-Member". With the Core Fee dialog, the VIN modal, and form scrolling all intervening between the pricing selection and the form, a technician can easily lose track of which tier they are building an estimate for.

- **Duplicate VIN entry path (inline field + modal) with no clear canonical route.** The Estimate screen has a VIN field inline and also fires a "Please enter VIN" modal — two different entry mechanisms for the same data, neither clearly primary. This creates confusion about where VIN is captured and whether both need to be filled.

- **Warranty Calculator retains previous session state without indication.** The date wheel persists the date from a prior session (03/20/2019). On a fresh warranty check this silently produces a result based on stale input. The retained battery selection also changes between flows (94RAGM-C vs 95RAGM-C) without explicit user confirmation.

- **Warranty result labels are misleading when warranty is expired.** "Start Estimate: Warranty Sale" is displayed even when the warranty status is "expired" and discount is $0.00. The label implies a discounted sale that is not occurring.

- **"Months Used: 84" lacks framing.** The raw months-used figure has no reference to the warranty duration (e.g. "84 of 36 months — expired"), making it ambiguous to technicians who don't have warranty terms memorised.

- **Media search triggers a full-replace loading card on every keystroke.** Each character typed causes "Retrieving…" to overlay the list. In poor connectivity this would make search unusable. A debounce delay and skeleton list would significantly reduce visual noise.

- **Zero-results state in Media is completely blank.** Searching for a term that returns no results leaves the screen empty with no message — the user cannot tell if the search ran, failed, or returned nothing.

- **"No tax rate specified" is a dead-end persistent warning.** It appears on Battery Details, Warranty Calculator results, and the Estimate form with no actionable link or navigation to settings. It is pure noise for a technician in the field who cannot resolve it.

- **Floating blue checkmark FAB on the Estimate screen has no label and ambiguous purpose.** It persists across all Estimate form states without explanation, conflicting with the "Next" CTA button.

- **No "Clear / New Search" affordance on Battery Search.** Previous vehicle selection persists without a prominent reset option, risking carry-over errors between jobs.

- **"Submit Feedback" on Battery Details is buried below the fold.** A potentially valuable field-correction mechanism is invisible unless the user scrolls past all operational content.

- **Positive patterns worth preserving:**
  - Co-locating Member and Non-Member pricing on Battery Details saves navigation.
  - Retaining vehicle selection between sessions reduces re-entry for repeat battery types.
  - Auto-populating the battery line item in the Estimate table from the Battery Details selection.
  - Pre-filling provider details and service timestamp on the Estimate screen.
  - Warranty Calculator's "Months Used" figure — the right data to surface, needs better framing.
  - Media library search scoped within the app, with document/video type differentiation via icons.
  - "Scan VIN" as the primary CTA on Battery Search — correct task hierarchy.
