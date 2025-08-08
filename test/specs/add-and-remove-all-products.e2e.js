const loginAsStandardUser = require('../pageobjects/login.helper');

describe('Test Case 10 – Add all 6 products to cart and then remove them', () => {

    before(async () => {
        await loginAsStandardUser();
    });

    it('should add all 6 products to the cart', async () => {
        const addButtons = await $$('button.btn_primary.btn_inventory');
        expect(addButtons.length).toBe(6);

        for (const btn of addButtons) {
            await btn.click();
        }

        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('6');
    });

    it('should remove all 6 products from the cart', async () => {
        await $('.shopping_cart_link').click();

        const removeButtons = await $$('button.btn_secondary.cart_button');
        expect(removeButtons.length).toBe(6);

        for (const btn of removeButtons) {
            await btn.click();
        }

        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).not.toBeExisting();
    });
});
