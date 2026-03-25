# Inventory Management — Raw Analysis Notes
Source: screenshots/inventory/frame_0001.png – frame_0071.png
Date analyzed: 2026-03-25

---

## Frame-by-Frame Analysis

### Inventory Module Home (Navigation Menu) — frames 0001–0002, 0005, 0021, 0026, 0035, 0048, 0057, 0060

**Purpose:** Side-drawer navigation menu exposing all Inventory Management sub-modules alongside the main Toolbox app functions. This is the primary wayfinding surface for the entire inventory feature set.

**User task:** Navigating to a specific inventory function (Adjustment, Lookup, Transfer, etc.)

**Issues observed:**
- [H4, Sev 2] The inventory items (Assign Location through Transfer Review) sit inside the same side-drawer as the main Battery Search workflow. There is no visual grouping, divider, or section header separating "Inventory" features from "Battery Search" features. Users new to the module cannot identify which items belong to inventory at a glance. Frame 0057 and 0060 reveal a "GENERAL" section header below a secondary scroll position, suggesting section labelling exists elsewhere in the menu but is entirely absent at the top of the list where the inventory items are displayed.
- [H6, Sev 2] The full list of inventory module names requires working knowledge of the system's internal architecture. Titles like "Adjustment Review", "Receive Transfer", and "Transfer Review" are not self-describing; a technician encountering this for the first time cannot infer task flow from menu labels alone.
- [H8, Sev 1] "Assign Location" and "Unassign Location" appear as sibling items with equal visual weight. Their relationship (they are inverses of each other for the same object) is not communicated by proximity, indentation, or grouping.
- [H7, Sev 1] There are no icons next to menu items. The main app's footer tab bar uses icons; the side drawer does not. Experienced users cannot use visual scanning to find their item — they must read every label each time.
- [H2, Sev 1] "Receive Transfer" vs "Receiving" — two distinct menu items with nearly identical intent surface in frames 0057 and 0060 after scrolling. "Receiving" appears to be a separate workflow (manual receiving without a transfer record). Having both in the menu with similar names creates confusion about which to use and when.

**Positive patterns:**
- Menu items are large tap targets with generous padding — appropriate for gloved hands.
- Return to the menu from any sub-screen is consistent (hamburger icon top-right on main app view, Back on sub-screens).

**Friction signals:**
- No indication of which items are restricted / add-on vs always available — a technician without inventory permissions would see the same list and get no feedback until tapping.

---

### Location Assignment — frames 0003–0004

**Purpose:** Assign an inventory location to a scanned item or vehicle. Entry point for starting physical tracking of a battery at a specific station location.

**User task:** Select a location from a dropdown and confirm the assignment, or use QR scan to auto-populate.

**Issues observed:**
- [H2, Sev 3] The primary action button reads "Scan VIN or QR Code." VIN (Vehicle Identification Number) is automotive vocabulary — used in the main battery-finding workflow for matching batteries to vehicles. In an inventory management context, a technician is not scanning a vehicle; they are scanning an inventory QR label. The word "VIN" imports the wrong mental model. A technician scanning a battery bin label would hesitate, unsure whether "VIN" means the battery or the truck.
- [H1, Sev 3] "Confirm Assignment" is disabled on screen load (frame 0003) with no visible explanation of what prerequisites must be met. The button appears styled identically to an active button but does not respond. No helper text, no tooltip, no inline message explains why. Frame 0004 shows a location selected — even with a location populated ("Church Street Station") and Location Details visible, the button remains disabled. This confirms a prerequisite beyond location selection is blocking the button, but it is never communicated to the user.
- [H9, Sev 3] Because the "Confirm Assignment" button is disabled without explanation, when users cannot proceed they have no pathway to diagnose or recover. They must guess: Is it a permissions issue? A missing scan? A server error?
- [H5, Sev 2] "Or Select a Location" label appears between the scan button and the dropdown. The conjunction "Or" implies these are equivalent alternatives. However if both a VIN scan and a location selection are required to enable the Confirm button, this framing actively misleads the user about the task model.
- [H6, Sev 2] No indication of what has previously been assigned to the selected location. Users cannot tell whether the location is already occupied before confirming.
- [H4, Sev 1] The "Inventory Location" dropdown label and "Location Details" label are left-aligned but use different styling weights, giving an inconsistent typographic hierarchy. The address block ("987 Church Street / Orlando, FL 32750 / USA") appears in a faint box with no label weight — easily missed.

**Positive patterns:**
- Location Details (address confirmation) appearing on selection in frame 0004 is a strong recognition aid — user can verify they chose the right location before confirming.
- "Or Select a Location" dual-path design acknowledges that not all technicians will have a QR scanner available.

**Friction signals:**
- "Confirm Assignment" disabled with no explanation — this is the highest-friction dead end in the entire module.
- "Scan VIN" wording in an inventory context is disorienting; technicians may attempt to scan a vehicle VIN instead of a location QR code.

---

### Inventory Adjustment — frames 0007–0020

**Purpose:** Record a manual adjustment to inventory quantities (positive or negative delta) with a reason code. Used for found/lost/returned/rotated stock.

**User task:** Select a reason, add one or more items with quantities, optionally add a comment, then save.

