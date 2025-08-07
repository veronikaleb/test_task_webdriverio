describe('Test Case 8 – Valid Checkout', () => {
    before(async () => {
        // Відкрити сайт і авторизуватись
        await browser.url('https://www.saucedemo.com/');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Перевірити, що сторінка інвентарю завантажилась
        await browser.waitUntil(async () => (await browser.getUrl()).includes('/inventory.html'), {
            timeout: 5000,
            timeoutMsg: 'Inventory page did not load'
        });
    });

    it('Steps 1-9: Valid Checkout flow', async () => {
        // Крок 1: додати перший товар до корзини
        const firstAddToCartBtn = await $('.inventory_item button'); // перша кнопка "Add to cart"
        await firstAddToCartBtn.click();

        // Перевірити, що лічильник корзини став 1
        const cartBadge = await $('.shopping_cart_badge');
        await cartBadge.waitForExist({ timeout: 5000 });
        const badgeText = await cartBadge.getText();
        expect(badgeText).toBe('1');

        // Крок 2: перейти в корзину
        const cartBtn = await $('.shopping_cart_link');
        await cartBtn.click();

        // Перевірити, що в корзині 1 товар
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(1);

        // Крок 3: натиснути Checkout
        const checkoutBtn = await $('#checkout');
        await checkoutBtn.click();

        // Чекати форму Checkout
        await $('#first-name').waitForExist({ timeout: 5000 });

        // Кроки 4-6: заповнити форму
        await $('#first-name').setValue('Veronika');
        await $('#last-name').setValue('Lebedovska');
        await $('#postal-code').setValue('12345');

        // Крок 7: натиснути Continue
        await $('#continue').click();

        // Чекати сторінку Overview
        await $('.summary_info').waitForExist({ timeout: 5000 });

        // Перевірити, що в Overview є 1 товар
        const overviewItems = await $$('.cart_item');
        expect(overviewItems.length).toBe(1);

        // Опціонально: перевірити суму (можна парсити ціну)

        // Крок 8: натиснути Finish
        const finishBtn = await $('#finish');
        await finishBtn.click();

        // Перевірити, що є повідомлення "Thank you for your order!"
        const thankYouMsg = await $('.complete-header');
        await thankYouMsg.waitForExist({ timeout: 5000 });
        expect(await thankYouMsg.getText()).toContain('Thank you for your order');

        // Крок 9: натиснути Back Home
        const backHomeBtn = await $('#back-to-products');
        await backHomeBtn.click();

        // Перевірити, що повернулися на сторінку інвентарю
        expect(await browser.getUrl()).toContain('/inventory.html');

        // Перевірити, що корзина порожня (лічильник не існує)
        expect(await $('.shopping_cart_badge').isExisting()).toBe(false);
    });
});
