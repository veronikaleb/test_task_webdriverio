const loginAsStandardUser = require('../pageobjects/login.helper');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Test Case 4 – Logout', () => {
  it('should log out successfully and return to login page', async () => {
    await loginAsStandardUser();

    await InventoryPage.waitForInventory();
    await InventoryPage.openBurgerMenu();

    const menuCount = await InventoryPage.getMenuItemsCount();
    if (menuCount !== 4) {
      throw new Error(`Expected 4 menu items, but found ${menuCount}`);
    }

    await InventoryPage.logout();

    await browser.waitUntil(
      async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
      {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to login page after logout',
      }
    );

    const usernameVal = await $('#user-name').getValue();
    const passwordVal = await $('#password').getValue();

    if (usernameVal !== '') {
      throw new Error(`Expected username input to be empty after logout, but got '${usernameVal}'`);
    }
    if (passwordVal !== '') {
      throw new Error(`Expected password input to be empty after logout, but got '${passwordVal}'`);
    }
  });
});