**Issues observed:**
- [H5, Sev 3] "Reason is required." validation error appears on screen load (frame 0007) before the user has touched the Reason field. The message is displayed in GREEN text. Green is universally associated with success/valid states. Using green for an error message is a direct semantic inversion. This was previously spotted in the main app and recurs identically here — confirming a systemic design pattern problem.
- [H1, Sev 2] The floating action button (FAB) "+" for adding items (frame 0007) is unlabelled. Its function is not self-evident. On first encounter, users cannot know whether tapping "+" adds an item, opens a camera, or triggers a different action. The name "Adjust Item" only appears after tapping (frame 0009/0012), which requires navigating into a sub-screen.
- [H6, Sev 2] The item table shows columns: Item | AVBL QTY | ADJ QTY (+/-). "AVBL QTY" is an abbreviation for "Available Quantity." For users not familiar with inventory terminology abbreviations, this is non-obvious. The column header is truncated rather than spelled out.
- [H7, Sev 2] No barcode scan path for adding items. In frames 0009–0015, adding an item requires tapping "+" → opening "Adjust Item" sub-screen → tapping the "Item" dropdown → scrolling a list to find the battery code. In a field environment where technicians work from physical inventory, a scan-to-add path would dramatically reduce lookup time and error.
- [H8, Sev 1] When the Reason picker is open (frame 0008, 0011), the selected option ("Returned") is highlighted with a checkmark on the right but the picker occupies most of the lower screen with no visual distinction between the selected item and unselected items beyond the check. The list appears visually flat.
- [H4, Sev 2] The Inventory Adjustment screen uses a hybrid navigation pattern. The reason is a standard dropdown at the top of the form. Items are managed via a FAB that opens a separate sub-screen (Adjust Item). The Comment field is at the bottom of the main form. This is an unusual form architecture on mobile — mixing inline form fields, a sheet-launcher FAB, and a separate table into one screen creates a non-standard interaction model.
- [H3, Sev 2] There is no delete/remove button visible on table rows once items are added (frame 0016–0018). Users who add an item by mistake have no visible path to remove it. The table cell appears read-only after entry.
- [H1, Sev 1] The "Save" button (frame 0016) only appears after an item has been added to the table — it is absent from the empty-state view (frame 0007). This dynamic appearance is unexpected and reduces discoverability of the submission action.
- [H9, Sev 2] After saving, the success modal reads "Information — Adjustment has been sent." (frame 0020). "Sent" implies the record went somewhere (a server, a manager's queue?) but does not confirm it was saved, processed, or accepted. The title "Information" is generic and uninformative.
- [H2, Sev 1] Reason picker options include "Found", "Lost", "Other", "Returned", "Rotate", "Sold (manual invoice)", "Station to Station". These are business-process-specific terms. "Rotate" in particular is opaque without knowing this refers to stock rotation procedures. New technicians have no in-context guidance on which reason to select.

**Positive patterns:**
- Reason picker provides a constrained vocabulary list — prevents free-text entry errors and ensures consistent audit trail categories.
- AVBL QTY is shown alongside ADJ QTY in the table (frame 0016), allowing the technician to see current available stock while entering an adjustment — helpful for sanity checking.
- Comments field is optional and appropriately de-emphasized.
- The "Adjust Item" sub-screen is minimal and focused: only two fields (Item + ADJ QTY).

**Friction signals:**
- Green error text on Reason field before user interaction — likely causes the field to be ignored as a success indicator rather than read as a required warning.
- Unlabelled FAB requires discovery through trial.
- No row deletion visible after adding items.

---

### Adjust Item (Sub-screen) — frames 0009–0010, 0012, 0014–0015

**Purpose:** Modal/sub-screen for selecting a specific item code and entering an adjustment quantity (+/-). Launched from the Inventory Adjustment FAB.

**User task:** Select battery SKU from dropdown, enter quantity delta, confirm.

**Issues observed:**
- [H7, Sev 3] Item selection is exclusively via dropdown list. In frames 0009 and 0012, the dropdown opens a scrollable list of battery codes (e.g., 121R-C). There is no search or filter capability. For a station with a full catalogue of SKUs, this requires significant scrolling. Battery technicians working with physical inventory need fast SKU lookup — barcode scan or type-ahead search would reduce task time significantly.
- [H2, Sev 2] "ADJ QTY (+/-)" is the only field label explaining adjustment direction. The "(+/-)" notation in the label is the only indicator that negative values are valid. There is no placeholder text in the input field, no hint that entering "-3" would reduce stock. First-time users may not realise negative adjustments are permitted without this clarifying indicator in the field itself.
- [H4, Sev 1] The "Add Item" button (frame 0015) enables only when both fields are populated. This is correct progressive disclosure, but the button label "Add Item" does not contextually clarify that pressing this returns to the Adjustment screen and adds to the table — it sounds like it might trigger an API call immediately.
- [H6, Sev 1] No current stock quantity is shown on the Adjust Item sub-screen. Users cannot see AVBL QTY before deciding on the adjustment delta — they must remember it from the parent screen (which is no longer visible).
- [H5, Sev 2] The quantity field accepts alpha-numeric input (keyboard type shown in frame 0010 includes letters). A user with gloves could accidentally type a letter. No input mask or numeric-only keyboard is enforced at this entry point.
- [H4, Sev 1] The keyboard type shown when editing ADJ QTY in frame 0010 is a full QWERTY keyboard, not a numeric pad. For a quantity field, the numeric pad (or decimal-aware number keyboard) is the iOS-standard type to trigger.

**Positive patterns:**
- Cancel button is equally sized to Add Item — clear escape path without needing Back.
- Item dropdown is consistent with the pattern used elsewhere in the module.

**Friction signals:**
- No search on item dropdown — significant friction for large catalogues.
- Full text keyboard appearing for a numeric-only field.

---

### Adjustment Review — frames 0022–0025, 0027

**Purpose:** Read-only history view of past adjustments for the current station, scoped to the last 7 days. Tapping a row reveals full adjustment detail.

**User task:** Review recent adjustment records, verify what was adjusted, by whom, and when.

**Issues observed:**
- [H1, Sev 2] Frame 0022 shows the list view with columns: ADJ # | Date | By. The "By" column displays email addresses (e.g., "gojilabs@mail1.com"). In field contexts, a display name or employee ID would be more meaningful than a raw email address. Email addresses are long strings that cause the column to be visually dense and harder to scan quickly.
- [H6, Sev 2] The detail view (frames 0023–0024) shows a large blank area at the top that appears to be a placeholder for an image or map — it is uniformly white/blank. No content, no label, no "no image available" indicator. Users may assume content failed to load and attempt to refresh.
- [H8, Sev 2] The blank area in the detail view (approximately 1/4 of the screen height) is wasted space with no content and no explanation. This is dead real estate on a small mobile screen.
- [H1, Sev 1] "Adjustment Activity: Last 7 days" scope indicator is shown in the list header but there is no mechanism to change the time window. Users cannot look back more than 7 days. No pagination, no date filter, no "load more" control is visible.
- [H2, Sev 1] "ADJ #" abbreviation for Adjustment Number is consistent internal nomenclature but may not be obvious to new users.
- [H4, Sev 1] The detail view title remains "Adjustment Review" rather than showing the specific ADJ # — inconsistent with iOS navigation conventions where the back button typically reflects the parent screen and the title reflects the current view's content.

**Positive patterns:**
- Adjustment detail (frame 0025) shows a clean, structured layout: Reason, Date, Adjusted By, and an Items table with ADJ QTY. The comments field is also shown.
- Tapping a row expands to the full detail — the list-to-detail pattern is standard and appropriate.
- "Last 7 days" scope is explicitly labelled — users know exactly what they are seeing.

**Friction signals:**
- Blank image placeholder in detail view with no explanation.
- Email address in "By" column is harder to quickly read than a name.

---

### Inventory Lookup — frames 0028–0034

**Purpose:** Look up available, on-hand, and reserved quantities for a specific item across all station locations.

**User task:** Select a SKU from a dropdown and view per-location stock breakdown.

**Issues observed:**
- [H9, Sev 4] Frame 0029 shows "Main Truck" location with On-Hand QTY: 0, RSVD QTY: 3, AVBL QTY: -3. A negative available quantity is a data integrity signal — reserved quantities exceed on-hand stock. The value is displayed without any visual differentiation (no red colour, no warning icon, no asterisk). A technician looking at this data has no way to distinguish "-3" as an abnormal state vs. a normal zero or a deliberate allocation. In a stock management system, a negative available quantity is a critical alert — it means more stock has been committed than physically exists.
- [H2, Sev 3] "RSVD QTY" is an abbreviation for "Reserved Quantity." In the context of roadside battery service, "reserved" inventory refers to batteries allocated to open jobs. The abbreviation is not defined anywhere on screen. New users cannot interpret what "RSVD" means without prior training.
- [H6, Sev 2] "On-Hand QTY" vs "AVBL QTY" distinction is critical for operational decisions, but the difference (on-hand minus reserved = available) is not explained anywhere on screen. Users who don't understand the formula may misread availability.
- [H7, Sev 2] Item selection is again exclusively via dropdown — same limitation as Adjust Item. No scan-to-lookup path. A technician holding a physical battery in the field could scan its barcode to instantly look up its network-wide stock — this capability is absent.
- [H8, Sev 1] Frames 0031–0034 show the user scrolling through the same data repeatedly (the table scrolls to reveal more locations). The table is not paginated or grouped; it is a flat scroll. With many locations, finding the relevant truck location requires scrolling through all warehouse locations first.
- [H1, Sev 1] No total row or summary at the bottom of the location table. Users must manually add up On-Hand QTY values across all locations to determine network-wide stock — this mental arithmetic is error-prone, especially under field conditions.

**Positive patterns:**
- The per-location breakdown is genuinely useful operational data — technicians can see which truck and which warehouse holds stock.
- Item selection dropdown initialises empty, prompting the user to make a selection before data is displayed — avoids showing stale or wrong data.
- Location names ("Main Truck", "Church", "Lake Mary") use recognisable real-world names, not internal IDs.

**Friction signals:**
- Negative AVBL QTY shown without visual differentiation — this is a data quality flag that is currently invisible to users.
- No total summary row.
- No barcode scan path.

---

### My Inventory — frames 0036–0038

**Purpose:** View the current user's (or station's) complete inventory catalogue with on-hand and reserved quantities per SKU.

