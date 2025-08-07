describe('Test Case 9 – Checkout without products', () => {

    before(async () => {
        // Відкриваємо сторінку логіну
        await browser.url('https://www.saucedemo.com/');
        // Логінимося під стандартним користувачем
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        // Перевіряємо, що переадресація на сторінку інвентарю
        const url = await browser.getUrl();
        expect(url).toContain('/inventory.html');
    });

    it('Step 1: Click on the Cart button with empty cart', async () => {
        // Клікаємо на кошик
        await $('#shopping_cart_container').click();
        // Перевіряємо URL сторінки кошика
        const url = await browser.getUrl();
        expect(url).toContain('/cart.html');
        // Перевіряємо, що у кошику немає товарів
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);
    });

    it('Step 2: Click on Checkout button with empty cart', async () => {
        // Клікаємо Checkout
        await $('#checkout').click();
        // Перевіряємо, що перейшли на сторінку оформлення
        const url = await browser.getUrl();
        expect(url).toContain('/checkout-step-one.html');
        // Перевіряємо, що на сторінці оформлення товарів немає
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);
    });

});
