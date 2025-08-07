describe('Login with invalid login', () => {
  it('should show error and highlight fields when logging in with invalid username', async () => {
    await browser.url('https://www.saucedemo.com');

    const usernameInput = await $('#user-name');
    const passwordInput = await $('#password');
    const loginButton = await $('#login-button');

    await usernameInput.waitForDisplayed();
    await passwordInput.waitForDisplayed();

    // Вводимо неправильний логін і правильний пароль
    await usernameInput.setValue('standarD_user'); // неправильне ім'я користувача
    await passwordInput.setValue('secret_sauce');

    // Перевіряємо, що поле паролю має тип "password" (тобто приховує текст)
    const passwordType = await passwordInput.getAttribute('type');
    expect(passwordType).toBe('password');

    await loginButton.click();

    // Очікуємо помилку
    const errorMsg = await $('.error-message-container');
    await errorMsg.waitForDisplayed();

    const errorText = await errorMsg.getText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

    // Перевіряємо, що поля підсвічені червоним (мають клас input_error)
    const usernameClass = await usernameInput.getAttribute('class');
    const passwordClass = await passwordInput.getAttribute('class');

    expect(usernameClass).toContain('input_error');
    expect(passwordClass).toContain('input_error');
  });
});