**User task:** Scan/review the full item list to assess stock levels at a glance.

**Issues observed:**
- [H8, Sev 3] Frames 0036 and 0038 show columns: Item | Description | On-Hand QTY | RSVD QTY. The "Item" and "Description" columns contain identical or near-identical values for all battery SKUs — e.g., Item: "121R-C", Description: "121R-C". In frame 0037, some items diverge slightly: "NAPA-21" / "21 in", "Windshiel" / "Double" (truncated). The battery part-number code IS the description for most items, making this a redundant column that halves available display width without adding information.
- [H6, Sev 2] Column headers in frame 0036–0038 are "Item" and "Description" — both are generic labels that don't clarify meaning. "Item" = battery SKU code. "Description" = product description (though in practice shows the same code). Neither label guides a technician unfamiliar with the data model.
- [H7, Sev 3] No search, filter, or sort capability on My Inventory. Frame 0036 starts with "121R-C" and frame 0037 shows "NAPA-21" through "Windshiel" further down the list, confirming a long scroll. With 20+ items (and likely more in a real station), finding a specific SKU requires scrolling the entire list. No alphabet index, no filter bar, no scan-to-jump.
- [H5, Sev 1] "Description" column values are truncated in the cell — "140RAGM" shows as "140RAGM" (appears cut off from "140RAGM-C" in the Item column), "Windshiel" is clearly truncated. Truncation without a tooltip or expand gesture means users cannot see the full description.
- [H2, Sev 1] No AVBL QTY column. My Inventory shows On-Hand and RSVD but not the derived Available figure that is actually actionable for a technician deciding whether they can fulfil a job. They must mentally compute: On-Hand minus RSVD.
- [H4, Sev 1] RSVD QTY column appears here but is labelled differently from other screens — on Inventory Lookup it was "RSVD QTY", here it is also "RSVD QTY". Consistency is maintained in this case, but the absence of AVBL QTY creates an asymmetry with the Lookup screen which shows all three figures.

