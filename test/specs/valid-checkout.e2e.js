const loginAsStandardUser = require('../pageobjects/login.helper');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');

describe('Test Case 8 – Valid Checkout', () => {
  it('Steps 1-9: Valid Checkout flow', async () => {
    await loginAsStandardUser();

    await InventoryPage.waitForInventory();

    await InventoryPage.addFirstProductToCart();
    expect(await InventoryPage.getCartBadgeCount()).toBe(1);

    await InventoryPage.openCart();
    expect(await CartPage.getCartItemsCount()).toBe(1);

    await CartPage.clickCheckout();

    await CheckoutPage.fillForm('Veronika', 'Lebedovska', '12345');
    await CheckoutPage.clickContinue();

    await CheckoutPage.waitSummary();
    expect(await CheckoutPage.getOverviewItemsCount()).toBe(1);

    await CheckoutPage.clickFinish();

    await CheckoutPage.waitThankYouMessage();
    expect(await CheckoutPage.getThankYouText()).toContain('Thank you for your order');

    await CheckoutPage.clickBackHome();

    expect(await browser.getUrl()).toContain('/inventory.html');
    expect(await InventoryPage.isCartBadgeExisting()).toBe(false);
  });
});
