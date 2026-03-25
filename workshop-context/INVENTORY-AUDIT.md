# Inventory Management Module — UX Audit

> Part of the Club Assist x Goji Labs Toolbox UX Audit series.
> Source recording captured 2026-03-24. 71 frames extracted at 1 frame per 3 seconds.

---

## Module Context

### What it is

The Inventory Management module (also surfaced in marketing materials as "Stock Assist") is a restricted add-on to the Toolbox mobile app. It is not available to all technicians by default — a station manager must explicitly enable it per technician, the same permission model used for E-invoicing. Once enabled, the module provides field technicians with a complete set of inventory management capabilities scoped to their assigned station: assigning and unassigning inventory locations, recording quantity adjustments, looking up stock levels across the location network, conducting physical cycle counts, initiating and receiving inter-location transfers, and manually receiving stock without a pre-existing transfer record.

The module surfaces as a dedicated section within the main Toolbox side-drawer, adding up to 11 additional navigation items (Assign Location, Unassign Location, Inventory Adjustment, Adjustment Review, Inventory Lookup, My Inventory, My Stock Count, Transfer, Receive Transfer, Transfer Review, Receiving). These items appear at the top of the drawer list with no section header to separate them from the rest of the app.

### Users

Technicians enabled for inventory management by their station manager. The demographic and environment profile is identical to the main Toolbox user base:

- Age range: early 20s through late 60s–70s. The primary design target is the non-technical, older cohort.
- Work outdoors in varying light conditions including direct sunlight, often with gloved hands.
- Operate on MDM-locked devices managed by their club or station — cannot install apps, change system settings, or adjust font scaling policies beyond what the club permits.
- High time pressure: inventory tasks (pre-job stock check, post-job adjustment) must be completed quickly without interrupting the 15–20-minute on-scene service target.
- Language contexts: English primary; Spanish and French Canadian required.

### Relationship to the main Toolbox workflow

Inventory management sits at two points in the technician's job cycle. Before dispatching to a job, a technician may use **Inventory Lookup** or **My Inventory** to verify they are carrying the right battery for the incoming call. After completing a job, they use **Inventory Adjustment** to record the battery they used. Cycle counts (**My Stock Count**) are periodic tasks performed at station, not on scene. Transfers are logistics operations between truck and warehouse locations.

The module is entirely separate from the core battery-fitment and e-invoicing workflow. There is no automatic inventory deduction when an invoice is completed — adjustments appear to be manual. Whether a future integration with the e-invoicing flow is planned (so that completing an invoice auto-triggers an adjustment) is unknown from the recording.

### Desktop counterpart

**OUT OF SCOPE** — A station manager desktop version exists but was not captured in this recording. Flag for follow-up when access is available. Key unknowns: how managers configure inventory locations and assign them to technicians; how they review and approve adjustment records; what the station-level inventory dashboard looks like; whether the desktop has access to the full adjustment audit trail beyond the 7-day mobile window; and how transfer requests are authorised.

### Source

Screen recording captured 2026-03-24. 71 frames extracted at 1 frame per 3 seconds. Frame range: frame\_0001.png – frame\_0071.png. Analysis performed 2026-03-25.

---

## Navigation Architecture

The Inventory Management module is accessed exclusively through the main Toolbox side-drawer (hamburger menu). There is no dedicated tab, home-screen entry point, or deep link. Inventory items appear at the top of the drawer list, above the GENERAL section that contains the rest of the app's navigation items, but they carry no section header of their own.

**Inventory module items in the drawer (in order of appearance):**

1. Assign Location
2. Unassign Location
3. Inventory Adjustment
4. Adjustment Review
5. Inventory Lookup
6. My Inventory
7. My Stock Count
8. Transfer
9. Receive Transfer
10. Transfer Review
11. Receiving *(appears after a scroll, just above the GENERAL section)*

The GENERAL section label appears only after scrolling — it covers the main Toolbox items (Battery Search, Warranty Calculator, etc.). The inventory group is unlabelled, making it visually indistinguishable from the general app navigation for a first-time user.

---

## Screens Inventory

| # | Screen | Purpose | Key UI Elements |
|---|--------|---------|----------------|
| 1 | Navigation Menu (Inventory) | Side-drawer wayfinding for all inventory sub-modules | 11 unlabelled text items; no section header; large tap targets |
| 2 | Location Assignment | Assign an inventory location to a QR-scanned item or truck | "Scan VIN or QR Code" primary CTA; "Or Select a Location" dropdown; Location Details address block; disabled "Confirm Assignment" button |
| 3 | Inventory Adjustment | Record a manual quantity adjustment with a reason code | Reason dropdown; unlabelled FAB (+) to add items; inline items table (AVBL QTY / ADJ QTY); Comment field; Save button |
| 4 | Adjust Item (sub-screen) | Select a specific SKU and enter an adjustment delta | Item dropdown (no search); ADJ QTY (+/-) field; Cancel / Add Item buttons |
| 5 | Adjustment Review | Read-only history of adjustments for the last 7 days | List with ADJ # / Date / By (email); detail view with Reason, Date, Adjusted By, Items table; blank image placeholder area |
| 6 | Inventory Lookup | Per-location stock breakdown for a selected SKU | Item dropdown; table with On-Hand QTY / RSVD QTY / AVBL QTY per location; location names (Truck, Warehouse) |
| 7 | My Inventory | Full catalogue view with on-hand and reserved quantities per SKU | Item / Description / On-Hand QTY / RSVD QTY columns; no search, filter, or sort; alternating row shading |
| 8 | My Stock Count | Physical cycle count entry for the current location | Editable On-Hand QTY cells per item; Comments field; Finish My Stock Count button; Adjustment Confirm screen for discrepancies |
| 9 | Transfer | Initiate stock movement to another location | Destination selection table (with Type: Truck/Warehouse); Transfer QTY inline edit table; Confirm Transfer button |
| 10 | Receive Transfer | View and accept incoming transfers for this station | List: Source / Transfer # / Status / Date; "Receiving Activity: Open + Last 7 days" scope header |
| 11 | Transfer Review | View outgoing transfer history | List: Destination / Transfer # / Status / Date; same scope header as Receive Transfer |
| 12 | Receiving (Manual) | Record receipt of stock without a pre-existing transfer | Reference Number field; inline Received QTY / On-Hand QTY / Total QTY table; Total Received QTY counter; Complete Receiving button |

---

## Per-Screen Finding Summary

A quick-reference table for workshop use. Each row lists the screen, its worst finding, all heuristics violated, and the finding IDs covered in the Prioritized Findings table. Severity 4 = Critical, 3 = Major, 2 = Moderate, 1 = Minor.