**Positive patterns:**
- The flat table is clean and uncluttered for items where Item and Description differ — the NAPA items in frame 0037 (NAPA-21 / 21 in) show the Description adding genuine value for accessory items.
- Row alternating shading (light grey / white) aids row tracking when scrolling.

**Friction signals:**
- No search on a long scrollable list is the dominant friction point.
- Redundant Item + Description for most SKUs wastes column width.
- Truncated values in Description column.

---

### My Stock Count — frames 0040–0048

**Purpose:** Conduct a physical stock count for the current location. Technician enters actual on-hand quantities for each item, then finishes the count. If discrepancies exist vs system records, the user is prompted to Recount or create an Adjustment.

**User task:** Walk through physical inventory, enter counted quantities for each item, submit count.

**Issues observed:**
- [H6, Sev 2] Frames 0040–0041, 0044–0045 show stock count tables with two pages of items. All On-Hand QTY values begin as 0. There is no indication of what the system's *expected* on-hand quantity is — the technician cannot tell what the system thinks they should have. They are counting blind, with no reference to compare against. (This may be intentional to prevent anchoring bias, but there is no documentation explaining this choice.)
- [H5, Sev 2] Frames 0041 and 0044 show different page views of the same count — items like "65-XD, 75-C, 78-XD" appear in one scroll position and "121R-C, 124R-C" in another. The table spans multiple scroll pages with no sticky header count or progress indicator. Users cannot tell how many items remain to be counted.
- [H7, Sev 3] No barcode scan-to-enter capability. In a warehouse/truck stock count scenario, technicians scan items as they count. Requiring manual scrolling to find the correct row and then tapping to enter a quantity is error-prone and slow, particularly for large item lists.
- [H4, Sev 1] Inline table-cell editing: tapping a cell in the On-Hand QTY column appears to open it for editing (frame 0041 shows "0" values as if editable). No explicit edit affordance (pencil icon, tap-to-edit hint) is visible. Mobile table cell editing is a non-standard pattern — the affordance is invisible.
- [H1, Sev 1] Frame 0045 shows items with descriptive names ("New battery posts", "Test", "Test Item 1", "Double Replacement", "Single Replacement") — these appear to be custom items added by the station, not standard SKUs. The count list mixes standard battery codes and custom items with no visual grouping. Users must scroll through all categories.
- [H3, Sev 2] After the stock count is submitted, if discrepancies exist (frame 0042/0043/0046), the "Adjustment Confirm" screen appears. However, the user arrived at this screen from "My Stock Count" and the back button takes them back to the stock count. There is no "Discard Count" option — if a user navigates back, it's unclear whether the count is saved, discarded, or locked.
- [H9, Sev 2] "Adjustment Confirm" screen (frames 0042–0043, 0046) shows a table of items with discrepancies. The Discrepancy column shows "-2" for item 121R-C. The message says "There are discrepancies between On-Hand Count and previous on-hand quantities." The word "previous" is ambiguous — it could mean "previous count" or "previously recorded system quantity." This ambiguity could cause confusion about which number is right.
- [H2, Sev 2] The Discrepancy column shows "-2" but does not explain the direction: does "-2" mean the count found 2 fewer than expected, or 2 more? The sign convention is not documented on screen.
- [H1, Sev 2] Success modal "My Stock Count has been sent." (frame 0047) has the same "sent" ambiguity as the Adjustment success modal — it implies transmission but not acceptance or processing.

**Positive patterns:**
- The "Adjustment Confirm" screen is a good design pattern — it surfaces discrepancies explicitly rather than silently creating adjustments, and offers the user a choice (Recount vs Adjustment). This is a genuine safety net.
- Comments field on the count screen allows notes to be attached.
- "Finish My Stock Count" button label is clear and action-oriented.

**Friction signals:**
- All items initialise at 0 with no reference to expected quantities.
- No barcode scan path for count entry.
- Inline cell editing with no visible affordance.

---

### Transfer — frames 0049–0056

