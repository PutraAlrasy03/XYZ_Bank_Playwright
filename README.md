# XYZ Bank Playwright Test Automation

A comprehensive test automation framework for XYZ Bank web application using Playwright and Page Object Model (POM) architecture.

## 📋 Project Overview

This project implements automated testing for a banking web application with the following features:

- **Page Object Model Architecture** for maintainable and scalable test code
- **Customer Management Tests** - Login, deposit, withdraw, transaction history
- **Manager Management Tests** - Add customers, open accounts, search, delete customers
- **Data-Driven Testing** using JSON configuration files
- **Cross-Browser Testing** (Chromium, Firefox, WebKit)
- **Parallel Test Execution** for faster test runs

## 🏗️ Architecture

### Page Object Model Structure

```
pages/
├── LoginPage.js      # Customer and Manager login functionality
├── ManagerPage.js    # Bank manager operations (add customer, open account, etc.)
└── CustomerPage.js   # Customer operations (deposit, withdraw, transactions)

tests/
├── manager.spec.js   # Bank manager test scenarios
└── customer.spec.js  # Customer test scenarios

data/
└── testData.json     # Test data configuration

playwright.config.js  # Playwright configuration
```

### Test Scenarios

#### Customer Tests (TC_CUST_*)
- **TC_CUST_01**: Customer Login
- **TC_CUST_02**: Deposit functionality
- **TC_CUST_03**: Withdraw functionality  
- **TC_CUST_04**: Transaction History viewing
- **TC_CUST_05**: Navigation back to Customer Login
- **TC_CUST_06**: Navigation back to Account Page
- **TC_CUST_07**: Reset Transaction History
- **TC_CUST_08**: Multiple Deposits
- **TC_CUST_09**: Multiple Withdrawals

#### Manager Tests (TC_MGR_*)
- **TC_MGR_01**: Add Customer
- **TC_MGR_02**: Open Account
- **TC_MGR_03**: Search Customer
- **TC_MGR_04**: Delete Customer

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PutraAlrasy03/XYZ_Bank_Playwright.git
   cd XYZ_Bank_Playwright
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Configuration

The test data is configured in `data/testData.json`:

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

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Specific Browser
```bash
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit
npx playwright test --project=webkit
```

### Run Specific Test File
```bash
# Customer tests only
npx playwright test tests/customer.spec.js

# Manager tests only
npx playwright test tests/manager.spec.js
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### Run Tests Headless
```bash
npx playwright test --headless
```

### Run Tests with Video Recording
```bash
npx playwright test --video
```

## 📊 Test Reports

After running tests, Playwright generates detailed reports:

- **HTML Report**: Open `playwright-report/index.html` in your browser
- **Test Results**: Located in `test-results/` directory
- **Screenshots**: Automatically captured on test failures
- **Videos**: Available if video recording is enabled

## ⚙️ Configuration

The `playwright.config.js` file contains:

- **Timeouts**: 30 seconds for actions, 60 seconds for navigation
- **Test directories**: `tests/`
- **Output directories**: `test-results/`, `playwright-report/`
- **Browser settings**: Headless mode, viewport size
- **Test isolation**: Each test runs independently

## 🔄 Continuous Integration

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- Runs tests on multiple operating systems
- Tests across different browsers
- Generates and uploads test reports
- Runs on push and pull request events

## 📁 Project Structure

```
XYZ_Bank_Playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml    # CI/CD pipeline
├── data/
│   └── testData.json         # Test data configuration
├── pages/                    # Page Object Model classes
│   ├── LoginPage.js
│   ├── ManagerPage.js
│   └── CustomerPage.js
├── tests/                    # Test specification files
│   ├── customer.spec.js
│   └── manager.spec.js
├── playwright.config.js      # Playwright configuration
├── package.json              # Project dependencies
├── package-lock.json         # Locked dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🐛 Troubleshooting

### Common Issues

1. **Browser not found**: Run `npx playwright install` to install browsers
2. **Tests timing out**: Check network connectivity to the test application
3. **Element not found**: Verify selectors in Page Object classes match the application

### Debug Mode

Run tests with debug mode for detailed logging:
```bash
npx playwright test --debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm test`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues and questions:
- Create a GitHub issue
- Check the test reports for detailed error information
- Review the Playwright documentation: https://playwright.dev/

## 🎯 Test Application

The tests are designed to work with the XYZ Bank demo application available at:
https://www.globalsqa.com/angularJs-protractor/BankingProject

**Note**: This is a demo application with limited functionality.
