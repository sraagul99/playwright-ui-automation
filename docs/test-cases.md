# Test Cases

These cases map to the current automated suite. The live demo may change independently, so expected results should be reviewed when its UI or permissions change.

| ID | Area | Scenario | Type | Expected result | Automation |
| --- | --- | --- | --- | --- | --- |
| AUTH-001 | Login | Open the login page | Positive/UI | Username, password, and Login controls are visible and usable | Yes |
| AUTH-002 | Login | Submit empty credentials | Negative/validation | Required-field messages appear for username and password; user remains on login page | Yes |
| AUTH-003 | Login | Enter a password | Security/UI | Password input is masked | Yes |
| AUTH-004 | Login | Submit invalid credentials | Negative/authentication | Invalid-credentials feedback appears and login is not completed | Yes |
| AUTH-005 | Login | Submit configured demo credentials | Positive/authentication | User reaches the dashboard | Yes |
| NAV-001 | Navigation | Open PIM from the sidebar | Navigation | PIM route is loaded | Yes |
| NAV-002 | Navigation | Open Leave from the sidebar | Navigation | Leave route is loaded | Yes |
| NAV-003 | Navigation | Open Time from the sidebar | Navigation | Time route is loaded | Yes |
| NAV-004 | Navigation | Open Recruitment from the sidebar | Navigation | Recruitment route is loaded | Yes |
| PIM-001 | Employee management | Save the Add Employee form without names | Negative/validation | Required-field messages appear for first and last name | Yes |
| PIM-002 | Employee management | Create an employee and verify details | Positive/workflow | Newly created employee details page displays the submitted first and last name | Yes |
| PIM-003 | Employee management | Remove the employee created in PIM-002 | Data cleanup | Only the employee identified by this test's unique employee number is deleted | Included in PIM-002 |

## Manual exploratory checks

- Resize the viewport and check that the login form remains usable.
- Refresh a protected page after login and observe session behaviour.
- Check browser back/forward navigation after logout.
- Verify server-side validation and permission behaviour if a dedicated non-admin test account is available.
- Review keyboard navigation and focus visibility; automated tests in this repository do not claim full accessibility coverage.
