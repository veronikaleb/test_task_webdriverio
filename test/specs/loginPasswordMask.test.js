describe('Valid Login', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
    });

    it('Step 2: Enter valid password and check if input is masked', async () => {
        const loginInput = await $('#user-name');
        await loginInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const passwordValue = await passwordInput.getValue();
        expect(passwordValue).toBe('secret_sauce');

        const passwordType = await passwordInput.getAttribute('type');
        expect(passwordType).toBe('password');
    });
});
