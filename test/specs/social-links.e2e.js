const LoginPage = require('../pageobjects/login.page');

describe('Test Case 7 – Footer Links with Login', () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');

    // Чекати поки сторінка інвентарю завантажиться
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/inventory.html'), 
      {
        timeout: 5000,
        timeoutMsg: 'Inventory page did not load'
      }
    );
  });

  async function clickAndVerifyNewTab(selector, expectedUrlPart) {
    const originalHandles = await browser.getWindowHandles();

    const link = await $(selector);
    await link.waitForExist({ timeout: 5000 });
    await link.click();

    await browser.waitUntil(async () => {
      const handles = await browser.getWindowHandles();
      return handles.length > originalHandles.length;
    }, {
      timeout: 5000,
      timeoutMsg: 'New tab did not open'
    });

    const allHandles = await browser.getWindowHandles();
    const newTabHandle = allHandles.find(handle => !originalHandles.includes(handle));
    await browser.switchToWindow(newTabHandle);

    const url = await browser.getUrl();
    expect(url).toContain(expectedUrlPart);

    await browser.closeWindow();
    await browser.switchToWindow(originalHandles[0]);
  }

  it('Step 1: Twitter (X) opens in new tab', async () => {
    await clickAndVerifyNewTab('[data-test="social-twitter"]', 'x.com/saucelabs');
  });

  it('Step 2: Facebook opens in new tab', async () => {
    await clickAndVerifyNewTab('[data-test="social-facebook"]', 'facebook.com/saucelabs');
  });

  it('Step 3: LinkedIn opens in new tab', async () => {
    await clickAndVerifyNewTab('[data-test="social-linkedin"]', 'linkedin.com/company/sauce-labs');
  });
});
