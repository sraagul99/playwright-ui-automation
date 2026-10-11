# Test Strategy

## Objective

Exercise high-value user journeys in the public OrangeHRM demo using browser-level automation. The suite is a portfolio demonstration of test design, maintainable automation, and CI diagnostics; it is not a certification of OrangeHRM or of a production deployment.

## Scope

**In scope**
- Authentication page controls and client-side required-field validation.
- Invalid-credential feedback and password input masking.
- Successful login using configurable demo credentials.
- Sidebar navigation to PIM, Leave, Time, and Recruitment.
- PIM required-field validation and a uniquely named employee create/read/delete lifecycle.

**Out of scope**
- Testing OrangeHRM internals or private APIs.
- Performance, security penetration, accessibility conformance, and cross-browser certification.
- Any assumption that public demo seed data, permissions, credentials, or uptime are stable.

## Test design

| Technique | Application |
| --- | --- |
| Positive testing | Configured demo login, dashboard, module navigation, employee profile verification |
| Negative testing | Empty login fields, invalid credentials, missing employee name fields |
| State verification | URL, visible dashboard heading, form values, visible validation messages |
| Data isolation | Unique last name per created employee; cleanup by the employee number created during the same test |
| Robustness | Playwright web-first assertions, bounded timeouts, trace and screenshot capture on failure |

## Execution and environments

The target URL and credentials are configurable through `ORANGEHRM_BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD`. Defaults point to the publicly available OrangeHRM demo and its commonly published demo credentials. Values may be changed by the third-party site; credentials should be stored in GitHub Actions secrets rather than committed.

CI runs Chromium with one worker to reduce contention against the shared demo. The project retries once in CI and retains Playwright traces, screenshots, video, and an HTML report where available. A retry does not turn a persistent failure into a pass, and demo outages should be reported as environmental failures rather than defects in the application under test.

## Risks and controls

| Risk | Control |
| --- | --- |
| Public demo is unavailable or rate-limited | Review the CI logs and identify environmental failures explicitly |
| Credentials change | Use repository secrets to override defaults |
| Shared data collisions | Generate a unique test surname and target cleanup by employee number |
| UI changes | Use user-facing roles and focused selectors; update Page Objects when UI behaviour changes |
| Cleanup is blocked by changed demo permissions | The employee lifecycle test fails visibly; inspect the run before rerunning and remove test data manually only when safely identifiable |

## Entry and exit criteria

- **Entry:** Node.js and npm available, dependencies installed, target reachable, and valid demo credentials configured.
- **Exit:** TypeScript checks succeed and the suite result, including all failed, skipped, or retried tests, is reviewed. A green workflow alone should not be interpreted without its test summary and artifacts.
