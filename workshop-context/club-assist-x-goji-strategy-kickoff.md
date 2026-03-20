### Project Overview & Participants

- Club Assist x Goji strategy kickoff for Toolbox app redesign
- Club Assist team: Nick Sanfilippo (CTO), Eric McLeer (Product Manager), Rich (Director App Development), Lindsay Sawyer (Director Training), Nathan (Senior Manager Technical Product), Marcelo Caravo (Senior Manager Brand/Digital), Jocelyn Bella (Operations Support Manager)
- Goji team: Claudio Lena (Product Manager), David Barlev (Engagement Manager), Yota (Product Designer)

### Toolbox App Current State

- Legacy mobile app used by technicians for battery fitments, replacements, diagnostics
- Generates 1.6M invoices annually across US/Canada
- Core functionality working well - seeking UI/UX modernization
- Three main modules:
  1. Battery fitment guide (core functionality)
  2. E-invoicing (most widely used add-on)
  3. Inventory management (limited deployment)

### User Base & Workflow

- Primary users: Field technicians (wide age range - early 20s to 70s)
- Secondary users: Club/location managers for oversight
- Current process:
  - Use MBC1000 tester (2-minute battery test)
  - Sync results to Toolbox via button press
  - VIN auto-populates, shows fitment options
  - Generate invoice, collect payment via Square/Clover
  - Complete battery installation
- Total time on scene: 15-25 minutes average

### Key Pain Points & Challenges

- Time on scene is critical metric - any workflow delays impact member satisfaction
- Technicians don’t scroll - need single-screen solutions
- Cluttered interface from years of feature additions
- Dark/light mode essential (locked-down MDM devices, bright Florida sun)
- Font scaling issues with older users
- Feedback submission process needs improvement
  - Currently gets non-actionable feedback
  - Should distinguish product issues from operational questions

### Technical Architecture & Constraints

- Offline-first design with periodic syncing
- Sync frequency may be excessive (every 20 minutes)
- Must support Spanish and French Canadian
- GDPR considerations for potential Europe expansion (1-2 years out)
- No current payment processing within app

### Documentation & Resources

- Three document types linked to vehicles:
  1. Battery location (90% coverage, PDF format)
  2. Technical Service Bulletins/TSBs (40% coverage, high importance)
  3. Installation instructions (40% coverage, difficult installs)
- Media repository with training videos, tips (not vehicle-linked currently)
- TSBs most critical for unavailable batteries (e.g., Subaru lawsuit issues)

### Upcoming Features

- Battery registration module in development
  - Track warranty lifecycle (3-year US, 6-year Canada)
  - Serial number/barcode tracking by supplier
  - Warranty validation without customer invoice dependency
  - Analytics on supplier quality/warranty rates

### Next Steps

- Add team to Slack channel for ongoing communication
- North Star workshop scheduled for next week
- Future workshop to break down features and development approach
- Potential in-house development with design guidance from Goji