| Screen | Worst Finding | Sev | Heuristics violated | Finding IDs |
|--------|--------------|-----|---------------------|-------------|
| Navigation Menu (Inventory) | Inventory items have no section header; unlabelled group in side-drawer | 2 | H4, H6, H7, H8 | INV-14, INV-25 |
| Location Assignment | "Confirm Assignment" disabled with no explanation; "Scan VIN" wrong vocabulary | 3 | H1, H2, H5, H9, H10 | INV-04, INV-05 |
| Inventory Adjustment | Green error text on premature validation; unlabelled FAB as primary action; no row deletion | 3 | H1, H3, H4, H5, H6, H9 | INV-02, INV-03, INV-16, INV-17 |
| Adjust Item (sub-screen) | No barcode scan for item selection; QWERTY keyboard on numeric field | 3 | H4, H5, H6, H7 | INV-13, INV-18 |
| Adjustment Review | Blank image placeholder wastes 25% of screen; email addresses in "By" column | 2 | H1, H8 | INV-19, INV-23 |
| Inventory Lookup | Negative AVBL QTY shown without visual alert — critical data integrity issue | 4 | H1, H2, H6, H7, H9 | INV-01, INV-15, INV-22 |
| My Inventory | No search/sort/filter on long catalogue; redundant Item + Description columns; no AVBL QTY | 3 | H6, H7, H8 | INV-09, INV-10, INV-24 |
| My Stock Count | No barcode scan for count; inline cell editing; ambiguous back-navigation | 3 | H3, H4, H6, H7 | INV-08, INV-12, INV-20 |
| Transfer | Quantity validation deferred to confirmation; destination scrolls off-screen | 3 | H1, H4, H5 | INV-07, INV-21 |
| Receive Transfer | "Warning" modal fires on empty state — severity mislabelling | 3 | H9 | INV-11 |
| Transfer Review | Same "Warning" modal pattern as Receive Transfer | 3 | H9 | INV-11 |
| Receiving (Manual) | Green error text; premature validation; Receive button active on empty required field; inline cell editing | 3 | H4, H5, H6, H9 | INV-02, INV-03, INV-06, INV-12 |

---

## Heuristic Evaluation

### Severity Scale

| Level | Label | Definition |
|-------|-------|------------|
| 0 | Not a problem | Cosmetic or preference; no workflow impact |
| 1 | Minor | Minor friction; easy workaround; low frequency |
| 2 | Moderate | Repeated friction; workaround exists but adds time; happens regularly |
| 3 | Major | Significant time cost or confusion; no obvious workaround; affects many users |
| 4 | Critical | Blocks task completion, causes errors with downstream consequences, or creates safety/compliance risk |

---

### H1 — Visibility of System Status

**Finding 1.1 — Negative available quantity displayed without visual alert (Severity 4)**
On the Inventory Lookup screen, a location shows On-Hand QTY: 0, RSVD QTY: 3, AVBL QTY: -3. The value "-3" is rendered in the same typeface, weight, and colour as all other quantity values. A negative available quantity is a data integrity alarm — it means more stock has been committed to open jobs than physically exists — but there is no colour change, no warning icon, and no asterisk to distinguish it. A technician reading this row has no signal that anything is abnormal.

**Finding 1.2 — "Confirm Assignment" button disabled with no explanation (Severity 3)**
On Location Assignment, the "Confirm Assignment" button is disabled on screen load (frame 0003) and remains disabled even after a location is selected (frame 0004, "Church Street Station" showing with full address). The button gives no visual indication that it is disabled (no greyed style visible in frames; it appears interactive). No helper text, tooltip, inline message, or prerequisite checklist explains what must be completed to enable it. Users are in a dead end with no diagnostic path.

**Finding 1.3 — "Save" button appears dynamically after item added (Severity 1)**
On Inventory Adjustment, the Save button is absent from the empty-state view (frame 0007) and appears only after at least one item is added. The dynamic appearance is unexpected — users who want to know their submission path before adding items cannot find it.

**Finding 1.4 — Success modals say "sent" not "saved" (Severity 2)**
Both Inventory Adjustment ("Adjustment has been sent") and My Stock Count ("My Stock Count has been sent") use "sent" in their success confirmation. "Sent" implies queuing or transmission to a remote system, not local persistence. Users cannot tell from the modal whether the record was accepted, is pending approval, or merely queued for sync.

**Finding 1.5 — Selected transfer destination scrolls off-screen (Severity 2)**
On the Transfer screen, once a destination row is selected (purple highlight), the user must scroll down to the items table to set transfer quantities. The selected destination scrolls above the viewport and is no longer visible. There is no persistent indicator at the top of the screen showing the chosen destination. A user setting quantities for a long item list cannot confirm their destination without scrolling back up.

**Finding 1.6 — Empty-state origin unclear in Receive Transfer and Transfer Review (Severity 2)**
When these screens load and find no records, a modal fires immediately before the user sees the list. The empty list is visible behind the modal, but the modal's presence makes it ambiguous whether the list is empty due to a load failure or genuinely has no records.

**Finding 1.7 — My Stock Count has no progress indicator (Severity 2)**
The stock count table can span multiple scroll pages. There is no indicator of how many items have been counted vs remain. Users cannot assess progress or estimate time remaining.

**Finding 1.8 — Total Received QTY colour coding unexplained (Severity 2)**
On the Receiving screen, the "Total Received QTY" counter changes colour as quantities are entered (appears orange at 0, changes as items are added). If the colour has semantic meaning (e.g., orange = incomplete, green = valid), that convention is not documented anywhere on screen.

**Finding 1.9 — Adjustment Review date window fixed with no indicator of further history (Severity 1)**
The header "Adjustment Activity: Last 7 days" tells users what they are seeing, but provides no indication of whether older records exist or how to access them. Users may not know whether the absence of a record means it did not happen or falls outside the window.

---

### H2 — Match Between System and Real World

**Finding 2.1 — "Scan VIN or QR Code" in inventory context (Severity 3)**
On Location Assignment, the primary action button reads "Scan VIN or QR Code." VIN (Vehicle Identification Number) is automotive vocabulary used in the battery-fitment workflow to match batteries to cars. In inventory management, a technician is scanning a location or item QR label, not a vehicle. The label imports the wrong mental model. A technician new to the module may attempt to scan a vehicle VIN, unsure whether VIN refers to a battery, a truck, or the vehicle at the job site.

**Finding 2.2 — "RSVD QTY" abbreviation not defined (Severity 3)**
"RSVD QTY" (Reserved Quantity) appears in Inventory Lookup, My Inventory, Transfer, and Receiving. The term "reserved" in battery service means stock allocated to open jobs — a concept that is not obvious from the abbreviation alone. The term is never spelled out, defined via tooltip, or explained in any help text visible in the recording.

**Finding 2.3 — "AVBL QTY" and the On-Hand minus RSVD formula unexplained (Severity 2)**
The relationship between On-Hand, RSVD, and AVBL quantities (AVBL = On-Hand − RSVD) is a core operational concept that is never explained on screen. Users unfamiliar with inventory management may misread AVBL QTY as the same as On-Hand QTY, leading to over-commitment of stock.

**Finding 2.4 — "Rotate" reason code opaque (Severity 1)**
The Adjustment reason picker includes "Rotate" alongside Found, Lost, Other, Returned, Sold (manual invoice), Station to Station. "Rotate" refers to stock rotation procedures — a back-office inventory concept that is not self-describing. First-time users have no context for when to use this vs "Station to Station."

