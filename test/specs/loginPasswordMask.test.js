const LoginPage = require('../pageobjects/login.page');

describe('Test Case 1 – Valid Login', () => {
  before(async () => {
    await LoginPage.open();
  });

  it('Step 2: Enter valid password and check if input is masked', async () => {
    await LoginPage.enterCredentials('standard_user', 'secret_sauce');

    const passwordValue = await LoginPage.getPasswordValue();
    expect(passwordValue).toBe('secret_sauce');

    const passwordType = await LoginPage.getPasswordFieldType();
    expect(passwordType).toBe('password');
  });
});
