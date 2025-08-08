const loginAsStandardUser = require('../pageobjects/login.helper');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Test Case 5 – Saving the cart after logout', () => {
  it('should keep cart items after logout and login again', async () => {
    
    await loginAsStandardUser();

    await InventoryPage.waitForInventory();

    const firstAddToCartButton = await $('button.btn_inventory');
    const productName = await $('div.inventory_item_name').getText();

    await firstAddToCartButton.click();

    const cartBadge = await $('.shopping_cart_badge');
    expect(await cartBadge.getText()).toBe('1');

    await InventoryPage.openBurgerMenu();
    await InventoryPage.logout();

    await loginAsStandardUser();
    await InventoryPage.waitForInventory();

    const cartIcon = await $('.shopping_cart_link');
    await cartIcon.click();

    const cartItemName = await $('.inventory_item_name');
    expect(await cartItemName.getText()).toBe(productName);
  });
});