**Finding 2.5 — "Previous on-hand quantities" is ambiguous (Severity 2)**
The Adjustment Confirm screen (shown after a My Stock Count submission with discrepancies) reads: "There are discrepancies between On-Hand Count and previous on-hand quantities." "Previous" could mean the immediately preceding physical count or the system's standing record. Technicians may be uncertain which number is considered authoritative.

**Finding 2.6 — "Receiving" vs "Receive Transfer" distinction not explained (Severity 1)**
Both "Receive Transfer" and "Receiving" appear as separate menu items. Their functional distinction (transfer-based receiving vs. manual receiving against a PO reference number) is not communicated anywhere in the drawer or on the screen itself. First-time users will need to trial-and-error to discover which applies to their situation.

**Finding 2.7 — My Inventory omits the AVBL QTY column (Severity 1)**
My Inventory shows On-Hand and RSVD, but not the derived Available figure. The actionable number for a technician deciding whether to take a job is AVBL QTY, not On-Hand. Users must perform mental subtraction under field conditions.

---

### H3 — User Control and Freedom

**Finding 3.1 — No row deletion on Inventory Adjustment table (Severity 2)**
Once an item is added to the adjustment table (frames 0016–0018), no delete, remove, or undo control is visible on the row. A technician who adds an item by mistake — wrong SKU or duplicate entry — has no visible path to remove it. They may be forced to navigate away and restart the adjustment.

**Finding 3.2 — Ambiguous back-navigation during stock count (Severity 2)**
During My Stock Count, navigating back (before submitting) leaves it unclear whether the in-progress count is saved, discarded, or locked. There is no "Discard Count" confirmation dialog, no "Save Draft" option, and no resume-count behaviour documented in the recording. Technicians interrupted mid-count have no safe escape path.

**Finding 3.3 — Confirm Transfer button buried at bottom of long scroll (Severity 1)**
After selecting a destination and setting all item quantities on the Transfer screen, the Confirm Transfer button is at the very bottom of a list that may span many rows. On a large catalogue, the button is not visible without scrolling past all items, and users may not know to look for it there.

---

### H4 — Consistency and Standards

**Finding 4.1 — Non-standard form architecture on Inventory Adjustment (Severity 2)**
The Inventory Adjustment screen combines three distinct interaction patterns on a single screen: a standard dropdown (Reason), a FAB-launched sub-screen (items table via "+"), and an inline free-text field (Comment). This hybrid architecture is not a standard mobile form pattern. The primary data-entry path (adding items) is hidden behind an unlabelled floating button, separated from the other form fields by a different interaction paradigm.

**Finding 4.2 — Unlabelled FAB as primary form action (Severity 2)**
The "+" FAB on Inventory Adjustment is the primary action for adding items — the core task of the screen. Using an unlabelled FAB for a primary form action is non-standard. iOS convention reserves FABs for global or floating actions, not for launching sub-forms. The function only becomes clear after tapping.

**Finding 4.3 — Inline table-cell editing pattern used inconsistently across three screens (Severity 3)**
My Stock Count, Transfer, and Receiving all use inline table-cell editing for quantity entry. This is a non-standard iOS interaction: cells are tappable-to-edit with no visual affordance (no pencil icon, no border highlight, no underline, no tap hint). Standard iOS patterns for structured data entry use dedicated form rows, steppers, or modal pickers. The pattern is non-standard individually; its use across three screens confirms a shared component choice that should be revisited at the framework level.

**Finding 4.4 — Full QWERTY keyboard on numeric-only quantity fields (Severity 2)**
The ADJ QTY field on Adjust Item (frame 0010) and quantity cells in Receiving (frame 0063) display a full QWERTY keyboard rather than a numeric keypad. iOS provides `keyboardType: .numberPad` or `.decimalPad` as standard types for numeric input. The current implementation forces technicians to locate the number row on a full keyboard, increasing error risk with gloved hands.

**Finding 4.5 — Navigation menu: inventory unlabelled, GENERAL section labelled below (Severity 2)**
The GENERAL section of the side drawer has a visible section header. The inventory items above it have no corresponding header. The inconsistency highlights the absence of grouping at the top of the drawer rather than resolving it.

**Finding 4.6 — Adjustment Review detail title does not reflect the viewed record (Severity 1)**
When tapping an adjustment row to see its detail, the navigation bar title remains "Adjustment Review" rather than changing to the specific ADJ # being viewed. iOS convention expects the title to reflect the current view's content, with the parent screen label surfacing in the Back button.

---

### H5 — Error Prevention

**Finding 5.1 — Premature validation on Inventory Adjustment (Severity 3)**
"Reason is required." appears in green text immediately on screen load (frame 0007), before the user has touched the Reason field. Pre-emptive validation on required fields trains users to ignore the messages — the same anti-pattern documented in the main Toolbox e-invoicing audit. Combined with the wrong colour (green = success, not error), the message is both untimely and semantically inverted.

**Finding 5.2 — Premature validation on Receiving (Severity 3)**
"Reference number is required." appears in green text on Receiving screen load (frames 0061–0069), before the user has interacted with the field. Same issue as 5.1, same root cause, same colour error.

**Finding 5.3 — "Complete Receiving" enabled despite required field empty (Severity 3)**
On the Receiving screen, the "Complete Receiving" button is active and tappable even when the Reference Number field is empty and its validation error is showing. A user who ignores or misreads the green validation message (which looks like a success indicator) can submit an incomplete receiving record.

**Finding 5.4 — Transfer quantity validation deferred to confirmation step (Severity 3)**
When a technician enters a Transfer QTY that exceeds AVBL QTY, no error appears inline. The error only fires as a modal ("Transfer qty 1 cannot exceed available qty 0 for item 124R-C") when the user taps Confirm Transfer. The available quantity is visible in the same table row throughout. Real-time validation (or disabling entry when AVBL = 0) would prevent the error before it occurs.

**Finding 5.5 — Full keyboard allows accidental letter entry in quantity fields (Severity 2)**
Both Adjust Item (ADJ QTY) and Receiving (Received QTY cells) present a full text keyboard, not a numeric pad. A gloved technician can type letters into a quantity field. Frame 0063 shows "s0" as a cell value, confirming this is reproducible. No input mask or client-side numeric enforcement is in place.

**Finding 5.6 — "Or Select a Location" framing may mislead about required steps (Severity 2)**
On Location Assignment, "Or Select a Location" implies the scan action and the dropdown selection are equivalent alternatives — either one is sufficient. If the Confirm Assignment button requires both a scan result and a location selection to enable, the "Or" framing actively misinforms the user about the task model.

---

### H6 — Recognition Over Recall

**Finding 6.1 — Unlabelled "+" FAB function not recognisable (Severity 2)**
On Inventory Adjustment, the floating "+" FAB's purpose (open the Adjust Item sub-screen) is not communicated by any label, tooltip, or contextual cue. Users must tap the button to discover its function. In a module targeted at technicians with limited app familiarity, hidden primary actions increase error rate and task time.

