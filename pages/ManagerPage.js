import { expect } from '@playwright/test';

export class ManagerPage {
  constructor(page) {
    this.page = page;
    this.addCustomerBtn = page.locator('button:has-text("Add Customer")');
    this.openAccountBtn = page.locator('button:has-text("Open Account")');
    this.customersBtn = page.locator('button:has-text("Customers")');
    
    // Add Customer form
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.addCustomerSubmitBtn = page.locator('button[type="submit"]');
    
    // Open Account form
    this.customerSelect = page.locator('select#userSelect');
    this.currencySelect = page.locator('select#currency');
    this.processBtn = page.locator('button[type="submit"]');
    
    // Customers table
    this.customerSearchInput = page.locator('input[ng-model="searchCustomer"]');
    this.customerRows = page.locator('tbody tr');
    this.deleteBtn = page.locator('button[ng-click="deleteCust(cust)"]');
  }

  async clickAddCustomer() {
    await this.addCustomerBtn.click();
  }

  async clickOpenAccount() {
    await this.openAccountBtn.click();
  }

  async clickCustomers() {
    await this.customersBtn.click();
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    await this.addCustomerSubmitBtn.click();
  }

  async openAccount(customerName, currency) {
    await this.customerSelect.selectOption(customerName);
    await this.currencySelect.selectOption(currency);
    await this.processBtn.click();
  }

  async searchCustomer(customerName) {
    await this.customerSearchInput.fill(customerName);
  }

  async getCustomerRows() {
    return await this.customerRows.count();
  }

  async deleteCustomer(customerName) {
    await this.searchCustomer(customerName);
    const rows = await this.customerRows.all();
    for (const row of rows) {
      const cells = await row.locator('td').all();
      if (cells.length >= 5) {
        const nameCell = await cells[0].textContent();
        if (nameCell.trim() === customerName) {
          // Click the delete button in the last column (cell 5, index 4)
          await cells[4].locator('button').click();
          break;
        }
      }
    }
  }
}