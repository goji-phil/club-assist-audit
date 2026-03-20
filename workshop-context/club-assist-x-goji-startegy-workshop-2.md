### Current User Onboarding Experience

- Technicians sign up for Toolbox without approval needed for basic functionality
- Automatic LMS registration upon Toolbox signup
- No guided onboarding or tutorial currently exists
- Training happens through:
  - LMS (more in-depth with screenshots/videos)
  - In-person training (varies by club)
  - Existing PDF user guide in hamburger menu (outdated)

### Proposed Onboarding Improvements

- Brief 3-5 page popup tutorial when first logging in
  - Introduce core benefits and workflow
  - Link to LMS training resources
  - Keep high-level since LMS provides detailed training
- Contextual onboarding for new module access
  - Pop-up when E-invoicing enabled: “Here’s how to do E-invoicing”
  - Same approach for Stock Assist when granted
- Updated user guide to be ready by project completion

### Module Access & Permissions

- Basic access upon signup:
  - Battery fitment guide
  - Media section with videos
  - Vehicle search functionality
- Restricted modules requiring manual enablement:
  - E-invoicing (most clubs use, some have own solutions)
  - Stock Assist/inventory management
  - Technician scorecard (club-level decision)
- Station managers grant permissions via My Club Assist portal
  - Changes sync to Toolbox after logout/login

### Data Integration & Workflow

- Salesforce integration via API to backend SQL database
- NBC 1000 syncs: VIN, UUID, test results, call ID
- Customer data populates from backend when call ID entered
- Current usage:
  - Western Central NY using direct integration
  - Ace testing (Salesforce issues)
  - National rolling out to 7+ small clubs
- 40% of technicians don’t use NBC 1000

### Battery Fitment & Reporting Issues

- Most common feedback types:
  1. Difficult install complaints (technicians want extra fees)
  2. Inaccurate fitment reports
  3. Battery location feedback
- Technicians identify inaccuracy by physical inspection vs. OEM specs
- CCA (Cold Cranking Amps) critical for proper testing
  - Wrong CCA input = false battery test results
- Subaru frequent offender due to TSB changes (90% of unavailable complaints)
- Need clearer definition of “difficult install” in UI
  - Based on All Data labor times (>0.5 hours per AAA Inc standard)

### E-invoicing Payment Flow Challenges

- Payment timing varies by club requirements:
  - Some require payment before installation (prevent drive-offs)
  - Others allow installation first, then payment
- Current tax rate system:
  - Set at station level in portal
  - Hidden override feature for cross-county work
  - 95% of technicians never use override
  - GPS-based automation possible but costly for free product
- Core fee popup appears for every battery replacement
  - 99.9% click “No” (standard workflow)
  - $18 fee when customer keeps old battery for recycling

### Installation Documentation Access

- Current issue: lose access to install guides after completing invoice
- Technicians need TSB links, install guides during actual installation
- Proposed solution: make battery detail screen central hub
  - E-invoicing as separate sub-flow
  - Return to main screen after invoice completion
  - Maintain access to documentation throughout process

### Technician Scorecard Functionality

- Tracks conversion rates, battery test percentages
- Updates nightly at 6:30 PM (not real-time)
- Primary purposes:
  - Club-level performance monitoring via BI reports
  - Technician qualification for contests (tens of thousands in prizes)
  - Bonus/commission structures (varies by club)
- Data visible to supervisors in customer portal
- Gamification potential for driving behavior