**Finding 6.2 — No stock quantity visible on Adjust Item sub-screen (Severity 1)**
When the Adjust Item sub-screen is open, the AVBL QTY for the selected item is not shown. Users must remember the figure from the parent Inventory Adjustment screen (which is no longer visible). Requiring recall of a specific number under field conditions is error-prone; the item's available quantity should be surfaced alongside the ADJ QTY entry field.

**Finding 6.3 — Redundant Item + Description columns on My Inventory (Severity 3)**
Frames 0036–0038 show that for most battery SKU items, the Item column and Description column contain identical or near-identical values (e.g., Item: "121R-C", Description: "121R-C"). The Description column only adds value for non-battery accessory items (e.g., NAPA-21 / "21 in"). The redundant column consumes half the available table width, forcing all other columns into narrower space and reducing the amount of stock information visible per row.

**Finding 6.4 — Abbreviations AVBL QTY, RSVD QTY, ADJ QTY never defined (Severity 2)**
These abbreviations appear on at least six screens (Adjustment, Adjust Item, Adjustment Review, Inventory Lookup, My Inventory, Transfer, Receiving). They are never spelled out in full, explained via tooltip, or defined in a legend. Users must learn them from training or trial-and-error — a recall burden that scales badly with technician turnover.

**Finding 6.5 — No reference quantities shown during stock count (Severity 2)**
My Stock Count initialises all On-Hand QTY values at 0. The system's recorded quantities are not shown as a reference. While intentional blind-count methodology avoids anchoring bias, no explanation of this design decision is provided on screen. Technicians completing their first count may be confused about whether system data failed to load.

**Finding 6.6 — No total summary row on Inventory Lookup (Severity 1)**
The per-location breakdown on Inventory Lookup has no total row. A technician needing to know total network-wide stock for a SKU must manually add up all On-Hand QTY values across every location row — a mental arithmetic task that is error-prone in field conditions.

---

### H7 — Flexibility and Efficiency of Use

**Finding 7.1 — No barcode scan for item selection on Adjust Item (Severity 3)**
Adding an item to an adjustment requires: tap "+" FAB → open sub-screen → tap Item dropdown → scroll list to find SKU → select. There is no barcode scan path. A technician holding a physical battery in the field could scan its label to instantly select the correct SKU. The dropdown-only path is slow and error-prone for large catalogues.

**Finding 7.2 — No barcode scan for item selection on Inventory Lookup (Severity 2)**
Same absence as 7.1. A technician checking whether a physical battery on their truck is in stock cannot scan the barcode — they must scroll a dropdown.

**Finding 7.3 — No search, filter, or sort on My Inventory (Severity 3)**
The My Inventory list can contain 20+ items (frames 0036–0038 show extensive scrolling). There is no search bar, no filter by category, no alphabet index, and no sort control. Finding a specific SKU requires scrolling the full list. For stations with large catalogues, this is a significant time cost under field conditions.

**Finding 7.4 — No barcode scan for stock count entry (Severity 3)**
My Stock Count requires tapping each cell individually to enter a quantity. In warehouse and truck inventory workflows, technicians scan items as they physically count. The absence of a scan-to-enter path makes this screen significantly slower and more error-prone than a purpose-built scan workflow.

**Finding 7.5 — No barcode scan for transfer item identification (Severity 2)**
Transfer item quantities are entered via inline cell editing. No scan path exists. For large item tables, finding the correct row is slow without a scan or search affordance.

**Finding 7.6 — No barcode scan for reference number on Receiving (Severity 2)**
Purchase order and transfer reference numbers typically appear as barcodes on delivery documentation. Forcing manual keyboard entry of alphanumeric codes (e.g., "PO-2024-03-112") is slow and error-prone. A scan-to-populate path for the Reference Number field would materially reduce entry time.

**Finding 7.7 — No icons on drawer menu items (Severity 1)**
The main Toolbox tab bar uses icons. The side drawer does not. Experienced users cannot rely on visual scanning to locate a menu item — they must read every label on each visit. Icons would allow faster visual scanning, particularly for frequent tasks like Inventory Adjustment.

---

### H8 — Aesthetic and Minimalist Design

**Finding 8.1 — Redundant Item + Description columns on My Inventory (Severity 3)**
(Also documented under H6.) Two columns conveying the same information halves the usable table width. The Description column only earns its space for accessory items. Battery SKU rows should display one identifier, freeing a full column for more useful data (e.g., AVBL QTY, location).

**Finding 8.2 — Blank image placeholder in Adjustment Review detail (Severity 2)**
The detail view for an adjustment record contains a large blank white area (approximately 25% of screen height) that appears to be a placeholder for an image or map that is not populated. There is no "no image available" label. Users may assume content failed to load and attempt to refresh. This is dead screen real estate on a small mobile display.

**Finding 8.3 — RSVD QTY column on Transfer screen adds cognitive noise (Severity 1)**
In the Transfer items table, the RSVD QTY column is informational only — reserved stock cannot be transferred. Its presence causes users to wonder whether reserved quantities are available for transfer, requiring them to mentally filter it out. If it serves only as context, it should be lower weight (smaller, grey) or absent from the transfer view.

**Finding 8.4 — Three-column receiving table includes a derived column (Severity 1)**
Receiving shows On-Hand QTY, Received QTY, and Total QTY (= On-Hand + Received). The Total column is derivable by the user. While useful for verification, this adds a column that takes up space. A running total indicator outside the table (already present as "Total Received QTY" at the top) may be sufficient.

**Finding 8.5 — "Receive Transfer" and "Receiving" as adjacent menu items (Severity 1)**
Having two items with nearly identical names in the same drawer section — especially when their functional difference is not obvious — increases cognitive load at the navigation decision point. Renaming or grouping them would reduce menu noise.

---

### H9 — Help Users Recognize, Diagnose, and Recover from Errors

**Finding 9.1 — Negative AVBL QTY displayed without visual alert (Severity 4)**
(Also documented under H1 as 1.1.) This is the most severe finding in the module. A negative available quantity is a system-level data integrity error — more units committed than exist. The current display provides zero visual differentiation from a normal value. A technician relying on Inventory Lookup to make stocking decisions may dispatch to a job expecting to use stock that does not exist.

**Finding 9.2 — Green text used for error messages — systemic semantic inversion (Severity 3)**
Green validation error text appears on Inventory Adjustment (Reason field, frame 0007) and Receiving (Reference Number field, frames 0061–0069). Green is universally and conventionally associated with success, validity, and "OK" states. Using it for error messages creates a direct semantic inversion: the message reads as a positive confirmation but carries a blocking constraint. This was documented in the main Toolbox e-invoicing audit and is confirmed here as a systemic shared-component issue.

**Finding 9.3 — "Confirm Assignment" disabled with no recovery path (Severity 3)**
(Also documented under H1 as 1.2.) Users cannot diagnose why the button is disabled. No error state, prerequisite checklist, or help text is shown. The screen is a dead end.

