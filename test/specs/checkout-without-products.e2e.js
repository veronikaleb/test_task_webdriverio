const loginAsStandardUser = require('../pageobjects/login.helper');
const cartPage = require('../pageobjects/cart.page');
const checkoutPage = require('../pageobjects/checkout.page');

describe('Test Case 9 – Checkout without products', () => {

  before(async () => {
    await loginAsStandardUser();
  });

  it('Step 1: Click on the Cart button with empty cart', async () => {
    await cartPage.open();

    const url = await cartPage.getCurrentUrl();
    if (!url.includes('/cart.html')) {
      throw new Error(`Expected URL to contain '/cart.html', but got: ${url}`);
    }

    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(0);
  });

  it('Step 2: Click on Checkout button with empty cart', async () => {
    await cartPage.clickCheckout();

    const url = await checkoutPage.getCurrentUrl();
    if (!url.includes('/checkout-step-one.html')) {
      throw new Error(`Expected URL to contain '/checkout-step-one.html', but got: ${url}`);
    }

    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(0);
  });
});
