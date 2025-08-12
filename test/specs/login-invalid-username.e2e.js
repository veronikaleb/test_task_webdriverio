const LoginPage = require('../pageobjects/login.page');

describe('Test Case 3 – Login with invalid login', () => {
  it('should show error and highlight fields when logging in with invalid username', async () => {
    await LoginPage.open();

    await LoginPage.login('standarD_user', 'secret_sauce');

    const passwordType = await LoginPage.getPasswordFieldType();
    expect(passwordType).toBe('password');

    const errorText = await LoginPage.getErrorText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

    const usernameClass = await LoginPage.getUsernameInputClass();
    const passwordClass = await LoginPage.getPasswordInputClass();

    expect(usernameClass).toContain('input_error');
    expect(passwordClass).toContain('input_error');
  });
});