**Purpose:** Initiate a stock transfer from the current station to another location (warehouse or truck). User selects a destination, sets transfer quantities per item, and confirms.

**User task:** Select destination → set quantities to transfer → add optional comment → confirm.

**Issues observed:**
- [H4, Sev 2] The Transfer screen combines destination selection (a row-selection table) and item quantity entry (an inline editable table) on a single continuous scroll (frames 0049–0054). Selecting a destination row highlights it in purple (frame 0051, 0052). Editing Transfer QTY in the lower table uses inline cell editing. This is two distinct interaction modes on one scroll — users may not realise they need to scroll down to also set item quantities after selecting a destination.
- [H1, Sev 2] Once a destination is selected (purple row highlight in frame 0051–0052), there is no confirmation of selection state at the top of the screen — the selection is only visible as a highlight within the scrollable list. If the user scrolls down to the items table, the selected destination scrolls off-screen and they have no way to verify which destination they've chosen without scrolling back up.
- [H7, Sev 2] Item transfer quantities also require inline table cell editing — the same non-standard mobile pattern as My Stock Count. No scan path for items. Frame 0054 shows "124R-C" highlighted in purple (selected for editing?) while "Confirm Transfer" is visible — the selection state is ambiguous.
- [H5, Sev 3] Frame 0056 shows an alert modal: "Transfer qty 1 cannot exceed available qty 0 for item 124R-C." This is a post-hoc error — the user was allowed to enter a transfer quantity that exceeded available stock, and was only stopped at the confirmation step. The available quantity was visible (On-Hand QTY: 0) in the table all along. The system could have prevented entry of quantities exceeding AVBL QTY with real-time validation or by disabling the field when stock is 0.
- [H9, Sev 2] The error modal title is "Alert" (frame 0056). The message is fairly actionable ("cannot exceed available qty 0 for item 124R-C") but the "Alert" title is generic. The modal dismisses with "Ok" and returns the user to the form — the affected cell is not re-highlighted to guide correction.
- [H6, Sev 1] The Transfer QTY column in the items table starts at 0 for all items. Users cannot see maximum permissible transfer quantity (AVBL QTY) directly in the same column — they must infer it from the On-Hand and RSVD QTY columns.
- [H8, Sev 1] RSVD QTY is shown in the transfer items table. For the purpose of initiating a transfer, Reserved Quantity is informational only — it cannot be transferred. Its presence may confuse users who see "3" reserved and wonder if they can transfer those units.
- [H3, Sev 1] "Confirm Transfer" button appears at the very bottom of a long scroll (frame 0054). After a user has selected a destination and set quantities, they must scroll past the entire items list to reach the confirm button. On a long list, this button may not be visible, leading users to think the task is incomplete.

**Positive patterns:**
- Destination selection list includes a "Type" column (Truck / Warehouse), helping users distinguish between location types at a glance.
- Purple highlight on selected destination row provides clear selection feedback.
- Alert error (frame 0056) is specific — names the item and the quantity constraint.

**Friction signals:**
- Two-section form requiring scroll to discover both sections.
- Selected destination scrolls off-screen.
- No real-time validation on quantity entry.
- Confirm button buried below long item list.

---

### Receive Transfer — frame 0058

**Purpose:** View and action incoming transfers for the current station.

**User task:** Review open incoming transfers, select one to receive stock.

**Issues observed:**
- [H9, Sev 3] Frame 0058 shows a "Warning" modal appearing immediately on screen load: "No data found for location Church Street Station." This is a "Warning" modal for what is effectively an informational empty state. The modal title "Warning" implies something has gone wrong — an error condition, a system failure. However, the underlying situation (no open transfers for this location) is entirely normal in daily operation. Using "Warning" for an empty state misrepresents the severity of the condition and may cause user anxiety ("Is something broken?").
- [H1, Sev 2] The Warning modal fires before the user has had a chance to see the list — the list header ("Receiving Activity: Open + Last 7 days") with columns Source | Transfer # | Status | Date is visible but the table is empty behind the modal. There is no way to know if this is a data load failure or genuinely empty.
- [H5, Sev 1] The modal blocking the empty-state list is unnecessary. An inline empty state message ("No open transfers for this location") would be less alarming and not require dismissal.

**Positive patterns:**
- The screen does communicate the scope ("Open + Last 7 days") in the header, matching the Adjustment Review pattern.

**Friction signals:**
- "Warning" severity label for a normal empty-state condition.
- Modal fires immediately, requiring unnecessary tap to dismiss before seeing content.

---

### Transfer Review — frame 0059

**Purpose:** Review outgoing transfers from the current station.

**User task:** View status of transfers that have been sent.

**Issues observed:**
- [H9, Sev 3] Identical to Receive Transfer: "Warning" modal fires immediately with "No data found for location Church Street Station." Same severity mislabelling and unnecessary modal-blocking-empty-state pattern.
- [H1, Sev 1] "Transfer Activity: Open + Last 7 days" — same scope label as Receive Transfer but for outgoing transfers. No ability to change the time window.
- [H4, Sev 1] The column headers for Transfer Review are "Destination | Transfer # | Status | Date" (frame 0059) vs Receive Transfer's "Source | Transfer # | Status | Date" (frame 0058). This is consistent and appropriate — destination for outgoing, source for incoming.

**Positive patterns:**
- The symmetric design between Receive Transfer and Transfer Review (same layout, same scope indicator, flipped column label) is appropriate.

