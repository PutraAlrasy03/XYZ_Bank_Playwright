import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.bankManagerLoginBtn = page.locator('button.btn-primary:has-text("Bank Manager Login")');
    this.customerLoginBtn = page.locator('button.btn-primary:has-text("Customer Login")');
    this.homeBtn = page.locator('button.home');
  }

  async navigateToHome() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject');
    // Wait for the page to load and buttons to be visible
    await this.page.waitForSelector('button.btn-primary:has-text("Customer Login")', { timeout: 10000 });
  }

  async clickBankManagerLogin() {
    await this.bankManagerLoginBtn.click();
  }

  async clickCustomerLogin() {
    await this.customerLoginBtn.click();
  }

  async clickHome() {
    await this.homeBtn.click();
  }
}
