// ============================================================
// findings-data.js — PROJECT-SPECIFIC DATA
// To reuse this plugin for a new project, replace this file
// only. template.js and build.js do not need to change.
// ============================================================

module.exports = {
  // The plugin will find this page by name and abort if not found.
  targetPage: "Audit Test",

  // ── Context cards (Row 1) ──────────────────────────────────
  contextCards: [
    {
      title: "Engagement Overview",
      body: [
        "Client: Club Assist US/Canada",
        "Agency: Goji Labs",
        "Product: Toolbox — mobile app for field battery service technicians",
        "Scale: 1.6M invoices/year across US & Canada",
        "",
        "3 modules: Battery Fitment Guide (core) · E-Invoicing (most-used add-on) · Inventory/Stock Assist (limited)",
        "",
        "Goal: UI/UX modernisation + brand alignment. Core functionality is solid."
      ].join("\n"),
      color: { r: 0.87, g: 0.92, b: 0.98 } // light blue
    },
    {
      title: "Users & Demographics",
      body: [
        "Primary: Field technicians — ages 20s to near-retirement",
        "Non-technical users; many use increased system font size",
        "Work outdoors: bright sun, gloved hands, vibrating environment",
        "MDM-locked devices (club-managed)",
        "15–25 min avg on scene (north star: reduce)",
        "",
        "Secondary: Club/Station Admins",
        "",
        "Languages: English · Spanish · French Canadian",
        "",
        "\"Users want dark mode!\"",
        "\"Toolbox users are non-technical — UX needs to be very intuitive\"",
        "\"Workflow isn't the issue — it's more of the UX\""
      ].join("\n"),
      color: { r: 0.87, g: 0.92, b: 0.98 }
    },
    {
      title: "User Goals — Primary (Technicians)",
      body: [
        "1. Streamlined battery identification — minimal friction + input",
        "2. Contextual reference access — TSBs/install guides without disrupting workflow",
        "3. Fast, low-friction invoicing — no complex forms",
        "4. Centralized view — everything for each step in one place",
        "5. Clarity & confidence — know what's happening next",
        "6. State disambiguation — member/non-member, tax, stock status",
        "7. Resource efficiency — contextual support, not overwhelming library"
      ].join("\n"),
      color: { r: 0.96, g: 0.94, b: 0.80 } // yellow
    },
    {
      title: "Desired Outcomes",
      body: [
        "▸ Reduce time on scene (north star)",
        "▸ Faster roadside job completion",
        "▸ Fewer fitment and invoicing mistakes",
        "▸ More consistent technician performance",
        "▸ Better customer experience",
        "▸ Increase Club Assist brand visibility in-app",
        "▸ Visibility in bright daylight is a priority",
        "▸ Tighter alignment: training ↔ products ↔ field execution",
        "▸ Streamline technician feedback process",
        "▸ Investigate sync process",
        "▸ Must support: English · Spanish · French Canadian"
      ].join("\n"),
      color: { r: 0.85, g: 0.95, b: 0.85 } // light green
    }
  ],

  // ── Board screenshots (Row 2) ──────────────────────────────
  // path is relative to the project root (one level up from figjam-plugin/)
  boardScreenshots: [
    { key: "ss-01", label: "General Download",       path: "screenshots/01-general-download.png" },
    { key: "ss-02", label: "User Goals",              path: "screenshots/02-user-goals.png" },
    { key: "ss-03", label: "Challenges & Questions",  path: "screenshots/03-challenges-questions.png" },
    { key: "ss-04", label: "Desired Outcome",         path: "screenshots/04-desired-outcome.png" },
    { key: "ss-05", label: "Customer Journey",        path: "screenshots/05-customer-journey.png" },
    { key: "ss-06", label: "App Screens",             path: "screenshots/06-app-screens.png" },
    { key: "ss-07", label: "User Journeys Canvas",    path: "screenshots/07-user-journeys-canvas.png" }
  ],

  // ── Pain point sections (Row 3) ───────────────────────────
  // severity: 4=Critical, 3=High, 2=Medium, 1=Low
  painPointSections: [
    {
      title: "Navigation & Information Architecture",
      screenshots: ["af-02", "af-09"],
      stickies: [
        { text: "Two competing nav systems (hamburger + tab bar) with no clear hierarchy or signal", severity: 3 },
        { text: "No breadcrumb, progress indicator, or job context anywhere in the app", severity: 3 },
        { text: "Documents scattered across sections — difficult to browse or find resources", severity: 3 },
        { text: "Side drawer opens without scrim — Battery Search partially visible behind it", severity: 1 },
        { text: "No active-screen indicator or highlight in hamburger menu", severity: 1 },
        { text: "\"SAFETY\" section in drawer appears with no items visible — empty or clipped", severity: 2 }
      ]
    },
    {
      title: "Battery Search & Vehicle Selection",
      screenshots: ["af-02", "af-03", "af-04"],
      stickies: [
        { text: "Drum picker with no search or type-ahead (~35+ makes) — over-scroll observed every use", severity: 3 },
        { text: "Single-option engine pickers still force full drum picker interaction — should auto-populate", severity: 2 },
        { text: "\"Display Results\" disabled state uses opacity only — near-invisible, fails in sunlight", severity: 2 },
        { text: "No \"Clear / New Search\" — prior vehicle persists between jobs, risking carry-over errors", severity: 2 },
        { text: "VIN scanner launches to blank dark screen — no viewfinder, reticle, or instructions", severity: 3 },
        { text: "\"Flashlight\" label has no button affordance (no border, background, or icon)", severity: 2 },
        { text: "Confirm FAB (cyan circular checkmark) on all pickers: unlabelled, non-standard, unexplained", severity: 2 },
        { text: "Decorative barcode graphic occupies ~15% screen height — non-functional, misleading", severity: 1 },
        { text: "No dispatch or job context on Battery Search — member, vehicle plate, job ID all absent", severity: 3 }
      ]
    },
    {
      title: "Battery Results & Unavailability",
      screenshots: ["af-05", "af-06"],
      stickies: [
        { text: "\"Unavailable\" row styled identically to successful result — failure state looks like success", severity: 4 },
        { text: "No path forward from unavailability — no modify search, no dispatch link, no substitute. Full restart required.", severity: 4 },
        { text: "\"Unavailable Battery Reasons\" is a dead-end web view with no corrective CTA", severity: 3 },
        { text: "3 consecutive unavailable results in recording with zero escalation path offered", severity: 3 },
        { text: "Available vs unavailable result rows differ only in text content — no colour or icon signal", severity: 3 },
        { text: "OE spec notation (154R/Q85) unexplained — confusing to newer technicians", severity: 1 }
      ]
    },
    {
      title: "Installation Precautions & TSBs",
      screenshots: ["af-06", "af-11"],
      stickies: [
        { text: "\"Install Info\" inactive when \"Difficult Installation\" flag is active — most-needed resource absent at peak need", severity: 4 },
        { text: "\"Difficult Installation\" same visual weight as \"AGM Required\" — safety-critical warning not distinguished", severity: 3 },
        { text: "TSBs buried in Media Library — not linked to vehicles, not surfaced contextually", severity: 3 },
        { text: "Technicians lose access to install docs after invoice completion — need them during actual installation", severity: 3 },
        { text: "If a TSB exists for the customer's model, it should be highlighted prominently (FigJam workshop finding)", severity: 3 },
        { text: "Inactive Training Material buttons show no explanation — permanently unavailable or missing content?", severity: 2 }
      ]
    },
    {
      title: "E-Invoicing Flow",
      screenshots: ["af-08", "af-12", "af-13"],
      stickies: [
        { text: "Two sequential modal interruptions on every Estimate entry: \"Add Core Fee?\" → \"Please enter VIN\"", severity: 4 },
        { text: "\"Add Core Fee?\" — no explanation of purpose, cost, or typical answer. Equal-weight No | Yes buttons.", severity: 3 },
        { text: "Core Fee dialog fires again on re-entry — no session memory of prior answer (99.9% say No)", severity: 3 },
        { text: "Green used for all required-field validation throughout — wrong semantic colour; errors overlooked", severity: 3 },
        { text: "Pre-emptive validation errors appear on screen load before any user interaction", severity: 3 },
        { text: "No persistent Member/Non-Member tier indicator on the Estimate form", severity: 3 },
        { text: "Duplicate VIN entry: inline field on form + modal — canonical path unclear, both appear simultaneously", severity: 2 },
        { text: "\"Next\" disabled with no summary of blocking fields; VIN (a blocker) can be above the scroll fold", severity: 2 },
        { text: "Floating blue checkmark FAB on Estimate screen conflicts with the \"Next\" button", severity: 2 },
        { text: "\"No tax rate specified\" — persistent dead-end warning on Battery Details, Warranty Calculator, and Estimate with no action affordance", severity: 3 }
      ]
    },
    {
      title: "Warranty Calculator",
      screenshots: ["af-14", "af-15"],
      stickies: [
        { text: "Previous session date and battery SKU silently retained — stale input causes incorrect results", severity: 2 },
        { text: "\"Start Estimate: Warranty Sale\" shown even on expired warranty with $0.00 discount — misleading label", severity: 2 },
        { text: "\"Months Used: 84\" — no reference to warranty duration (e.g., \"84 of 36 months — expired\")", severity: 2 },
        { text: "Date picker result remains visible alongside active picker — ambiguous dual-state screen", severity: 2 },
        { text: "Date picker defaults to 2019 (7 years stale) — requires scroll through all columns", severity: 1 },
        { text: "\"A battery must be selected to continue\" shown in green on screen load before interaction", severity: 2 }
      ]
    },
    {
      title: "Media Library & Reference Docs",
      screenshots: ["af-16", "af-17", "af-18"],
      stickies: [
        { text: "Search fires full network request + full-content-replace overlay on every keystroke", severity: 3 },
        { text: "Zero-results state is completely blank — no message, no indication search ran", severity: 3 },
        { text: "All document titles truncated with ellipsis — full title not visible without tapping", severity: 2 },
        { text: "No filter by document type — videos and TSBs interleaved with no sort controls", severity: 2 },
        { text: "Section headers barely differentiated from document title items — same visual weight", severity: 2 },
        { text: "TSB reference codes (\"07-213-22r\") opaque to newer technicians — no plain-language summary", severity: 2 },
        { text: "No per-item metadata: no date, no vehicle applicability, no file size", severity: 2 }
      ]
    },
    {
      title: "Visual & Technical Issues",
      screenshots: ["af-01", "af-10", "af-03"],
      stickies: [
        { text: "Keyboard covers Password field on login — no layout reflow, CTA buttons hidden", severity: 2 },
        { text: "Ghost white rectangle rendering bug on Battery Search transition from login spinner", severity: 2 },
        { text: "Notification permission dialog fires on cold launch before any app value shown", severity: 3 },
        { text: "Tab bar labels \"Warranty Calculator\" and \"Prior to 1990\" wrap to 2 lines at default font size", severity: 2 },
        { text: "Font scaling not accommodated — worse with iOS accessibility sizes", severity: 2 },
        { text: "Version number \"2025.12.1 (365)\" exposed as plain text on login screen", severity: 1 },
        { text: "Offline = hard block: no draft/queue mode for poor roadside coverage areas", severity: 3 }
      ]
    },
    {
      title: "Brand & Web Views",
      screenshots: ["af-19", "af-20", "af-21"],
      stickies: [
        { text: "Battery Benefits + Climate Map open as white-background web views inside dark navy app — jarring visual discontinuity", severity: 2 },
        { text: "Climate Map loads via api.clubassist.com — API subdomain exposed in browser URL bar", severity: 2 },
        { text: "Climate Map: blank → grey → content 3-frame load on presumably good connectivity", severity: 2 },
        { text: "Club Assist brand only present on login screen — no presence in primary workflow screens", severity: 2 },
        { text: "Battery Benefits competitive pricing table is a strong sales tool — needs native-quality presentation not a web view", severity: 2 }
      ]
    },

    // ── Inventory Management Module ──────────────────────────
    { title: "INVENTORY MANAGEMENT MODULE", moduleDivider: true, stickies: [] },
    {
      title: "Inventory: Navigation & Wayfinding",
      screenshots: ["inv-nav", "inv-assign"],
      stickies: [
        { text: "No section header for the 11 inventory items in side-drawer — visually indistinguishable from GENERAL nav items below (INV-04)", severity: 2 },
        { text: "\"Confirm Assignment\" button disabled with zero explanation of prerequisites — dead end with no diagnostic or recovery path (INV-05)", severity: 3 },
        { text: "Unlabelled FAB (+) is the only way to add rows in Adjustment — no affordance, hidden primary action (INV-16)", severity: 2 },
        { text: "AVBL / RSVD / ADJ abbreviations appear across 6 screens but are never defined anywhere in the module (INV-15)", severity: 2 },
        { text: "\"Scan VIN or QR Code\" label on Location Assignment is wrong context — VIN is vehicle terminology, not inventory (INV-24)", severity: 3 }
      ]
    },
    {
      title: "Inventory: Error Colours & Validation",
      screenshots: ["inv-adj-valid", "inv-receiving"],
      stickies: [
        { text: "Negative AVBL QTY (\u20133) displayed without any visual alert — data integrity issue invisible to technician making stocking decisions (INV-01)", severity: 4 },
        { text: "Green text used for all error messages throughout module — semantic inversion; technicians read errors as success states (INV-02)", severity: 3 },
        { text: "Validation errors shown on form load before any user interaction — \"Reason is required.\" fires on blank Adjustment screen (INV-03)", severity: 3 },
        { text: "\"Complete Receiving\" button active with empty required Reference Number — allows broken record submission past a green warning (INV-06)", severity: 3 },
        { text: "Transfer quantity validation deferred to Confirm step — over-qty entry only caught after user commits (INV-07)", severity: 3 },
        { text: "\"Warning\" modal fires on load for routine empty states (no pending transfers) — severity mislabel creates false alarm (INV-09)", severity: 3 }
      ]
    },
    {
      title: "Inventory: Quantity Entry & Table Display",
      screenshots: ["inv-adj", "inv-myinv"],
      stickies: [
        { text: "No row deletion on Adjustment table — user must submit unwanted rows or abandon and restart (INV-10)", severity: 2 },
        { text: "Full QWERTY keyboard on quantity fields — numeric pad required for gloved-hand field use (INV-11)", severity: 2 },
        { text: "Inline table-cell editing for qty entry — non-standard iOS pattern, no visible affordance, inaccessible with gloves (INV-12)", severity: 3 },
        { text: "Redundant Item + Description columns in My Inventory both display the same code — halves usable table width on small screen (INV-14)", severity: 3 },
        { text: "My Stock Count shows no reference/expected quantities — technician must hold correct count in memory during physical cycle count (INV-20)", severity: 2 }
      ]
    },
    {
      title: "Inventory: Scan & Item Selection",
      screenshots: ["inv-lookup", "inv-stockcount"],
      stickies: [
        { text: "No barcode scan path for item selection across 5 screens (Adjustment, Lookup, Stock Count, Transfer, Receiving) — every SKU requires dropdown scroll (INV-08)", severity: 3 },
        { text: "\"RSVD QTY\" appears in My Inventory table header but is never defined or explained anywhere in the module (INV-17)", severity: 3 },
        { text: "No scan path for stock count entry — every physical count requires keyboard interaction rather than scan-to-confirm (INV-18)", severity: 3 },
        { text: "My Inventory has no search, filter, or sort — catalogues of 20+ SKUs require full-list scroll to locate a specific item (INV-19)", severity: 3 }
      ]
    },
    {
      title: "Inventory: Transfer, Receiving & Flow",
      screenshots: ["inv-transfer", "inv-recv-warn"],
      stickies: [
        { text: "Ambiguous back-navigation during active stock count — no confirmation before discarding count progress (INV-21)", severity: 2 },
        { text: "Transfer Review visible only to sender — recipient sees no \"pending\" view before the transfer arrives (INV-22)", severity: 2 },
        { text: "Inventory Adjustment shows large blank placeholder image when no item image available — wastes ~20% of screen height (INV-13)", severity: 1 },
        { text: "Negative AVBL QTY root cause never surfaced — system silently accepts a state where more stock is committed than exists (INV-25)", severity: 2 }
      ]
    }
  ],

  // ── Positive patterns (Row 4, left column) ────────────────
  positivePatterns: [
    "Pricing surfaced directly in search results row — Member and Non-Member without tapping through",
    "Battery Details as central hub — full spec + pricing + estimate entry on one screen",
    "Form state preserved on back-navigation — dropdowns retain values after returning from results",
    "Cascading field reset on Make change — prevents stale Make/Model/Engine mismatches",
    "\"Scan VIN\" correctly prioritized as primary CTA — largest element, fastest path",
    "Auto-populated Estimate fields: battery line item, provider details, service timestamp",
    "Dispatch integration (MVC1000 sync) significantly reduces on-scene time and data entry",
    "Bottom nav = workflow, drawer = support/settings — architecturally correct distinction",
    "Selective availability of Training Material buttons (active vs. inactive) — right concept",
    "Warranty Calculator co-located with Battery Details estimate entry — appropriate for warranty claims",
    "\"Months Used\" figure in Warranty result — right data to surface; needs framing (of N months)",
    // Inventory module positive patterns
    "Inventory: Location confirmation shown on-screen before assignment proceeds — prevents mislabelling",
    "Inventory: Available QTY co-located with On-Hand and Reserved on Lookup screen — right data density",
    "Inventory: Reason picker constrains free-text input — prevents unstructured reason data entry",
    "Inventory: Adjustment Review summary shown before final submission — confirmation step is correct",
    "Inventory: Discrepancy dialog surfaces recount vs. adjustment choice — system catches count mismatch",
    "Inventory: Transfer destination uses known location list — no free-text location entry",
    "Inventory: Receiving screen shows reference number prominently — anchors task to source document",
    "Inventory: On-Hand QTY visible inline on My Inventory without drilling — right level of detail",
    "Inventory: QR scan offered as primary option on Location Assignment — scan-first intent is correct",
    "Inventory: Side-drawer consolidates all 11 module screens — keeps main nav uncluttered",
    "Inventory: Adjustment history accessible via Adjustment Review — supports auditability"
  ],

  // ── UX Audit Framework (Row 4, right column) ──────────────
  framework: {
    heuristics: [
      "1. Visibility of system status — sync status, job context, current screen always visible",
      "2. Match real-world workflow — no scroll for primary actions; linear job flow",
      "3. User control & error recovery — no dead-ends; clear escape paths from every state",
      "4. Consistency & standards — one colour coding per state; one nav system; one confirm pattern",
      "5. Error prevention — no stale vehicle pre-fill without warning; correct CCA inputs",
      "6. Recognition over recall — TSBs + docs surfaced contextually; job context always visible",
      "7. Flexibility & efficiency — MBC1000 sync fast path; manual fallback always available",
      "8. Aesthetic & minimalist design — only critical info visible; specs progressive-disclosed",
      "9. Accessibility — font scaling supported; contrast for direct sunlight; glove-friendly targets",
      "10. Help & documentation — contextual (TSBs on battery result, install guide on difficult flag)"
    ],
    severityScale: [
      "4 — Critical: blocks task, causes errors, safety/compliance risk",
      "3 — Major: significant time cost; no obvious workaround; affects many users",
      "2 — Moderate: repeated friction; workaround exists but adds time",
      "1 — Minor: low frequency; easy workaround",
      "0 — Not a problem: cosmetic or preference only"
    ]
  },

  // ── Selected app recording frames (Row 5) ─────────────────
  appFrames: [
    { key: "af-01", label: "Login — notification interrupt anti-pattern", path: "screenshots/app-recording-sm/frame_0001.png" },
    { key: "af-02", label: "Battery Search — ghost rectangle bug + decorative barcode", path: "screenshots/app-recording-sm/frame_0014.png" },
    { key: "af-03", label: "VIN Scanner — blank screen, no guidance", path: "screenshots/app-recording-sm/frame_0019.png" },
    { key: "af-04", label: "Make Picker — no search, ~35 items, drum picker", path: "screenshots/app-recording-sm/frame_0022.png" },
    { key: "af-05", label: "\"Unavailable\" result — styled identically to success", path: "screenshots/app-recording-sm/frame_0036.png" },
    { key: "af-06", label: "First successful result — Install Info inactive on Difficult Install", path: "screenshots/app-recording-sm/frame_0050.png" },
    { key: "af-07", label: "Battery Details — most complete screen in the app", path: "screenshots/app-recording-sm/frame_0058.png" },
    { key: "af-08", label: "Estimate — Core Fee dialog, green validation errors", path: "screenshots/app-recording-sm/frame_0065.png" },
    { key: "af-09", label: "Nav drawer — no scrim, empty SAFETY section",         path: "screenshots/app-recording-sm/frame_0017.png" },
    { key: "af-10", label: "Login — keyboard covers password field",               path: "screenshots/app-recording-sm/frame_0003.png" },
    { key: "af-11", label: "Battery Results — Install Info inactive on Difficult Install", path: "screenshots/app-recording-sm/frame_0051.png" },
    { key: "af-12", label: "Estimate — VIN entry modal",                           path: "screenshots/app-recording-sm/frame_0066.png" },
    { key: "af-13", label: "Estimate — full form (green errors, disabled Next)",   path: "screenshots/app-recording-sm/frame_0086.png" },
    { key: "af-14", label: "Warranty Calculator — date picker",                    path: "screenshots/app-recording-sm/frame_0060.png" },
    { key: "af-15", label: "Warranty Calculator — expired result",                 path: "screenshots/app-recording-sm/frame_0064.png" },
    { key: "af-16", label: "Media Library — loading state",                        path: "screenshots/app-recording-sm/frame_0076.png" },
    { key: "af-17", label: "Media Library — document list (truncated titles)",     path: "screenshots/app-recording-sm/frame_0077.png" },
    { key: "af-18", label: "Media Library — zero-results blank screen",            path: "screenshots/app-recording-sm/frame_0079.png" },
    { key: "af-19", label: "Battery Benefits — white web view in dark app",        path: "screenshots/app-recording-sm/frame_0052.png" },
    { key: "af-20", label: "Climate Map — blank loading state",                    path: "screenshots/app-recording-sm/frame_0055.png" },
    { key: "af-21", label: "Climate Map — grey intermediate (API URL visible)",    path: "screenshots/app-recording-sm/frame_0056.png" }
  ],

  // ── Inventory module key frames (Row 5) ───────────────────
  inventoryFrames: [
    { key: "inv-nav",       label: "Side-drawer — no inventory section header (GENERAL visible)", path: "screenshots/inventory/frame_0057.png" },
    { key: "inv-assign",    label: "Location Assignment — \"Scan VIN or QR Code\" + disabled Confirm", path: "screenshots/inventory/frame_0003.png" },
    { key: "inv-adj-valid", label: "Inventory Adjustment — green \"Reason is required.\" on load",  path: "screenshots/inventory/frame_0007.png" },
    { key: "inv-adj",       label: "Inventory Adjustment — unlabelled FAB + inline table",          path: "screenshots/inventory/frame_0017.png" },
    { key: "inv-lookup",    label: "Inventory Lookup — negative AVBL QTY (\u20133), no visual alert", path: "screenshots/inventory/frame_0030.png" },
    { key: "inv-myinv",     label: "My Inventory — redundant columns, no search or filter",        path: "screenshots/inventory/frame_0037.png" },
    { key: "inv-stockcount",label: "My Stock Count — no reference qty, inline cell editing",       path: "screenshots/inventory/frame_0040.png" },
    { key: "inv-transfer",  label: "Transfer — destination + items, inline Transfer QTY",          path: "screenshots/inventory/frame_0050.png" },
    { key: "inv-recv-warn", label: "Receive Transfer — \"Warning\" modal for routine empty state", path: "screenshots/inventory/frame_0058.png" },
    { key: "inv-receiving", label: "Receiving — green error + inline qty editing + QWERTY",        path: "screenshots/inventory/frame_0068.png" }
  ]
};
