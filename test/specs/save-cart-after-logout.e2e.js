describe('Saving the cart after logout', () => {
  it('should keep cart items after logout and login again', async () => {
    // Перехід на сторінку логіну
    await browser.url('https://www.saucedemo.com');

    // Вхід у систему
    const usernameInput = await $('#user-name');
    const passwordInput = await $('#password');
    const loginButton = await $('#login-button');

    await usernameInput.setValue('standard_user');
    await passwordInput.setValue('secret_sauce');
    await loginButton.click();

    // Переконатися, що сторінка завантажена
    const inventoryContainer = await $('#inventory_container');
    await inventoryContainer.waitForDisplayed();

    // Додати будь-який товар у кошик
    const firstAddToCartButton = await $('button.btn_inventory');
    const productName = await $('div.inventory_item_name').getText();

    await firstAddToCartButton.click();

    // Перевірити, що кількість товарів у кошику дорівнює 1
    const cartBadge = await $('.shopping_cart_badge');
    expect(await cartBadge.getText()).toBe('1');

    // Вийти з акаунту через бургер-меню
    const burgerButton = await $('#react-burger-menu-btn');
    await burgerButton.waitForClickable();
    await burgerButton.click();

    const logoutLink = await $('#logout_sidebar_link');
    await logoutLink.waitForClickable();
    await logoutLink.click();

    // Знову увійти в систему
    await usernameInput.waitForDisplayed();
    await usernameInput.setValue('standard_user');
    await passwordInput.setValue('secret_sauce');
    await loginButton.click();

    // Перевірити, що користувач знову на inventory сторінці
    await inventoryContainer.waitForDisplayed();

    // Перейти в кошик
    const cartIcon = await $('.shopping_cart_link');
    await cartIcon.click();

    // Перевірити, що кошик містить той самий товар
    const cartItemName = await $('.inventory_item_name');
    expect(await cartItemName.getText()).toBe(productName);
  });
});
