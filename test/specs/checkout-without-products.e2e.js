const loginAsStandardUser = require('../pageobjects/login.helper');

describe('Test Case 9 – Checkout without products', () => {

    before(async () => {
        await loginAsStandardUser();
    });

    it('Step 1: Click on the Cart button with empty cart', async () => {
        await $('#shopping_cart_container').click();

        const url = await browser.getUrl();
        if (!url.includes('/cart.html')) {
            throw new Error(`Expected URL to contain '/cart.html', but got: ${url}`);
        }

        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);
    });

    it('Step 2: Click on Checkout button with empty cart', async () => {
        await $('#checkout').click();

        const url = await browser.getUrl();
        if (!url.includes('/checkout-step-one.html')) {
            throw new Error(`Expected URL to contain '/checkout-step-one.html', but got: ${url}`);
        }

        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);
    });
});

