import { expect } from '@playwright/test';

export class CustomerPage {
  constructor(page) {
    this.page = page;
    this.depositBtn = page.locator('button:has-text("Deposit")');
    this.withdrawBtn = page.locator('button:has-text("Withdrawl")');
    this.transactionsBtn = page.locator('button:has-text("Transactions")');
    this.homeBtn = page.locator('button.home');
    this.logoutBtn = page.locator('button.logout');
    
    // Customer selection
    this.customerSelect = page.locator('select#userSelect');
    
    // Transaction inputs
    this.amountInput = page.locator('input[ng-model="amount"]');
    this.depositSubmitBtn = page.locator('button[type="submit"]').first();
    this.withdrawSubmitBtn = page.locator('button[type="submit"]').last();
    
    // Transaction table
    this.transactionTable = page.locator('table.table');
    this.transactionRows = page.locator('table.table tbody tr');
    this.backBtn = page.locator('button:has-text("Back")');
    this.resetBtn = page.locator('button:has-text("Reset")');
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption(customerName);
  }

  async clickDeposit() {
    // Wait for the deposit button to be visible and clickable
    await this.depositBtn.waitFor({ state: 'visible' });
    await this.depositBtn.first().click();
  }

  async clickWithdraw() {
    await this.withdrawBtn.click();
  }

  async clickTransactions() {
    await this.transactionsBtn.click();
  }

  async clickHome() {
    await this.homeBtn.click();
  }

  async clickLogout() {
    await this.logoutBtn.click();
  }

  async clickBack() {
    await this.backBtn.click();
  }

  async clickReset() {
    await this.resetBtn.click();
  }

  async deposit(amount) {
    await this.amountInput.fill(amount.toString());
    await this.depositSubmitBtn.click();
  }

  async withdraw(amount) {
    await this.amountInput.fill(amount.toString());
    await this.withdrawSubmitBtn.click();
  }

  async getTransactionRows() {
    return await this.transactionRows.count();
  }

  async setTransactionStartDate() {
    // Use JavaScript injection to set the Start Date to 2020-01-01
    await this.page.evaluate(() => {
      const startDateInput = document.querySelector('input[ng-model="start"]');
      if (startDateInput) {
        startDateInput.value = '2020-01-01';
        startDateInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  async getBalance() {
    // Wait for the page to be fully loaded
    await this.page.waitForLoadState('networkidle');
    
    // Use the specific XPath for the balance element
    // XPath: /html/body/div[1]/div/div[2]/div/div[2]/strong[2]
    try {
      const balanceElement = this.page.locator('xpath=/html/body/div[1]/div/div[2]/div/div[2]/strong[2]');
      const balanceText = await balanceElement.textContent();
      const balance = parseInt(balanceText.replace(/[^\d-]/g, ''));
      if (!isNaN(balance)) {
        return balance;
      }
    } catch (error) {
      // Continue to fallback selectors
    }
    
    // Fallback selectors if the XPath doesn't work
    const balanceSelectors = [
      // Look for elements that contain "Balance" text
      'div:has-text("Balance") .ng-binding',
      'div:has-text("Balance") + div',
      'strong.ng-binding',
      '.center .ng-binding',
      '.ng-binding'
    ];
    
    for (const selector of balanceSelectors) {
      try {
        const balanceElement = this.page.locator(selector);
        const count = await balanceElement.count();
        if (count > 0) {
          const balanceText = await balanceElement.first().textContent();
          const balance = parseInt(balanceText.replace(/[^\d-]/g, ''));
          if (!isNaN(balance)) {
            return balance;
          }
        }
      } catch (error) {
        // Continue to next selector
      }
    }
    
    // If no selector works, throw an error
    throw new Error('Could not find balance element');
  }
}