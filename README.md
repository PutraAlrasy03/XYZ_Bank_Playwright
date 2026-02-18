# XYZ_Bank_Playwright

Playwright test automation for XYZ Bank web application.

## Project Structure
- `tests/` - Test files
- `pages/` - Page Object Model classes
- `data/` - Test data
- `playwright.config.js` - Configuration

## Test Scenarios
- Customer tests: Login, deposit, withdraw, transactions
- Manager tests: Add customer, open account, search, delete

## Running Tests
```bash
npm install
npx playwright install
npm test
```

## Reports
Generated in `playwright-report/` and `test-results/` directories.