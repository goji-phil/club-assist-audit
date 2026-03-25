// ============================================================
// template.js — FigJam UX Audit Board Writer (Rendering Engine)
//
// This file is PROJECT-AGNOSTIC. Do not put project-specific
// data here. Use findings-data.js for that.
//
// FINDINGS_DATA and IMAGES are injected by build.js at the top
// of code.js before this content. They are not defined here.
// ============================================================

(async function () {

  // ── 1. Find and activate target page ──────────────────────
  const targetPage = figma.root.children.find(
    function (p) { return p.name === FINDINGS_DATA.targetPage; }
  );
  if (!targetPage) {
    figma.notify(
      '❌ Page not found: "' + FINDINGS_DATA.targetPage + '". ' +
      'Create the page in FigJam and try again.',
      { timeout: 6000 }
    );
    figma.closePlugin();
    return;
  }
  // Abort if we are already on a different page and the plugin
  // would otherwise modify the wrong content.
  figma.currentPage = targetPage;

  // ── 2. Load fonts (must complete before any text is written) ──
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  // ── 3. Layout constants ────────────────────────────────────
  var SX         = 200;   // canvas start X
  var curY       = 200;   // current Y cursor (advances after each row)
  var ROW_GAP    = 100;   // vertical space between rows

  var CARD_W     = 620;
  var CARD_GAP   = 40;

  var SS_W       = 720;   // board screenshot width
  var SS_H       = 520;   // board screenshot height
  var SS_GAP     = 40;

  var SECTION_W  = 1040;  // pain-point section width
  var SECTION_GAP = 60;   // gap between sections
  var SECTIONS_PER_ROW = 3;

  var STICKY_W   = 300;   // sticky note width (pixels)
  var STICKY_H   = 180;   // estimated sticky height
  var STICKY_GAP = 16;    // gap between stickies
  var STICKIES_PER_ROW = 3;
  // x offsets for 3 stickies per row within a section (20px left margin)
  var STICKY_X_OFFSETS = [20, 340, 660];

  var PP_STICKIES_PER_ROW = 4;
  var PP_STICKY_W = 340;
  var PP_STICKY_GAP = 20;

  var AF_W       = 220;   // app-frame image width
  var AF_H       = 476;   // app-frame image height (maintains ~2:1 aspect for 415×900)
  var AF_GAP     = 32;

  var SS_IN_W    = 160;   // screenshot width embedded inside a pain-point section
  var SS_IN_H    = 346;   // screenshot height (160 × 900/415 ≈ 347, portrait)
  var SS_IN_GAP  = 16;    // gap between screenshots within a section

  // ── 4. Color palette ──────────────────────────────────────
  var SEV_COLORS = {
    4: { r: 1.00, g: 0.30, b: 0.30 }, // Critical — red
    3: { r: 1.00, g: 0.59, b: 0.06 }, // High — orange
    2: { r: 1.00, g: 0.85, b: 0.10 }, // Medium — yellow
    1: { r: 0.66, g: 0.85, b: 0.66 }, // Low — light green
  };
  var POSITIVE_COLOR  = { r: 0.66, g: 0.84, b: 0.96 }; // sky blue
  var NEUTRAL_COLOR   = { r: 0.94, g: 0.94, b: 0.94 }; // light grey
  var HEADER_COLOR    = { r: 0.09, g: 0.16, b: 0.33 }; // dark navy
  var WHITE           = { r: 1.00, g: 1.00, b: 1.00 };
  var BLACK           = { r: 0.10, g: 0.10, b: 0.10 };

  // ── 5. Helpers ────────────────────────────────────────────

  function solidFill(color) {
    return [{ type: 'SOLID', color: color }];
  }

  // Create a sticky note at absolute page coordinates.
  function makeSticky(text, color, x, y) {
    var sticky = figma.createSticky();
    sticky.text.characters = text;
    sticky.fills = solidFill(color);
    sticky.authorVisible = false;
    sticky.x = x;
    sticky.y = y;
    targetPage.appendChild(sticky);
    return sticky;
  }

  // Create a text node at absolute page coordinates.
  // If parentNode is provided, append to it (x/y become relative).
  function makeText(text, x, y, opts, parentNode) {
    opts = opts || {};
    var t = figma.createText();
    t.fontName = { family: 'Inter', style: opts.bold ? 'Bold' : 'Regular' };
    t.characters = text;
    t.fontSize = opts.fontSize || 14;
    if (opts.color) t.fills = solidFill(opts.color);
    if (opts.width) {
      t.textAutoResize = 'HEIGHT';
      t.resize(opts.width, t.height || 20);
    }
    if (opts.lineHeight) {
      t.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' };
    }
    t.x = x;
    t.y = y;
    if (parentNode) {
      parentNode.appendChild(t);
    } else {
      targetPage.appendChild(t);
    }
    return t;
  }

  // Create a frame (card/container) at absolute page coordinates.
  function makeFrame(x, y, w, h, color, name, clip) {
    var frame = figma.createFrame();
    frame.name = name || 'Frame';
    frame.x = x;
    frame.y = y;
    frame.resize(w, h);
    frame.fills = solidFill(color || WHITE);
    frame.cornerRadius = 12;
    frame.clipsContent = (clip !== false); // clip by default
    targetPage.appendChild(frame);
    return frame;
  }

  // Decode a base64 data-URL to Uint8Array for figma.createImage().
  // Pure JS implementation — atob() is not available in the Figma plugin
  // main thread (QuickJS sandbox has no browser APIs).
  function dataUrlToBytes(dataUrl) {
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var base64 = dataUrl.split(',')[1].replace(/\s/g, '');
    var len = base64.length;
    var padded = base64[len - 2] === '=' ? 2 : base64[len - 1] === '=' ? 1 : 0;
    var out = new Uint8Array(Math.floor(len * 3 / 4) - padded);
    var p = 0;
    for (var i = 0; i < len; i += 4) {
      var a = CHARS.indexOf(base64[i]);
      var b = CHARS.indexOf(base64[i + 1]);
      var c = CHARS.indexOf(base64[i + 2]);
      var d = CHARS.indexOf(base64[i + 3]);
      out[p++] = (a << 2) | (b >> 4);
      if (c !== 64) out[p++] = ((b & 0xF) << 4) | (c >> 2);
      if (d !== 64) out[p++] = ((c & 0x3) << 6) | d;
    }
    return out;
  }

  // Place an image node (rect with IMAGE fill) at absolute page coordinates.
  // Falls back to a grey placeholder if the image key is not in IMAGES.
  function placeImage(key, x, y, w, h, label) {
    var rect = figma.createRectangle();
    rect.x = x;
    rect.y = y;
    rect.resize(w, h);
    rect.cornerRadius = 8;

    if (IMAGES[key]) {
      var bytes = dataUrlToBytes(IMAGES[key]);
      var img   = figma.createImage(bytes);
      rect.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FIT' }];
      rect.strokeWeight = 1;
      rect.strokes = solidFill({ r: 0.85, g: 0.85, b: 0.85 });
    } else {
      rect.fills = solidFill(NEUTRAL_COLOR);
      // Draw a "missing image" label inside
      var missing = makeText('[image not found: ' + key + ']', x + 8, y + 8, { fontSize: 12, color: { r: 0.5, g: 0.5, b: 0.5 }, width: w - 16 });
    }
    targetPage.appendChild(rect);

    if (label) {
      makeText(label, x, y + h + 8, { fontSize: 13, width: w });
    }
    return rect;
  }

  // Returns the estimated height of a pain-point section
  // (header bar + optional screenshot row + stickies in a grid).
  function calcSectionH(section) {
    if (section.moduleDivider) return 80;
    var rows = Math.ceil(section.stickies.length / STICKIES_PER_ROW);
    var stickyBlockH = rows * (STICKY_H + STICKY_GAP);
    var ssBlockH = (section.screenshots && section.screenshots.length > 0)
      ? (SS_IN_H + SS_IN_GAP)
      : 0;
    return 48 + 16 + ssBlockH + stickyBlockH + 20;
  }

  // ── 6. Board title ────────────────────────────────────────
  makeText(
    'Club Assist × Goji — UX Audit Findings',
    SX, curY,
    { fontSize: 48, bold: true, color: HEADER_COLOR, width: 3600 }
  );
  curY += 72;
  makeText(
    'Sources: FigJam strategy sprint board · 3 Granola workshop notes · 87 app frames · promo video · inventory module recording (71 frames) · 2026-03-24',
    SX, curY,
    { fontSize: 18, color: { r: 0.4, g: 0.4, b: 0.4 }, width: 4000 }
  );
  curY += 60;

  // ── 7. Severity legend ────────────────────────────────────
  var legendItems = [
    { label: '4 — Critical', color: SEV_COLORS[4] },
    { label: '3 — High',     color: SEV_COLORS[3] },
    { label: '2 — Medium',   color: SEV_COLORS[2] },
    { label: '1 — Low',      color: SEV_COLORS[1] },
    { label: '✓ Positive',   color: POSITIVE_COLOR },
  ];
  var legX = SX;
  for (var li = 0; li < legendItems.length; li++) {
    var item = legendItems[li];
    var dot = figma.createEllipse();
    dot.x = legX; dot.y = curY + 3;
    dot.resize(16, 16);
    dot.fills = solidFill(item.color);
    targetPage.appendChild(dot);
    makeText(item.label, legX + 24, curY, { fontSize: 15, width: 160 });
    legX += 200;
  }
  curY += 44;

  // ── 8. Row 1 — Context cards ──────────────────────────────
  var cardX = SX;
  var maxCardH = 0;
  for (var ci = 0; ci < FINDINGS_DATA.contextCards.length; ci++) {
    var card = FINDINGS_DATA.contextCards[ci];
    var cardFrame = makeFrame(cardX, curY, CARD_W, 600, card.color, card.title, true);

    var ct = makeText(card.title, 20, 20, { fontSize: 20, bold: true, width: CARD_W - 40 }, cardFrame);
    var cb = makeText(card.body, 20, ct.y + ct.height + 12, { fontSize: 14, lineHeight: 22, width: CARD_W - 40 }, cardFrame);
    var newH = Math.max(cb.y + cb.height + 28, 200);
    cardFrame.resize(CARD_W, newH);
    maxCardH = Math.max(maxCardH, newH);
    cardX += CARD_W + CARD_GAP;
  }
  curY += maxCardH + ROW_GAP;

  // ── 9. Row 2 — Key pain points ───────────────────────────
  makeText(
    'Key Pain Points — by Audit Area',
    SX, curY,
    { fontSize: 24, bold: true, color: HEADER_COLOR, width: 4000 }
  );
  curY += 44;

  var sections = FINDINGS_DATA.painPointSections;

  // Pre-compute row max heights
  var rowMaxH = [];
  for (var r = 0; r < Math.ceil(sections.length / SECTIONS_PER_ROW); r++) {
    var rowSlice = sections.slice(r * SECTIONS_PER_ROW, (r + 1) * SECTIONS_PER_ROW);
    var maxH2 = 0;
    for (var rsi = 0; rsi < rowSlice.length; rsi++) {
      maxH2 = Math.max(maxH2, calcSectionH(rowSlice[rsi]));
    }
    rowMaxH.push(maxH2);
  }

  // Compute cumulative Y offset per row
  var rowY = [curY];
  for (var rr = 1; rr < rowMaxH.length; rr++) {
    rowY.push(rowY[rr - 1] + rowMaxH[rr - 1] + ROW_GAP);
  }

  // Create each section
  for (var sIdx = 0; sIdx < sections.length; sIdx++) {
    var sec = sections[sIdx];
    var sRow = Math.floor(sIdx / SECTIONS_PER_ROW);
    var sCol = sIdx % SECTIONS_PER_ROW;
    var secX = SX + sCol * (SECTION_W + SECTION_GAP);
    var secY = rowY[sRow];

    // Module divider — full-width navy heading bar
    if (sec.moduleDivider) {
      var divW = SECTIONS_PER_ROW * (SECTION_W + SECTION_GAP) - SECTION_GAP;
      var divFrame = makeFrame(SX, secY, divW, 56, HEADER_COLOR, sec.title + '_divider', true);
      divFrame.cornerRadius = 8;
      makeText(sec.title, 24, 16, { fontSize: 20, bold: true, color: WHITE, width: divW - 48 }, divFrame);
      continue;
    }

    // Section header bar
    var headerFrame = makeFrame(secX, secY, SECTION_W, 48, HEADER_COLOR, sec.title + '_header', true);
    headerFrame.cornerRadius = 8;
    makeText(sec.title, 16, 13, { fontSize: 16, bold: true, color: WHITE, width: SECTION_W - 32 }, headerFrame);

    // Screenshots row (if section has screenshots)
    var ssStickyOffsetY = 0;
    if (sec.screenshots && sec.screenshots.length > 0) {
      var ssImgX = secX + 20;
      var ssImgY = secY + 48 + 16;
      for (var ssi = 0; ssi < sec.screenshots.length; ssi++) {
        placeImage(sec.screenshots[ssi], ssImgX, ssImgY, SS_IN_W, SS_IN_H, null);
        ssImgX += SS_IN_W + SS_IN_GAP;
      }
      ssStickyOffsetY = SS_IN_H + SS_IN_GAP;
    }

    // Stickies
    var stickyRow = 0, stickyCol = 0;
    for (var fi = 0; fi < sec.stickies.length; fi++) {
      var finding = sec.stickies[fi];
      var sColor = SEV_COLORS[finding.severity] || NEUTRAL_COLOR;
      var stX = secX + STICKY_X_OFFSETS[stickyCol];
      var stY = secY + 48 + 16 + ssStickyOffsetY + stickyRow * (STICKY_H + STICKY_GAP);
      makeSticky(finding.text, sColor, stX, stY);
      stickyCol++;
      if (stickyCol >= STICKIES_PER_ROW) {
        stickyCol = 0;
        stickyRow++;
      }
    }
  }

  // Advance curY past all section rows
  var totalSectionH = 0;
  for (var rh = 0; rh < rowMaxH.length; rh++) {
    totalSectionH += rowMaxH[rh] + ROW_GAP;
  }
  curY += totalSectionH;

  // ── 10. Row 3 — Positive patterns + Framework ─────────────
  var ROW4_Y = curY;
  var ppCols = PP_STICKIES_PER_ROW;
  var ppTotalW = ppCols * (PP_STICKY_W + PP_STICKY_GAP) - PP_STICKY_GAP;
  var fwX = SX + ppTotalW + 100;

  // Positive patterns (left)
  makeText(
    'Positive Patterns to Preserve',
    SX, ROW4_Y,
    { fontSize: 24, bold: true, color: { r: 0.10, g: 0.45, b: 0.72 }, width: ppTotalW }
  );
  var ppY = ROW4_Y + 44;
  var ppXcur = SX;
  for (var ppi = 0; ppi < FINDINGS_DATA.positivePatterns.length; ppi++) {
    makeSticky(FINDINGS_DATA.positivePatterns[ppi], POSITIVE_COLOR, ppXcur, ppY);
    ppXcur += PP_STICKY_W + PP_STICKY_GAP;
    if ((ppi + 1) % ppCols === 0) {
      ppXcur = SX;
      ppY += STICKY_H + STICKY_GAP;
    }
  }
  var ppRows2 = Math.ceil(FINDINGS_DATA.positivePatterns.length / ppCols);
  var ppBlockH = 44 + ppRows2 * (STICKY_H + STICKY_GAP);

  // Framework (right)
  makeText(
    'UX Audit Framework',
    fwX, ROW4_Y,
    { fontSize: 24, bold: true, color: HEADER_COLOR, width: 900 }
  );
  var fwFrame = makeFrame(fwX, ROW4_Y + 44, 900, 100, { r: 0.97, g: 0.97, b: 0.98 }, 'UX Audit Framework', false);

  var fwIY = 20;
  var sevHead = makeText('Severity Scale', 20, fwIY, { fontSize: 16, bold: true, color: HEADER_COLOR, width: 860 }, fwFrame);
  fwIY += sevHead.height + 8;
  for (var sci = 0; sci < FINDINGS_DATA.framework.severityScale.length; sci++) {
    var st = makeText(FINDINGS_DATA.framework.severityScale[sci], 20, fwIY, { fontSize: 14, lineHeight: 20, width: 860 }, fwFrame);
    fwIY += st.height + 4;
  }
  fwIY += 16;
  var hHead = makeText('10 Adapted Heuristics (Field-Service Mobile)', 20, fwIY, { fontSize: 16, bold: true, color: HEADER_COLOR, width: 860 }, fwFrame);
  fwIY += hHead.height + 8;
  for (var hi = 0; hi < FINDINGS_DATA.framework.heuristics.length; hi++) {
    var ht = makeText(FINDINGS_DATA.framework.heuristics[hi], 20, fwIY, { fontSize: 13, lineHeight: 19, width: 860 }, fwFrame);
    fwIY += ht.height + 4;
  }
  fwFrame.resize(900, fwIY + 24);

  curY = ROW4_Y + Math.max(ppBlockH, fwFrame.height + 44) + ROW_GAP;

  // ── 11. Row 4 — App recording key frames ─────────────────
  makeText(
    'Live App — Key Screens & Issues',
    SX, curY,
    { fontSize: 24, bold: true, color: HEADER_COLOR, width: 3000 }
  );
  curY += 44;
  var afX = SX;
  for (var afi = 0; afi < FINDINGS_DATA.appFrames.length; afi++) {
    var af = FINDINGS_DATA.appFrames[afi];
    placeImage(af.key, afX, curY, AF_W, AF_H, af.label);
    afX += AF_W + AF_GAP;
  }
  curY += AF_H + 60;

  // ── 12. Row 5 — Inventory module key frames ───────────────
  if (FINDINGS_DATA.inventoryFrames && FINDINGS_DATA.inventoryFrames.length > 0) {
    makeText(
      'Inventory Management Module — Key Screens',
      SX, curY,
      { fontSize: 24, bold: true, color: HEADER_COLOR, width: 3000 }
    );
    curY += 44;
    var invX = SX;
    for (var invI = 0; invI < FINDINGS_DATA.inventoryFrames.length; invI++) {
      var invF = FINDINGS_DATA.inventoryFrames[invI];
      placeImage(invF.key, invX, curY, AF_W, AF_H, invF.label);
      invX += AF_W + AF_GAP;
    }
    curY += AF_H + 60;
  }

  // ── 13. Zoom to fit all content ───────────────────────────
  figma.viewport.scrollAndZoomIntoView(targetPage.children);

  figma.notify(
    '✅ UX Audit Findings added to "' + FINDINGS_DATA.targetPage + '"',
    { timeout: 4000 }
  );
  figma.closePlugin();

})().catch(function (err) {
  figma.notify('❌ Plugin error: ' + err.message, { timeout: 8000 });
  console.error(err);
  figma.closePlugin();
});
