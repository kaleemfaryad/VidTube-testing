# VidTube QA – Test Plan, Test Cases & Playwright Automation

Manual and automated QA project for **VidTube**, a YouTube-clone web application.
It includes a test plan, a documented test case suite, defect reports logged in Jira, and a Playwright (TypeScript) regression suite.

**Application under test:** https://vidtube-frontend-ochre.vercel.app/

---

## Tech Stack

| Area | Tool |
|---|---|
| Automation | Playwright + TypeScript |
| Test case management | Excel (`docs/VidTube_Test_Cases.xlsx`) |
| Defect tracking | Jira |
| Browser | Chrome (desktop) |

---

## Objective

Validate the core functionality of VidTube through exploratory manual testing, functional testing, and automated regression testing, and document defects with clear reproduction steps.

## Scope

**In scope:** Authentication, Home feed, Video playback, Search, Comments, Subscribe, Channel page, Navigation, Responsive/UI

**Out of scope:** Payments and third-party integrations (not applicable to this application)

## Test Types

- Exploratory testing (bug hunting)
- Functional testing
- UI / responsive testing
- Automated regression testing (Playwright)

---

## Repository Structure

```
.
├── README.md
├── docs/
│   ├── VidTube_Test_Plan.md          # Test plan
│   ├── VidTube_Test_Cases.xlsx       # 74 test cases + summary sheet
│   └── Test_Execution_Summary.md     # Results and coverage report
├── tests/                            # Playwright test specs
├── playwright.config.ts
├── package.json
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npx playwright install
```

### Run the tests

```bash
# Run all tests
npx playwright test

# Run a single spec file
npx playwright test tests/<file-name>.spec.ts

# Run in headed mode
npx playwright test --headed

# Open the HTML report
npx playwright show-report
```

If a test needs login credentials, set them in a `.env` file (not committed) rather than in the test code.

---

## Test Results Snapshot

Results from `docs/VidTube_Test_Cases.xlsx`:

| Metric | Count |
|---|---|
| Total test cases documented | 74 |
| Executed | 22 |
| Passed | 17 |
| Failed | 5 |
| Not run | 52 |
| Automated | 6 (≈8%) |

### Coverage by module

| Module | Total | Pass | Fail | Not Run | Automated |
|---|---|---|---|---|---|
| Auth | 14 | 4 | 1 | 9 | 2 |
| Home feed | 5 | 0 | 0 | 5 | 0 |
| Video | 10 | 4 | 2 | 4 | 3 |
| Search | 6 | 4 | 0 | 2 | 0 |
| Comments | 9 | 3 | 1 | 5 | 1 |
| Subscribe | 6 | 0 | 0 | 6 | 0 |
| Channel | 11 | 0 | 0 | 11 | 0 |
| Navigation | 6 | 0 | 0 | 6 | 0 |
| Responsive/UI | 7 | 2 | 1 | 4 | 0 |
| **Total** | **74** | **17** | **5** | **52** | **6** |

---

## Automated Tests (Playwright)

Automated coverage focuses on the highest-value flows:

- **Auth:** login with valid credentials; invalid login test written
- **Video:** like, unlike (toggle), and rapid-click race condition
- **Comments:** posting a comment (happy path)

Test titles include the case ID (for example `VID-06`) so each test maps back to the test case sheet.

---

## Defects Found

Defects were logged in Jira with steps to reproduce, expected vs. actual result, and environment details.

| Bug ID | Test Case | Summary | Severity |
|---|---|---|---|
| VID-1 | CMT-09 | No emoji picker in the comment input | _fill in_ |
| VID-2 | VID-06 | Rapid clicks on Like desync the toggle: 3 clicks changed the count by 3 instead of a net 1 (race condition) | _fill in_ |
| VID-3 | AUTH-13 | Registration accepts a whitespace-only Full Name | _fill in_ |

Other issues observed and pending a Jira ticket:

- **UI-06:** Console shows 404 errors for "Video not found" and for the `/videos/<id>/views` endpoint.
- **VID-10:** A raw "Network error – server unreachable" message is shown to the user when offline.

---

## Limitations

This was a time-boxed test cycle. The following gaps are known and documented:

- **Not executed:** Home feed, Channel page, Navigation, and most Subscribe cases (52 of 74 cases are still "Not Run").
- **Mostly manual:** Search and negative auth cases were tested manually but not automated.
- **Automation depth:** Only ~8% of cases are automated. Subscribe, search, navigation, and negative comment cases are not yet in the suite.
- **Browsers and devices:** Only Chrome was used. Firefox is not covered. Responsive checks used browser zoom rather than formal 375px device emulation.
- **Inconclusive:** AUTH-14 (SQL-injection-style input) needs a retest with the payload in the password field.
- **Test cases written after exploration:** Cases were documented after exploratory testing, not before.

---

## Next Steps

1. Execute Channel page, Subscribe, Home feed, and Navigation cases manually.
2. Automate auth (including negative cases), search, and subscribe/unsubscribe.
3. Add a Firefox project and a mobile-viewport project to `playwright.config.ts`.
4. Retest AUTH-14 and confirm VID-10 with a screenshot.
5. Add CI (GitHub Actions) to run the suite on every push.

---

## Author

**<Your Name>**
[LinkedIn](https://linkedin.com/in/<your-profile>) · [GitHub](https://github.com/<your-username>)
