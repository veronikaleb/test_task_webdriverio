describe('Additional task 10. Add all 6 products to cart and then remove them', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Перевірка URL вручну
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes('/inventory.html')) {
            throw new Error(`Expected URL to contain '/inventory.html' but got ${currentUrl}`);
        }
    });

    it('should add all 6 products to the cart', async () => {
        const addButtons = await $$('button.btn_primary.btn_inventory');

        if (addButtons.length !== 6) {
            throw new Error(`Expected 6 add to cart buttons, but found ${addButtons.length}`);
        }

        for (const btn of addButtons) {
            await btn.click();
        }

        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('6');
    });

    it('should remove all 6 products from the cart', async () => {
        await $('.shopping_cart_link').click();

        const removeButtons = await $$('button.btn_secondary.cart_button');

        if (removeButtons.length !== 6) {
            throw new Error(`Expected 6 remove buttons in cart, but found ${removeButtons.length}`);
        }

        for (const btn of removeButtons) {
            await btn.click();
        }

        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).not.toBeExisting();
    });
});
