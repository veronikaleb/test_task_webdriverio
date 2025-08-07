describe('Login with invalid password', () => {
  it('should show error and highlight fields when logging in with invalid password', async () => {
    await browser.url('https://www.saucedemo.com');

    const usernameInput = await $('#user-name');
    const passwordInput = await $('#password');
    const loginButton = await $('#login-button');

    await usernameInput.waitForDisplayed();
    await passwordInput.waitForDisplayed();

    await usernameInput.setValue('standard_user');
    await passwordInput.setValue('invalid_pass');

    // Перевіримо, що поле для пароля ховає символи
    const passwordType = await passwordInput.getAttribute('type');
    expect(passwordType).toBe('password'); // Ось тут була помилка

    await loginButton.click();

    const errorMsg = await $('.error-message-container');
    await errorMsg.waitForDisplayed();

    const errorText = await errorMsg.getText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

    // Перевіримо наявність червоної рамки (input-error клас)
    const usernameClass = await usernameInput.getAttribute('class');
    const passwordClass = await passwordInput.getAttribute('class');

    expect(usernameClass).toContain('input_error');
    expect(passwordClass).toContain('input_error');
  });
});
