# Playwright UI Automation — OrangeHRM

![Playwright](https://img.shields.io/badge/Playwright-UI%20Automation-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

A portfolio-focused UI automation framework for the public [OrangeHRM demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login), built with Playwright Test and TypeScript. It demonstrates maintainable browser tests, Page Object Model (POM), test isolation, configurable environments, and CI reporting.

> **Environment note:** OrangeHRM's public demo is a shared, third-party environment. Availability, demo credentials, permissions, and seeded data can change. Tests should be treated as integration checks against that live demo—not as proof about a production system.

## Project at a glance

| Area | Approach |
| --- | --- |
| Application under test | OrangeHRM public demo |
| Language | TypeScript |
| Browser automation | Playwright Test |
| Design | Page Object Model |
| Assertions | Playwright web-first assertions |
| Reports | HTML report, screenshots and traces on failures |
| CI | GitHub Actions |
| Configuration | Environment variables with documented demo defaults |

## Test coverage

The suite is designed to cover:

- Login page rendering, required-field validation, password masking, and invalid credentials.
- Successful authentication and dashboard visibility.
- Navigation to core modules such as PIM, Leave, Time, and Recruitment.
- PIM employee form validation and a controlled create-and-verify workflow where demo permissions allow it.

The live demo can change independently of this repository, so CI results must be interpreted with the run logs and artifacts. A test is not considered successful merely because it was skipped.

## Repository structure

```text
playwright-ui-automation/
├── .github/workflows/playwright.yml
├── docs/
│   ├── test-strategy.md
│   └── test-cases.md
├── src/pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── PIMPage.ts
├── tests/e2e/
│   ├── authentication.spec.ts
│   ├── navigation.spec.ts
│   └── employee-management.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Prerequisites

- Node.js 20 or newer
- npm
- Internet access to the public OrangeHRM demo

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

On Windows PowerShell, copy the example with:

```powershell
Copy-Item .env.example .env
```

The public demo's commonly published default credentials are `Admin` / `admin123`, but shared demo credentials can change. Override them in `.env` when necessary. Never commit real credentials.

## Run tests

```bash
npm test                    # Run the suite
npm run test:headed         # Run with a visible browser
npm run test:ui             # Open Playwright UI mode
npm run test:debug          # Debug tests interactively
npm run test:report         # Open the latest HTML report
npm run typecheck           # Validate TypeScript types
```

Environment variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `ORANGEHRM_BASE_URL` | Base URL for the application | Public OrangeHRM demo |
| `ORANGEHRM_USERNAME` | Demo login username | `Admin` |
| `ORANGEHRM_PASSWORD` | Demo login password | `admin123` |

## CI and diagnostics

GitHub Actions runs TypeScript validation and the Playwright suite on pushes and pull requests. Configure repository secrets `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD` if the public demo defaults stop working. The base URL can be overridden with the repository variable `ORANGEHRM_BASE_URL`.

The workflow uploads the HTML report and failure diagnostics as artifacts when available. Playwright is configured to capture traces and screenshots on failures to make intermittent browser issues easier to investigate.

## Quality principles

- Prefer user-facing locators and web-first assertions over arbitrary sleeps.
- Keep selectors and repeated UI actions inside Page Objects.
- Use unique test data to reduce collisions on the shared demo.
- Keep credentials configurable and out of source control.
- Report actual CI outcomes accurately; do not describe skipped or blocked tests as passing.
- Use the public demo responsibly and avoid broad or destructive data cleanup.

## Related QA portfolio projects

- [Cypress BDD + Cucumber + TypeScript](https://github.com/sraagul99/cypress-bdd-cucumber-typescript)
- [Postman + Newman API Testing](https://github.com/sraagul99/postman-newman-api-testing)

## Author

**Raagul Sivanathan** · Quality Assurance Engineer

- LinkedIn: [linkedin.com/in/sraagul](https://www.linkedin.com/in/sraagul)
- GitHub: [github.com/sraagul99](https://github.com/sraagul99)
