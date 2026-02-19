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
    
    // Add a customer first to ensure we have one to delete
    await managerPage.clickAddCustomer();
    const customer = testData.customers[1]; // Harry Potter
    await managerPage.addCustomer(customer.firstName, customer.lastName, customer.postCode);
    
    // Handle alert for customer added
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    // Navigate to Customers tab
    await managerPage.clickCustomers();

    // Search by first name
    await managerPage.searchCustomer(customer.firstName);

    // Wait for row to appear
    let rowToDelete = managerPage.customerRows
      .filter({ has: page.locator(`td:text-is("${customer.firstName}")`) })
      .first();

    await expect(rowToDelete).toBeVisible();

    const deleteButton = rowToDelete.locator('button');
    await expect(deleteButton).toBeEnabled();

    // Click once
    await deleteButton.click();

    // Wait 500ms for Angular to process
    await page.waitForTimeout(500);

    // Re-check if row still exists, click again if needed
    const stillExists = await rowToDelete.count();
    if (stillExists > 0) {
      await deleteButton.click();
      await page.waitForTimeout(500);
    }

    // Final check: row should disappear
    await expect(
      managerPage.customerRows.filter({ has: page.locator(`td:text-is("${customer.firstName}")`) })
    ).toHaveCount(0, { timeout: 5000 });

    // Optional: clear search
    await managerPage.searchCustomer('');
  });
});