# Test Plan – VidTube

## Objective
Validate core functionality of VidTube (YouTube clone) through manual 
exploratory testing and automated regression testing, identifying and 
documenting defects via Jira.

## Scope
In scope: Auth, Home feed, Video playback, Search, Comments, Subscribe, 
Channel page, Navigation
Out of scope: Payment (n/a), Third-party integrations (n/a)

## Test Types
- Exploratory manual testing (bug-hunting)
- Functional testing (does each feature work as expected)
- UI/Responsive testing
- Automated regression testing (Playwright)

## Environment
URL: https://vidtube-frontend-ochre.vercel.app/
Browsers: Chrome, Firefox
Devices: Desktop, Mobile viewport (via DevTools emulation)

## Deliverables
- Bug reports (Jira)
- Automated test suite (Playwright + TypeScript)
- Test execution summary