**Finding 9.4 — "Warning" modal for normal empty state on Receive Transfer and Transfer Review (Severity 3)**
Both screens display a "Warning" modal on load when no records are found: "No data found for location Church Street Station." An empty list is a normal operational state, not a warning condition. "Warning" implies something has gone wrong — a system error, a data integrity issue, a permissions failure. Using this severity label for a routine empty state creates unnecessary user anxiety and may prompt calls to support when none are warranted.

**Finding 9.5 — Transfer error does not re-highlight the offending cell after dismissal (Severity 2)**
After the "Transfer qty 1 cannot exceed available qty 0 for item 124R-C" error modal is dismissed with "Ok," the user is returned to the Transfer form. The cell that caused the error is not highlighted, focused, or otherwise indicated. Users must locate the offending row themselves in a potentially long table.

**Finding 9.6 — Stock count discrepancy sign convention not documented (Severity 2)**
The Adjustment Confirm screen shows a Discrepancy column with values like "-2." The sign convention (negative = fewer counted than expected vs. more counted than expected) is not documented on screen. Technicians may misread the direction of the discrepancy, leading to incorrect adjustments.

---

### H10 — Help and Documentation

**Finding 10.1 — No explanation of why "Confirm Assignment" is disabled (Severity 3)**
Users hitting this dead end on Location Assignment have no in-app resource to explain what prerequisites are missing. There is no tooltip, inline help link, or contextual documentation.

**Finding 10.2 — Reason picker provides no definitions for reason codes (Severity 2)**
The Adjustment reason picker includes: Found, Lost, Other, Returned, Rotate, Sold (manual invoice), Station to Station. No definition, example, or help text accompanies any option. "Rotate" is particularly opaque. New technicians must rely entirely on prior training to select the correct code — which creates audit trail inconsistency when different technicians apply different reasons to the same situation.

**Finding 10.3 — "Tap on the Received QTY column to update receiving quantity" instruction easily missed (Severity 1)**
This instruction on the Receiving screen (frame 0063) is correctly placed between the reference field and the table, but it competes with the validation error message and the table header. In a screen with multiple competing elements, this instructional text is easily overlooked. A persistent hint within the column header or an empty-state row cue would be more effective.

**Finding 10.4 — No explanation of Item vs Description column distinction (Severity 1)**
My Inventory shows both an "Item" column (SKU code) and a "Description" column (text description, often identical to the code). There is no legend or header tooltip clarifying what each column contains or why both are shown.

**Finding 10.5 — Abbreviation legend absent across the module (Severity 2)**
AVBL QTY, RSVD QTY, ADJ QTY, and ADJ # are used throughout without ever being defined. A module-level glossary, a first-use tooltip on these terms, or an accessible help icon on the column headers would resolve this without requiring screen redesign.

**Finding 10.6 — No explanation of why system quantities are hidden during stock count (Severity 1)**
My Stock Count initialises all quantities at 0 rather than showing the system's recorded values. Whether this is an intentional blind-count design choice or a data load issue is not communicated. A brief note ("Quantities are hidden to ensure an accurate count") would remove uncertainty.

---

## Prioritized Findings

