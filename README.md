# XYZ_Bank_Playwright

This is a Playwright test automation project for XYZ Bank web application.

## Project Structure

- `tests/` - Test specification files
- `pages/` - Page Object Model classes
- `data/` - Test data configuration
- `playwright.config.js` - Playwright configuration

## Test Scenarios

### Customer Tests (TC_CUST_*)
- TC_CUST_01: Customer Login
- TC_CUST_02: Deposit functionality
- TC_CUST_03: Withdraw functionality
- TC_CUST_04: Transaction History viewing
- TC_CUST_05: Navigation back to Customer Login
- TC_CUST_06: Navigation back to Account Page
- TC_CUST_07: Reset Transaction History
- TC_CUST_08: Multiple Deposits
- TC_CUST_09: Multiple Withdrawals

### Manager Tests (TC_MGR_*)
- TC_MGR_01: Add Customer
- TC_MGR_02: Open Account
- TC_MGR_03: Search Customer
- TC_MGR_04: Delete Customer

## Running Tests

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npm test

# Run specific test file
npx playwright test tests/customer.spec.js
npx playwright test tests/manager.spec.js
```

## Configuration

Test data is configured in `data/testData.json`:

```json
{
  "customers": [
    {
      "firstName": "Harry",
      "lastName": "Potter",
      "postCode": "12345",
      "currency": "Dollar"
    }
  ],
  "transactions": {
    "depositAmount": 1000,
    "withdrawAmount": 500
  }
}
```

## Reports

Test reports are generated in:
- HTML Report: `playwright-report/index.html`
- Test Results: `test-results/` directory
- Screenshots: Automatically captured on failures
- Videos: Available if video recording is enabled