**Friction signals:**
- Warning modal for empty state — same as Receive Transfer.

---

### Receiving (Manual) — frames 0061–0069

**Purpose:** Manually record receipt of stock without a pre-existing transfer record. User enters a reference number and records received quantities per item.

**User task:** Enter a PO/reference number, tap cells to enter received quantities, complete receiving.

**Issues observed:**
- [H5, Sev 3] "Reference number is required." validation message is shown in GREEN text immediately on screen load (frames 0061–0069), before the user has touched the Reference Number field. This is the same premature validation / wrong-colour-for-error pattern as in Inventory Adjustment. Green error text is a systemic issue across the entire module.
- [H4, Sev 3] Inline table-cell editing for entering received quantities (frames 0063–0067). Tapping a cell in the "Received QTY" column opens it for editing directly within the table row. Mobile table cell editing is not a standard iOS interaction pattern. Standard iOS patterns for form data entry use dedicated form fields, steppers, or modal pickers. In-cell editing is ambiguous in affordance (no hint that cells are tappable), prone to accidental activation, and difficult to use with gloved hands where precise tapping is unreliable.
- [H6, Sev 2] Frame 0063 shows "Tap on the Received QTY column to update receiving quantity." — there IS an instruction, but it appears as body text between the reference field and the table header. In a busy UI with a validation error, a reference field, and a table all competing for attention, this instruction may be missed. It is not visually connected to the column it describes (no callout, no arrow, no persistent reminder).
- [H5, Sev 2] In frame 0063, the keyboard shows "s0" in the cell (appears to be a text keyboard default overriding a numeric entry). This suggests the cell does not enforce numeric-only input — consistent with the Adjust Item keyboard issue. Gloved technicians may accidentally type text characters into a quantity field.
- [H1, Sev 2] "Total Received QTY: 0" shows in orange/amber when 0 (frames 0061–0063) and changes to a different colour (appears to change to orange/amber vs green) as quantities are entered (frames 0064–0069 show "10" and "20"). The colour-coding of the total may have meaning, but it is not explained. If orange means "incomplete/pending" and green means "valid", that convention is not documented.
- [H7, Sev 2] No barcode scan path for the reference number field. A PO/reference number typically appears as a barcode on delivery documentation. Forcing manual keyboard entry of alphanumeric reference codes is slow and error-prone in field conditions.
- [H5, Sev 1] "Complete Receiving" button is enabled even when the Reference Number field is empty (frames 0061–0065). The validation error message is shown, but the primary action button is not disabled. A user could submit receiving with no reference number if they ignore (or misread as success) the green validation message.
- [H2, Sev 1] The screen is titled "Receiving" — which is distinct from "Receive Transfer" in the menu. The difference (manual receiving vs transfer-based receiving) is not explained on the screen itself. First-time users may be confused about when to use this vs Receive Transfer.
- [H8, Sev 1] The "On-Hand QTY" column is shown in the receiving table alongside "Received QTY" and "Total QTY". On-Hand is read-only context. "Total QTY" = On-Hand + Received. Having three columns where one is derived (Total = On-Hand + Received) is slightly redundant but useful for verification.

**Positive patterns:**
- The running "Total Received QTY" counter at the top of the table is a useful live feedback mechanism — technicians can verify they've entered the right total before submitting.
- The instruction "Tap on the Received QTY column to update receiving quantity" is present, even if it could be better placed.
- On-Hand column in the table provides real-world context — user can see current stock levels while entering received quantities.

**Friction signals:**
- Green error text (systemic) — most impactful recurring issue.
- In-cell table editing without affordance cues — non-standard, inaccessible with gloves.
- Reference number field not enforced (button active despite required field empty).
- Quantity cells accepting alphabetic input.

---

### Navigation Menu (Extended) — frames 0057, 0060

**Purpose:** Scrolled view of the side drawer, revealing additional items including "Receiving" and "GENERAL" section.

**User task:** Navigate to Receiving or other lower-menu items.

**Issues observed:**
- [H4, Sev 2] The "GENERAL" section header appears below the inventory items when the menu is scrolled. The inventory items (which appear at the top of the drawer in frames 0001–0002) have no corresponding section header. They are implicitly grouped but unlabelled. The inconsistency (GENERAL labelled, inventory unlabelled) reinforces the lack of visual organisation at the top of the drawer.
- [H8, Sev 1] "Receiving" appears as an 11th inventory menu item (frame 0057, 0060) at the bottom of the inventory group. With Receive Transfer already in the list, having Receiving as a separate item increases menu length and cognitive load. Their functional distinction is not clear from the label alone.

**Friction signals:**
- Inventory section is unlabelled while a GENERAL section label is visible below — inconsistent navigation structure.

---

## Summary: All Issues by Heuristic

### H1 — Visibility of System Status
| Screen | Issue | Severity |
|--------|-------|---------|
| Location Assignment | "Confirm Assignment" disabled with no explanation of prerequisites | 3 |
| Inventory Adjustment | "Save" button only appears after item is added — dynamic appearance | 1 |
| Inventory Adjustment | Success modal says "Adjustment has been sent" — ambiguous whether processed | 2 |
| Inventory Lookup | Negative AVBL QTY (-3) shown with no visual differentiation from normal values | 4 |
| Adjustment Review | Large blank area in detail view — no content or "no image" label | 2 |
| Adjustment Review | "Last 7 days" scope with no ability to change date window | 1 |
| Transfer | Selected destination scrolls off-screen with no persistent indicator | 2 |
| Receive Transfer | Empty-state modal fires immediately; unclear if data failed to load | 2 |
| My Stock Count | No progress indicator for how many items remain to count | 2 |
| My Stock Count | Success modal: "My Stock Count has been sent" — same ambiguity | 2 |
| Receiving | Total Received QTY colour changes meaning unexplained | 2 |

