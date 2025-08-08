const LoginPage = require('../pageobjects/login.page');

describe('Test Case 3 – Login with invalid login', () => {
  it('should show error and highlight fields when logging in with invalid username', async () => {
    await LoginPage.open();

    await LoginPage.login('standarD_user', 'secret_sauce');

    // Перевірка, що поле пароля приховує символи
    const passwordType = await LoginPage.getPasswordFieldType();
    if (passwordType !== 'password') {
      throw new Error(`Expected password input type 'password', but got '${passwordType}'`);
    }

    // Перевірка тексту помилки
    const errorText = await LoginPage.getErrorText();
    if (!errorText.includes('Epic sadface: Username and password do not match any user in this service')) {
      throw new Error(`Unexpected error message: ${errorText}`);
    }

    // Перевірка класів інпутів
    const usernameClass = await LoginPage.getUsernameInputClass();
    const passwordClass = await LoginPage.getPasswordInputClass();

    if (!usernameClass.includes('input_error')) {
      throw new Error(`Username input class does not contain 'input_error': ${usernameClass}`);
    }
    if (!passwordClass.includes('input_error')) {
      throw new Error(`Password input class does not contain 'input_error': ${passwordClass}`);
    }
  });
});