| ID | Screen | Finding | Heuristic | Severity | Recommendation |
|----|--------|---------|-----------|----------|----------------|
| INV-01 | Inventory Lookup | Negative AVBL QTY (-3) displayed without any visual differentiation — data integrity failure is invisible | H1, H9 | 4 | Render any negative AVBL QTY value in red `#D32F2F` with a warning icon (triangle-exclamation). Add a persistent inline banner: "Stock integrity alert: available quantity is negative. Contact station manager." Negative values should never appear styled as normal data. |
| INV-02 | All data-entry screens | Green text used for inline validation errors — semantic inversion of error/success colour | H9, H5 | 3 | Replace all validation error text colour from green to `#D32F2F` (red). This is a single shared component fix. Audit every screen in the module and the main app for the same component. |
| INV-03 | Inventory Adjustment, Receiving | Premature validation errors displayed before user touches the field | H5 | 3 | Trigger validation on blur (field loses focus) or on first form-submit attempt, never on mount. Remove the `validateOnMount` or equivalent flag from the shared form component. |
| INV-04 | Location Assignment | "Confirm Assignment" button disabled with no explanation or recovery path | H1, H9, H10 | 3 | Add inline helper text below the button listing unmet prerequisites (e.g., "Scan a QR code to enable assignment"). If the button must remain disabled until a scan is completed, add a pulsing animation or arrow directing the user to the scan CTA. |
| INV-05 | Location Assignment | "Scan VIN or QR Code" button label uses wrong domain vocabulary in inventory context | H2 | 3 | Rename button to "Scan Location QR Code." If the scanner is shared with the main battery workflow, use a prop to switch the label and prompt text based on the calling context. |
| INV-06 | Receiving | "Complete Receiving" button active when required Reference Number field is empty | H5 | 3 | Disable the "Complete Receiving" button when the Reference Number field is empty or fails validation. Apply consistent required-field gating across all module submit buttons. |
| INV-07 | Transfer | Quantity validation deferred to confirmation — user can enter impossible transfer quantities without real-time feedback | H5 | 3 | Add real-time validation on Transfer QTY cell edit: if entered value exceeds AVBL QTY for that row, immediately render the cell in red and show an inline message ("Exceeds available stock: 0"). Disable Confirm Transfer until all quantities are valid. |
| INV-08 | My Stock Count | No barcode scan path for cycle count entry — requires manual cell editing on long item list | H7 | 3 | Add a scan mode to My Stock Count: scanning a barcode focuses the corresponding row, opens the quantity input, and moves to the next row on confirm. This mirrors standard warehouse counting hardware patterns and is achievable on the existing camera infrastructure. |
| INV-09 | My Inventory | No search, filter, or sort on a catalogue that may exceed 20 items | H7 | 3 | Add a persistent search bar above the My Inventory table. Filter in real-time client-side against Item code and Description. Add a sort toggle (A–Z / Z–A) on the Item column header. |
| INV-10 | My Inventory | Item and Description columns are redundant for battery SKU items — halves usable table width | H6, H8 | 3 | Merge Item and Description into a single column. If Description differs from the Item code, show it as secondary text below the code in a smaller weight. If they are identical, show only the code. Free the recovered column width for AVBL QTY, which is currently absent from this screen. |
| INV-11 | Receive Transfer, Transfer Review | "Warning" modal fires on load for a normal empty-state condition | H9 | 3 | Replace the modal with an inline empty-state component: icon + "No open transfers for this location" message. Remove the "Warning" title entirely. Reserve modal warnings for genuine system errors (connectivity failure, permission denied, etc.). |
| INV-12 | Receiving | Inline table-cell editing for Received QTY — non-standard iOS pattern, no affordance, inaccessible with gloves | H4 | 3 | Replace in-cell editing with a focused-row pattern: tapping a row highlights it and opens a numeric input control (stepper or numeric keyboard sheet) below the table. Apply the same pattern consistently to My Stock Count and Transfer. Alternatively, use a dedicated form row that slides in above the keyboard. |
| INV-13 | Adjust Item | No barcode scan for item selection — dropdown-only path for large SKU catalogues | H7 | 3 | Add a scan icon button to the Item field on Adjust Item. On scan, look up the barcode against the SKU catalogue and populate the dropdown selection. Show an error if the barcode is not recognised. Apply to Inventory Lookup, Transfer, and Receiving item selection as well. |
| INV-14 | Navigation Menu | Inventory items appear at top of drawer with no section header; GENERAL section below is labelled | H4, H6 | 2 | Add an "INVENTORY" section header above the inventory items in the side drawer, matching the visual style and weight of the existing "GENERAL" header. Consider collapsing the inventory section to a single "Inventory Management" item that expands to reveal sub-items, reducing drawer length. |
| INV-15 | All screens | AVBL QTY, RSVD QTY, ADJ QTY abbreviations never defined — recall burden for all users | H6, H10 | 2 | Spell out column headers in full: "Available", "Reserved", "Adjusted". Use the abbreviation only as a secondary label in parentheses if space requires. Add a persistent "?" help icon on the first header row that opens a bottom sheet with the glossary. |
| INV-16 | Inventory Adjustment | No delete/remove control on added item rows in adjustment table | H3 | 2 | Add a swipe-left-to-delete gesture on table rows (iOS standard) and a visible delete icon on the trailing edge of each row. Show an undo toast after deletion. |
| INV-17 | Inventory Adjustment | Unlabelled FAB "+" is the only path to the module's primary action (adding items) | H6, H4 | 2 | Label the FAB "Add Item" or replace with a full-width secondary button below the items table labelled "Add Item." The FAB pattern is appropriate for global floating actions, not for a primary form action in a constrained data-entry flow. |
| INV-18 | Adjust Item | ADJ QTY field displays full QWERTY keyboard instead of numeric keypad | H4, H5 | 2 | Set `keyboardType` to `.numberPad` (or `.decimalPad` if negative values are entered as signed decimals) on the ADJ QTY field. Apply to all quantity fields in the module: Received QTY cells in Receiving, Transfer QTY cells in Transfer, On-Hand QTY cells in My Stock Count. |
| INV-19 | Adjustment Review | Large blank image placeholder occupies ~25% of detail view screen height | H8, H1 | 2 | Remove the blank placeholder area if no image content is planned. If an image feature is planned, replace the blank with a labelled empty state ("No image attached"). Never leave blank white rectangles on a production screen. |
| INV-20 | My Stock Count | Navigating back during an in-progress count has ambiguous save/discard behaviour | H3 | 2 | Add a confirmation dialog on back-navigation: "Discard count?" with "Discard" (destructive) and "Keep Counting" options. Alternatively, auto-save the in-progress count as a draft and show a "Resume Count" entry point the next time the user opens My Stock Count. |
| INV-21 | Transfer | Selected destination row scrolls off-screen as user moves to item quantity section | H1 | 2 | Add a persistent sticky summary bar at the top of the Transfer screen showing the selected destination name and type. Update it reactively as the selection changes. Alternatively, split Transfer into two steps: (1) select destination, (2) set quantities — with the destination confirmed as the screen title on step 2. |
| INV-22 | Inventory Lookup | No total summary row across all locations for selected SKU | H6 | 1 | Add a sticky "Total" row at the bottom of the Inventory Lookup location table showing the sum of On-Hand, RSVD, and AVBL QTY across all locations. Pin it to the bottom of the table or above the scrollable area. |
| INV-23 | Adjustment Review | "By" column shows raw email addresses — harder to scan than display names | H1 | 1 | Display the technician's display name (First Last) in the "By" column. Fall back to email address only if no display name is set. Truncate long values with ellipsis consistently. |
| INV-24 | My Inventory | Missing AVBL QTY column forces technicians to compute On-Hand minus RSVD mentally | H2, H6 | 1 | Add an AVBL QTY column to My Inventory (possible after merging Item + Description per INV-10). Colour code: grey for 0, red for negative, default for positive. |
| INV-25 | Navigation Menu | "Receive Transfer" and "Receiving" as adjacent items with near-identical names | H8, H2 | 1 | Rename to make the distinction explicit: "Receive Transfer (from location)" and "Manual Receiving (PO / reference)." Add a brief subtitle under each drawer item (one line of smaller text) explaining the use case. |

---

## Systemic Patterns

The following issues appear across multiple screens. They require fixes at the component or framework level — patching them screen-by-screen would be incomplete and create future maintenance debt.

### SP-1: Green validation error text

**Screens affected:** Inventory Adjustment (Reason field), Receiving (Reference Number field). Also documented in the main Toolbox e-invoicing audit (Customer Details, Estimate form fields).

**Pattern:** A shared form component renders validation error messages in green. Green is semantically reserved for success/valid states in every major design system (Material Design, iOS HIG, WCAG guidance). Using it for errors creates a direct colour-semantic inversion that causes users to read errors as confirmations.

**Required fix:** Change the shared error text component to render in red (`#D32F2F` or equivalent). This is a single token or style change that will propagate to every screen using the component. Do not patch individual screens — find the root.

**Priority:** Fix before any other visual changes ship. This affects user safety: a technician misreading a red-coded required field as "OK" and proceeding may create records with missing required data.

---

### SP-2: Inline table-cell editing

**Screens affected:** My Stock Count (On-Hand QTY), Transfer (Transfer QTY), Receiving (Received QTY).

**Pattern:** Three quantity-entry workflows use in-cell table editing. The pattern has no visible affordance (no edit icon, no tap target border, no instruction — except the easily-missed text on Receiving). It is non-standard for iOS, prone to accidental activation with gloved hands, and inconsistent with the rest of the app's form interaction model.

**Required fix:** Adopt a consistent quantity-entry pattern across all three screens. Recommended: a focused-row pattern where tapping a row opens a numeric input control (stepper or number pad sheet) pinned above the keyboard. Apply the same component to all three screens. Consider also using a stepper (+/- buttons) for small integer adjustments (where the range is bounded and visible).

---

### SP-3: No barcode scan for item lookup

**Screens affected:** Adjust Item (item selection), Inventory Lookup (item selection), My Stock Count (count entry), Transfer (item identification), Receiving (reference number, item identification).

**Pattern:** Every flow that involves identifying a specific SKU or reference number relies on dropdown scrolling or manual keyboard entry. The Toolbox app already has camera infrastructure (VIN scanner). Extending it to barcode scanning for inventory purposes is architecturally achievable without a new hardware investment.

**Required fix:** Build a shared scan-to-select component that accepts a barcode, looks it up against the SKU catalogue or reference number space, and populates the relevant field. Integrate at all five touchpoints. This is the highest-leverage efficiency improvement in the module — it transforms the module's usability for technicians operating in field conditions.

---

### SP-4: "Warning" modal for empty state

**Screens affected:** Receive Transfer, Transfer Review (confirmed in recording). Likely also other list screens in the module where the response returns an empty array.

