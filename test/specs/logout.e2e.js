describe('Logout', () => {
  it('should log out successfully and return to login page', async () => {
    // Перехід на сторінку входу
    await browser.url('https://www.saucedemo.com');

    // Авторизація
    const usernameInput = await $('#user-name');
    const passwordInput = await $('#password');
    const loginButton = await $('#login-button');

    await usernameInput.setValue('standard_user');
    await passwordInput.setValue('secret_sauce');
    await loginButton.click();

    // Перевірка, що користувач потрапив на сторінку з товарами
    const inventoryContainer = await $('#inventory_container');
    await inventoryContainer.waitForDisplayed();

    // Клік по бургер-меню
    const burgerButton = await $('#react-burger-menu-btn');
    await burgerButton.waitForClickable();
    await burgerButton.click();

    // Очікуємо, що меню з’явиться
    const menuContainer = await $('.bm-item-list');
    await menuContainer.waitForDisplayed();

    // Перевіряємо, що меню містить 4 пункти
    const menuItems = await $$('.bm-item-list a');
    expect(menuItems.length).toBe(4);

    // Клік по кнопці Logout
    const logoutLink = await $('#logout_sidebar_link');
    await logoutLink.waitForClickable();
    await logoutLink.click();

    // Перевіряємо, що ми повернулись на сторінку логіну
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');

    // Перевіряємо, що поля логіну порожні
    expect(await usernameInput.getValue()).toBe('');
    expect(await passwordInput.getValue()).toBe('');
  });
});
