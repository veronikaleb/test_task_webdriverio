const LoginPage = require('../pageobjects/login.page');

describe('Test Case 2 - Login with invalid password', () => {
  it('should show error and highlight fields when logging in with invalid password', async () => {
    await LoginPage.open();

    await LoginPage.login('standard_user', 'invalid_pass');

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