**Pattern:** A shared "no results" handler fires a modal with the title "Warning" and the message "No data found for location [name]." The modal must be explicitly dismissed before the user sees the empty list. This pattern misrepresents the severity of an empty state and introduces unnecessary friction.

**Required fix:** Replace the modal with an inline empty-state component: an illustration or icon, a plain-language message ("No open transfers for this location"), and optionally a primary CTA ("Initiate a Transfer"). Reserve the Warning modal for genuine error conditions (network failure, permission denied, authentication expired). This is a shared handler change — update it once, and all affected screens improve.

---

### SP-5: Premature validation on form mount

**Screens affected:** Inventory Adjustment (Reason field), Receiving (Reference Number field). Same pattern reported in main app Estimate/E-Invoice form.

**Pattern:** Required-field validation messages appear immediately on screen render, before the user has interacted with any field. This is a `validateOnMount` or equivalent flag set to true on the shared form component. It has two compounding effects: (1) it makes validation noise ubiquitous from the first second, training users to ignore it; (2) combined with the green colour issue (SP-1), the messages look like success states that can be disregarded.

**Required fix:** Set validation to trigger on blur (field loses focus) or on first submit-attempt only. Remove `validateOnMount: true` (or equivalent) from the form initialiser used by these screens. This is a single shared configuration change.

---

### SP-6: Abbreviations without definition

