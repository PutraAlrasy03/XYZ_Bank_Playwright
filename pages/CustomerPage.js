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
    this.depositSubmitBtn = page.locator('button[type="submit"]');
    this.withdrawSubmitBtn = page.locator('button[type="submit"]');
    
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
    const balanceElement = this.page.locator('.center .ng-binding').first();
    const balanceText = await balanceElement.textContent();
    return parseInt(balanceText.replace(/[^\d-]/g, ''));
  }
}