### H2 — Match Between System and Real World
| Screen | Issue | Severity |
|--------|-------|---------|
| Location Assignment | "Scan VIN or QR Code" — VIN is automotive vocabulary, not inventory vocabulary | 3 |
| Inventory Lookup | "RSVD QTY" abbreviation not defined on screen | 3 |
| Inventory Lookup | "AVBL QTY" abbreviation not defined; formula (On-Hand minus RSVD) unexplained | 2 |
| Adjustment (Reason picker) | "Rotate" reason code opaque without domain knowledge | 1 |
| Adjustment Confirm (Stock Count) | "Previous on-hand quantities" — "previous" is ambiguous (prior count vs system record) | 2 |
| My Inventory | No AVBL QTY column — users must compute On-Hand minus RSVD mentally | 1 |
| Receiving | "Receiving" vs "Receive Transfer" — functional distinction not communicated | 1 |

### H3 — User Control and Freedom
| Screen | Issue | Severity |
|--------|-------|---------|
| Inventory Adjustment | No delete/remove for rows added to adjustment table | 2 |
| My Stock Count | Unclear whether navigating back saves or discards the in-progress count | 2 |
| Transfer | "Confirm Transfer" button buried below long scroll | 1 |

### H4 — Consistency and Standards
| Screen | Issue | Severity |
|--------|-------|---------|
| Inventory Adjustment | Non-standard form architecture: dropdown + FAB + inline table + free text field | 2 |
| Inventory Adjustment | Floating action button (FAB) is unlabelled — non-standard for a primary form action | 2 |
| My Stock Count | Inline table-cell editing with no visible affordance — non-standard iOS pattern | 1 |
| Transfer | Two interaction modes (row selection + inline edit) on one scroll — non-standard | 2 |
| Receiving | Inline table-cell editing — non-standard iOS pattern | 3 |
| Adjust Item | Full QWERTY keyboard on numeric-only ADJ QTY field | 1 |
| Navigation Menu | Inventory section has no section header; GENERAL section below does | 2 |
| Adjustment Review | Detail view title remains "Adjustment Review" not specific ADJ# | 1 |

### H5 — Error Prevention
| Screen | Issue | Severity |
|--------|-------|---------|
| Inventory Adjustment | "Reason is required." shown before user touches the field (premature validation) | 3 |
| Receiving | "Reference number is required." shown before user touches the field | 3 |
| Receiving | "Complete Receiving" button enabled despite required field being empty | 3 |
| Transfer | No real-time quantity validation — error only triggered at confirmation step | 3 |
| Adjust Item | Full QWERTY keyboard allows accidental letter entry in quantity field | 2 |
| Receiving | Quantity cells accept alphabetic input (numeric input not enforced) | 2 |
| Location Assignment | "Or Select a Location" framing implies steps are alternatives, may be both required | 2 |

### H6 — Recognition Over Recall
| Screen | Issue | Severity |
|--------|-------|---------|
| Inventory Adjustment | Unlabelled FAB (+) — function not recognisable without tapping | 2 |
| Inventory Adjustment | "AVBL QTY" column header abbreviated without legend | 2 |
| Adjust Item | No current stock quantity visible on sub-screen; user must remember from parent | 1 |
| My Inventory | Redundant Item + Description columns for most SKUs — wastes recognition bandwidth | 3 |
| My Inventory | No AVBL QTY column — requires mental computation | 1 |
| Inventory Lookup | No total summary row — users must mentally sum across locations | 1 |
| My Stock Count | No expected/reference quantities shown — users count without reference | 2 |

### H7 — Flexibility and Efficiency of Use
| Screen | Issue | Severity |
|--------|-------|---------|
| Adjust Item | No barcode scan for item selection — dropdown-only for SKU lookup | 3 |
| Inventory Lookup | No barcode scan for item selection | 2 |
| My Inventory | No search, filter, or sort on long item list | 3 |
| My Stock Count | No barcode scan-to-enter for count workflow | 3 |
| Transfer | No barcode scan for item identification | 2 |
| Receiving | No barcode scan for reference number or item identification | 2 |
| Navigation Menu | No icons on menu items — users must read every label to navigate | 1 |

### H8 — Aesthetic and Minimalist Design
| Screen | Issue | Severity |
|--------|-------|---------|
| My Inventory | Item + Description columns redundant for battery SKU items | 3 |
| Adjustment Review | Large blank placeholder area in detail view wastes ~25% of screen | 2 |
| Transfer | RSVD QTY column in transfer items table — not actionable, potentially confusing | 1 |
| Receiving | Three columns (On-Hand, Received, Total) where Total is derived | 1 |
| Navigation Menu | "Receive Transfer" and "Receiving" as separate items with near-identical names | 1 |

