### Meeting Overview

- Strategy workshop for Club Assist x Goji collaboration
- Focus: user journeys and flows for Toolbox app redesign
- May need follow-up Thursday or next week for features workshop
- Scheduled next workshop: Wednesday March 25, 2:30-4pm Eastern

### Current User Journey Mapping

- Mapping field technician workflow from dispatch to completion
- Goal: align on real-life workflow, identify missing steps
- Primary user: field technicians completing service calls efficiently
- North Star metric: reduce time spent on scene

### Preparation Phase (Pre-Dispatch)

- Technicians can review general reference documents
  - Battery safety, climate charts, regulations
  - More relevant for newer technicians
- Current issues:
  - Documents scattered across different app sections
  - Difficult to browse/find specific resources
  - Limited Club Assist brand visibility (only on login screen)
- Improvement opportunities:
  1. Categorize documents by relevance timing
  2. Separate general reference from vehicle-specific docs
  3. Increase brand presence throughout app

### Integration Workflows

- Three key integrations streamline data flow:
  1. Salesforce → MVC1000: passes work order/call ID numbers
  2. MVC1000 → Toolbox: carries diagnostic info, VIN, call ID
  3. Salesforce → E-invoicing: auto-populates member information
- ~60% of technicians use MVC1000 integration
- Remaining 40% use rival testers (B2Q) without Toolbox sync
- Integration reduces on-scene time and data entry errors

### Battery Selection & Vehicle Details

- Two possible entry points:
  1. Direct to battery details (single fitment)
  2. OE option trim page (multiple battery options)
- Vehicle info auto-populated when syncing from MVC1000
- Manual VIN scanning available via barcode/QR code on driver door
- Battery search results show critical technician info:
  - Install precautions (venting, reset requirements, difficulty)
  - Relevant technical service bulletins (TSBs)
  - Battery benefits for customer conversations

### Warranty Process Evolution

- Current: manual warranty calculator with date entry
- Future: battery registration system
  - Will auto-calculate warranty for registered batteries
  - Still need manual calculator for non-registered batteries
  - Building database over 3+ year timeline
- Two warranty types:
  - AAA: 3-year free replacement (post-2022 purchases)
  - CAA: 6-year prorated warranty
- System automatically applies correct warranty based on location/date

### UI/UX Improvement Areas

- Battery details page needs accordion design
  - Hide technical specs (dimensions, weight) by default
  - Keep critical info visible (group size, station, battery model)
  - Reduce scrolling to reach “Start Estimate”
- Item selection screen organization
  - Current challenge: extremely long lists (16+ discount tiers)
  - Proposed: categorize items (fees, discounts, physical items)
  - Requires MCA portal updates for item categorization
- TSB visibility needs improvement
  - Critical vehicle-specific information currently buried
  - Should be more prominent for safety/proper installation

### Next Steps

- Yota to revise user journey with today’s insights
- Thursday: complete remaining journey steps
- Wednesday March 25: features workshop (2:30-4pm Eastern)
- Enable inventory management access for Yota’s test account
- Consider onboarding experience improvements for new users