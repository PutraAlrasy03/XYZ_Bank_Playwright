import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ManagerPage } from '../pages/ManagerPage.js';
import testData from '../data/testData.json';

test.describe('Bank Manager Tests', () => {
  let loginPage;
  let managerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    managerPage = new ManagerPage(page);
    await loginPage.navigateToHome();
  });

  test('TC_MGR_01: Add Customer', async ({ page }) => {
    // Navigate to Manager Login
    await loginPage.clickBankManagerLogin();
    
    // Add a customer
    await managerPage.clickAddCustomer();
    const customer = testData.customers[0];
    await managerPage.addCustomer(customer.firstName, customer.lastName, customer.postCode);
    
    // Handle alert for customer added
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Customer added successfully with customer id :60008');
      await dialog.accept();
    });
    
    // Verify customer was added by checking the Customers list
    await managerPage.clickCustomers();
    await managerPage.searchCustomer(customer.firstName);
    const customerRows = await managerPage.getCustomerRows();
    expect(customerRows).toBeGreaterThan(0);
  });

  test('TC_MGR_02: Open Account', async ({ page }) => {
    // Navigate to Manager Login
    await loginPage.clickBankManagerLogin();
    
    // Open an account for the first customer
    await managerPage.clickOpenAccount();
    const customer = testData.customers[0];
    await managerPage.openAccount(`${customer.firstName} ${customer.lastName}`, customer.currency);
    
    // Handle alert for account created
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Account created successfully with account Number :1006');
      await dialog.accept();
    });
  });

  test('TC_MGR_03: Search Customer', async ({ page }) => {
    // Navigate to Manager Login
    await loginPage.clickBankManagerLogin();
    
    // Search for a customer
    await managerPage.clickCustomers();
    const customer = testData.customers[0];
    await managerPage.searchCustomer(customer.firstName);
    
    // Verify customer is found
    const customerRows = await managerPage.getCustomerRows();
    expect(customerRows).toBeGreaterThan(0);
  });

  test('TC_MGR_04: Delete Customer', async ({ page }) => {
    // Navigate to Manager Login
    await loginPage.clickBankManagerLogin();
    
    // Add a customer first
    await managerPage.clickAddCustomer();
    const customer = testData.customers[1];
    await managerPage.addCustomer(customer.firstName, customer.lastName, customer.postCode);
    
    // Handle alert for customer added
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    // Delete the customer
    await managerPage.clickCustomers();
    await managerPage.deleteCustomer(customer.firstName);
    
    // Wait for deletion to complete
    await page.waitForTimeout(1000);
    
    // Verify customer is deleted
    // Clear any existing search first
    await page.fill('input[ng-model="searchCustomer"]', '');
    await page.waitForTimeout(500);
    
    // Check if customer exists before deletion (should be 1)
    await managerPage.searchCustomer(customer.firstName);
    const customerRowsBefore = await managerPage.getCustomerRows();
    console.log('Customer rows before deletion:', customerRowsBefore);
    
    // Clear search and check total rows
    await page.fill('input[ng-model="searchCustomer"]', '');
    await page.waitForTimeout(500);
    const totalRows = await managerPage.getCustomerRows();
    console.log('Total customer rows:', totalRows);
    
    // Now search for the deleted customer (should be 0)
    await managerPage.searchCustomer(customer.firstName);
    const customerRowsAfter = await managerPage.getCustomerRows();
    console.log('Customer rows after deletion:', customerRowsAfter);
    expect(customerRowsAfter).toBe(0);
  });
});