### H9 — Help Users Recognize, Diagnose, and Recover from Errors
| Screen | Issue | Severity |
|--------|-------|---------|
| Location Assignment | "Confirm Assignment" disabled with no error message or prerequisite explanation | 3 |
| Inventory Adjustment | "Reason is required." shown in GREEN — semantic inversion of error/success colour | 3 |
| Receiving | "Reference number is required." shown in GREEN — same semantic inversion | 3 |
| Inventory Lookup | Negative AVBL QTY shown without visual alert — data integrity issue invisible | 4 |
| Receive Transfer | "Warning" modal for empty state — severity mislabelled | 3 |
| Transfer Review | "Warning" modal for empty state — severity mislabelled | 3 |
| Transfer | Error on confirmation only; no guidance on which cell to fix after dismissing modal | 2 |
| My Stock Count | "Adjustment Confirm" — "-2" discrepancy sign convention not documented | 2 |
| Adjustment Review | Success: "Adjustment has been sent" — "sent" ambiguous (queued? submitted? confirmed?) | 2 |

### H10 — Help and Documentation
| Screen | Issue | Severity |
|--------|-------|---------|
| Location Assignment | No explanation of why "Confirm Assignment" is disabled | 3 |
| Adjustment (Reason picker) | No help text defining what each reason code means | 2 |
| Receiving | "Tap on the Received QTY column" instruction present but easily missed | 1 |
| My Inventory | No explanation of Item vs Description column distinction | 1 |
| Inventory Lookup | No tooltip or legend for RSVD / AVBL QTY abbreviations | 2 |
| My Stock Count | No explanation of why system quantities are not shown for reference | 1 |

---

## Top 15 Prioritised Issues

| # | Screen | Issue | Heuristic | Severity |
|---|--------|-------|-----------|---------|
| 1 | Inventory Lookup | Negative AVBL QTY (-3) displayed without any visual warning, colour change, or alert — data integrity failure invisible to user | H1, H9 | 4 |
| 2 | Location Assignment | "Confirm Assignment" button disabled with zero explanation of prerequisites — user is in a dead end with no recovery path | H1, H9, H10 | 3 |
| 3 | Inventory Adjustment, Receiving | Green text used for inline validation errors — semantic inversion of error/success colour, systemic across the module | H9, H5 | 3 |
| 4 | Receiving | Premature validation errors shown before user touches any field (Reference Number field) | H5 | 3 |
| 5 | Receiving | "Complete Receiving" button is enabled despite required Reference Number field being empty | H5 | 3 |
| 6 | Transfer | Quantity validation deferred to confirmation step — user can enter impossible quantities without real-time feedback | H5 | 3 |
| 7 | Location Assignment | "Scan VIN or QR Code" — VIN terminology is wrong context for inventory scanning; creates domain vocabulary confusion | H2 | 3 |
| 8 | My Inventory | No search/filter on long item list — technician must scroll entire catalogue to find a SKU | H7 | 3 |
| 9 | My Stock Count | No barcode scan path for stock count entry — manual cell editing on a long list is slow and error-prone in field conditions | H7 | 3 |
| 10 | My Inventory | Redundant Item + Description columns — both show same battery code for most SKUs, halving usable table width | H8, H6 | 3 |
| 11 | Receive Transfer, Transfer Review | "Warning" modal fires on load for a normal empty state — severity mislabelling creates false alarm | H9 | 3 |
| 12 | Receiving | Inline table-cell editing for Received QTY — non-standard iOS pattern, no affordance visible, unusable with gloved hands | H4 | 3 |
| 13 | Inventory Adjustment | Unlabelled FAB (+) for adding items — function is opaque; primary path to core task is hidden | H6, H4 | 2 |
| 14 | Adjustment Review | Large blank image placeholder area in detail view — dead screen real estate with no explanation | H8, H1 | 2 |
| 15 | Inventory Adjustment | No mechanism to delete/remove an item row once added to the adjustment table | H3 | 2 |

---

## Systemic Patterns (Cross-Screen)

The following issues appear on multiple screens and indicate shared code or a shared design decision that needs to be addressed at the component/pattern level, not screen-by-screen:

1. **Green = error (systemic):** Green validation error text appears on Inventory Adjustment (Reason field) and Receiving (Reference Number field). This is the same colour pattern reported in the main app audit. The error text colour is defined at the component level. Fix at the source, not per-screen.

2. **No barcode scan for item lookup (systemic):** Adjust Item, Inventory Lookup, Transfer, My Stock Count, and Receiving all require dropdown or scroll-based item selection with no scan alternative. A dedicated scan-to-select component would improve all these flows.

3. **Inline table-cell editing (systemic):** My Stock Count, Transfer, and Receiving all use inline table-cell editing for quantity entry. This non-standard pattern creates inconsistent affordance and accessibility challenges. A standard pattern (stepper, inline +/- buttons, or a focused input row) should be applied consistently.

4. **"Warning" for empty state (systemic):** Receive Transfer and Transfer Review both display a Warning modal when the list is empty. If this is generated by a shared "no results" handler, the modal title and severity should be changed to "No results" or an inline empty-state component at the framework level.

5. **Abbreviations without definition (systemic):** AVBL QTY, RSVD QTY, ADJ QTY appear across Adjustment, Lookup, My Inventory, Transfer, and Receiving without ever being spelled out or defined. A persistent legend, first-use tooltip, or full label (collapsible to abbreviation on mobile) should be adopted as a module-wide standard.

6. **Premature validation (systemic):** Validation error messages appear on screen load before user interaction on both Adjustment (Reason) and Receiving (Reference Number). This is likely a shared form initialisation behaviour. Validation should be triggered on blur (field loses focus) or on first submit attempt, not on mount.