**Screens affected:** Inventory Adjustment (AVBL QTY, ADJ QTY), Adjustment Review (ADJ #), Inventory Lookup (On-Hand QTY, RSVD QTY, AVBL QTY), My Inventory (RSVD QTY), Transfer (RSVD QTY, Transfer QTY), Receiving (Received QTY, Total QTY).

**Pattern:** Data column labels use abbreviations that are internally consistent but not self-documenting to users without prior training. The same abbreviations appear on six or more screens, confirming they are generated by shared column-definition data, not per-screen copy.

**Required fix:** Update the shared column label definitions to use full English phrases: "Available" instead of "AVBL QTY," "Reserved" instead of "RSVD QTY," "Adjusted" instead of "ADJ QTY." If screen width forces abbreviation, use full labels in a sticky glossary accessible from a "?" icon on any screen that contains the table. Update the shared column-definition file once.

---

## Cross-Module Patterns (with main Toolbox app)

Several inventory module findings confirm patterns already documented in the main Toolbox app audit. These are not module-specific design decisions — they are systemic issues across the entire Toolbox product.

| Pattern | Main App Finding | Inventory Module Confirmation |
|---------|-----------------|-------------------------------|
| **Green error text** | E-invoicing Estimate form: green colour used for required-field validation errors throughout; errors overlooked | Inventory Adjustment (Reason) and Receiving (Reference Number) show identical green error text; confirmed shared component |
| **Premature validation** | E-invoicing: "Pre-emptive validation errors appear on screen load before any user interaction — noise that trains users to ignore warnings" | Inventory Adjustment and Receiving: same trigger, same timing |
| **Disabled button with no explanation** | E-invoicing: "'Next' button disabled with no summary of which fields are blocking progress" | Location Assignment: "Confirm Assignment" disabled with no prerequisite explanation |
| **Success modals with ambiguous "sent" language** | Not previously documented in main app notes | Inventory Adjustment, My Stock Count: "has been sent" — introduces doubt about acceptance vs. queuing |
| **Unlabelled camera/scan CTA** | VIN Scanner: "launches to blank dark blue screen — no viewfinder, no reticle, no guide" | Location Assignment: "Scan VIN or QR Code" button inherits wrong label from main app scanner context |
| **Abbreviations and truncated labels** | Battery Details: "Vendor Part" shown without explanation; Media Library: titles truncated | AVBL QTY, RSVD QTY, ADJ QTY across six screens; Description column truncated on My Inventory |

The co-occurrence of these patterns in both the main app and the inventory module is strong evidence that they originate in shared components, not in per-feature design decisions. Fixing them at the component level will improve both the main app and the inventory module simultaneously.

---

## Positive Patterns to Preserve

The following design choices are working well and should be carried forward into any redesign.

**1. Location Details confirmation on selection (Location Assignment)**
When a location is selected from the dropdown, the full address block appears immediately below ("987 Church Street / Orlando, FL 32750 / USA"). This is a strong recognition aid — the user can verify they chose the right location before confirming. Preserve and apply to other entity-selection flows in the module.

**2. Available quantity shown alongside adjustment quantity (Inventory Adjustment table)**
The adjustment items table shows AVBL QTY alongside ADJ QTY, allowing technicians to see current available stock while entering an adjustment delta. This is the right data for sanity-checking an entry. Preserve this co-location.

**3. Reason picker constrains vocabulary (Inventory Adjustment)**
Instead of a free-text comment for adjustment reason, a constrained dropdown ensures consistent audit trail categorisation. This is correct for compliance and reporting. Preserve the constraint; improve the definitions (see INV-17 recommendation on help text).

**4. Adjustment Confirm discrepancy surfacing (My Stock Count)**
When a stock count finds discrepancies, the Adjustment Confirm screen lists them explicitly (item, expected, counted, delta) and offers the user a choice: Recount or create an Adjustment. This is a genuine safety net that prevents silent over-writing of stock records. Preserve and strengthen (add sign-convention documentation per INV-20).

**5. "Finish My Stock Count" button label (My Stock Count)**
Clear, action-oriented, describes exactly what happens. This is the right copy pattern — use it as a model for other submit labels in the module.

**6. Destination type column on Transfer screen**
The destination selection table includes a "Type" column (Truck / Warehouse) alongside the location name. This helps technicians distinguish between a mobile truck location and a fixed warehouse without needing to memorise location names. Preserve.

**7. Purple row highlight for selected destination (Transfer)**
The purple/indigo highlight on the selected destination row provides clear, unambiguous selection feedback. Preserve the selection affordance; address the scroll-off-screen issue separately (INV-21).

**8. Scope indicator on list screens (Adjustment Review, Receive Transfer, Transfer Review)**
All three list screens explicitly label their time scope ("Last 7 days," "Open + Last 7 days"). Users know exactly what they are looking at. This transparency is the right pattern — extend it to the desktop manager view when that audit is completed.

**9. Large tap targets on drawer menu items**
Menu items in the drawer have generous vertical padding appropriate for gloved hands. Do not reduce this when adding section headers or restructuring the drawer.

**10. Per-location breakdown on Inventory Lookup**
Showing stock split by location (Main Truck, Church, Lake Mary) using recognisable real-world names rather than internal IDs is the right data model for field use. Preserve the location-name approach; add total summary row (INV-22).

**11. Running Total Received QTY counter (Receiving)**
The live counter at the top of the receiving table updates as quantities are entered. Technicians can verify their total before submitting. Preserve; clarify the colour-coding convention (INV-08 / H1 finding 1.8).

**12. Cancel button parity with Add Item (Adjust Item)**
Cancel and Add Item are equally sized, giving technicians a clear escape path without requiring the hardware back button. Preserve this affordance on sub-screens and modal sheets throughout the module.

---

## Recommended Design Principles for Redesign

The following principles are derived directly from the finding clusters above. They should guide the redesign of the Inventory Management module and inform any shared-component decisions that affect both the module and the main Toolbox app.

### Principle 1: Scan-first for every physical object interaction

Every workflow in the module involves a physical object — a battery SKU, a location QR label, a purchase order barcode, an item on a truck shelf. The current design routes all of these through dropdown scrolling and keyboard entry. The redesign should make barcode scan the primary input method for any field that identifies a physical object, with dropdown/keyboard as the explicit fallback.

Concretely: every Item selection field (Adjust Item, Inventory Lookup, Transfer, Receiving), the Location field (Location Assignment), and the Reference Number field (Receiving) should offer a scan icon as the leading control, matching the VIN scan pattern already established on Battery Search.

### Principle 2: Error colour is load-bearing

The current green error text is not a cosmetic issue — it is a functional inversion that causes validation messages to be ignored. In a module where a wrong quantity entry creates a real inventory discrepancy, ignoring a validation message has downstream operational consequences. Error colour must be fixed before any other visual changes are released. Red (`#D32F2F`) on white meets WCAG AA contrast for error states. This single change, applied at the shared component level, has the highest impact-to-effort ratio of any fix in this audit.

### Principle 3: Quantity entry must be glove-safe and numeric-only

Every quantity field in the module (ADJ QTY, Transfer QTY, Received QTY, On-Hand QTY in stock count) must trigger a numeric keypad, not a QWERTY keyboard. This applies the `keyboardType: .numberPad` (or `.decimalPad` for signed values) attribute on every relevant input. Inline cell editing should be replaced with a focused-row numeric-entry pattern that presents a single, clearly-bounded input area with a large confirmation button — appropriate for gloved hands in variable outdoor lighting.

### Principle 4: System status must be explicit, not inferred

Three categories of system status are currently invisible or ambiguous:
- **Data integrity alerts** (negative AVBL QTY) — must become visually distinct, never styled as normal values
- **Button disable states** (Confirm Assignment) — must always be accompanied by an explanation of the blocking condition
- **Success confirmations** ("has been sent") — must state clearly whether the record is saved locally, queued for sync, or accepted by the server

Technicians working under time pressure cannot afford to infer system state. Every status change must be explicit, labelled, and appropriately coloured.

### Principle 5: Empty state is not an error state

"Warning" modals for empty lists are a false alarm pattern. An empty list is a normal, expected data state. Warnings imply something has broken. The module should adopt an inline empty-state component (icon + plain-language message + optional CTA) for all zero-result list screens. This pattern is already established in good-practice iOS design (e.g., iOS Mail empty inbox, iOS Photos empty album) and requires no user training.

### Principle 6: Abbreviations are a onboarding tax

AVBL QTY, RSVD QTY, ADJ QTY, and ADJ # appear on six screens and are never defined. Each technician who encounters these abbreviations for the first time must either guess, ask a colleague, or reference training materials. At scale across hundreds of technicians with varying tenure, this is a significant and avoidable support cost. The fix is a one-time update to the shared column-label definitions. Full English labels should be the default; abbreviations are acceptable only as secondary display on narrow-column layouts.

### Principle 7: Navigation hierarchy must be communicated, not assumed

The 11 inventory items in the side drawer are not labelled as inventory items. A technician who opens the drawer for the first time after receiving inventory access sees a longer list than before, with no explanation of what changed or why. A labelled "INVENTORY" section header and a brief contextual note (e.g., "Stock Assist — enabled by your station manager") would eliminate this first-encounter confusion without requiring a tutorial.

---

## Open Questions for Follow-Up

The following questions were raised by the recording analysis but cannot be answered without additional access or investigation.

| # | Question | Why it matters | Who to ask |
|---|----------|---------------|------------|
| 1 | Is inventory deduction triggered automatically when an invoice is completed, or is it always manual? | If manual, the Inventory Adjustment step is a required post-job task that is currently invisible in the main technician workflow and likely skipped under time pressure | Club Assist product / Nathan |
| 2 | What triggers a negative AVBL QTY — is it a booking system, a manager override, or a data sync issue? | Determines whether the fix is a UI alert, a business rule enforcement, or a backend validation | Club Assist dev / Rich |
| 3 | Is the 7-day window on Adjustment Review and Receive Transfer a mobile UI decision or a server-side limit? | If server-side, a date range picker won't help; the data needs to be retained longer on the API | Club Assist dev / Rich |
| 4 | Does the inventory module work offline? If so, how do adjustments sync when connectivity is restored? | Technicians pre-checking stock may be in poor-coverage areas; offline behaviour determines whether the module is usable at its primary use point | Club Assist dev / Rich |
| 5 | Can a technician be assigned to multiple locations? | If yes, the module needs a location-context switcher — currently absent from every screen | Club Assist product / Nathan |
| 6 | What is the approval workflow for adjustments? Does a station manager need to review and confirm before they take effect? | Determines whether the mobile "sent" success state is the end of the workflow or an intermediate step | Club Assist product / Eric |
| 7 | Is the "Rotate" reason code used in practice? What does it mean to the operations team? | If it is rarely used or internally defined, it may be a candidate for removal or renaming to reduce picker noise | Club Assist ops / Jocelyn |
| 8 | What was the image placeholder in Adjustment Review designed to show? Is this a feature stub or a dead design artifact? | Determines whether to build the feature or remove the placeholder entirely | Club Assist dev / Rich |
| 9 | How does My Stock Count interact with the desktop manager view? Does the manager see the count result and approve discrepancies? | Determines the full flow from count → adjustment, and what the mobile technician should see as confirmation | Club Assist product / Nathan |
| 10 | What barcode format do location QR labels use? Is there a standard label already in use at stations? | Required to implement the scan-to-select component for Location Assignment and item lookups | Club Assist ops / Jocelyn |

---

## Out of Scope

- **Desktop / station manager counterpart** — No recording available. Revisit when access is secured. Key unknowns: manager configuration UI (how locations are created and assigned to technicians), adjustment approval workflow (whether manager review is required before adjustments take effect), station-level inventory dashboard (what aggregate views are available), and full audit trail access (whether the 7-day mobile window reflects a server-side limit or a mobile UI decision).

- **Permission enablement flow** — How station managers grant inventory module access to technicians is not shown in the recording. The consequence of tapping an inventory menu item without the correct permission is also not captured.

- **Integration with e-invoicing** — Whether completing an invoice automatically triggers an inventory adjustment (deducting the fitted battery from the truck's stock), or whether all adjustments are manual, is unclear from the recording. This integration question is operationally significant: if manual, the adjustment step is a required post-job task that is currently not surfaced in the main technician workflow.

- **Offline behaviour** — How the inventory module behaves when the device is offline (the main app's hard-block offline state) is not demonstrated in the recording. Given that technicians may be checking stock while in poor-coverage areas (parking lots, rural locations), offline behaviour is a significant operational question.

- **Multi-location technicians** — Whether a technician can be assigned to multiple locations (e.g., a floating technician who works from different trucks), and how the module handles location switching, is not shown.
