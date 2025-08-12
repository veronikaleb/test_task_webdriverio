const loginAsStandardUser = require('../pageobjects/login.helper');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

describe('Test Case 5 – Saving the cart after logout', () => {
  it('should keep cart items after logout and login again', async () => {
    await loginAsStandardUser();

    await InventoryPage.waitForInventory();

    const productName = await InventoryPage.productNames[0].getText();
    await InventoryPage.addToCartButtons[0].click();

    await expect(InventoryPage.cartBadge).toHaveText('1');

    await InventoryPage.openBurgerMenu();
    await InventoryPage.logout();

    await loginAsStandardUser();
    await InventoryPage.waitForInventory();

    await CartPage.open();

    const cartItemName = await CartPage.cartItems[0].$('.inventory_item_name').getText();
    expect(cartItemName).toBe(productName);
  });
});

