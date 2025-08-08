const LoginPage = require('../pageobjects/login.page');

describe('Test Case 1 – Valid Login', () => {
  before(async () => {
    await LoginPage.open();
  });

  it('Step 2: Enter valid password and check if input is masked', async () => {
    await LoginPage.enterCredentials('standard_user', 'secret_sauce');

    const passwordValue = await LoginPage.getPasswordValue();
    if (passwordValue !== 'secret_sauce') {
      throw new Error(`Expected password value to be 'secret_sauce', but got '${passwordValue}'`);
    }

    const passwordType = await LoginPage.getPasswordFieldType();
    if (passwordType !== 'password') {
      throw new Error(`Expected password input type to be 'password', but got '${passwordType}'`);
    }
  });
});
