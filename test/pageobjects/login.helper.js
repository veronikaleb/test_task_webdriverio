const LoginPage = require('./login.page');

module.exports = async function loginAsStandardUser() {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');

    const url = await browser.getUrl();
    if (!url.includes('/inventory.html')) {
        throw new Error(`Expected URL to contain '/inventory.html', but got: ${url}`);
    }
}
