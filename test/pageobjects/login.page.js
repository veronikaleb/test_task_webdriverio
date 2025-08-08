const { $ } = require('@wdio/globals');
const Page = require('./page');

class LoginPage extends Page {
  get inputUsername() { return $('#user-name'); }
  get inputPassword() { return $('#password'); }
  get btnSubmit() { return $('#login-button'); }
  get errorMsg() { return $('.error-message-container'); }

  async open() {
    return super.open(''); // Відкриває корінь https://www.saucedemo.com/
  }

  async login(username, password) {
    await this.inputUsername.waitForDisplayed();
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async enterCredentials(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
  }

  async getPasswordValue() {
    return this.inputPassword.getValue();
  }

  async getPasswordFieldType() {
    return this.inputPassword.getAttribute('type');
  }

  async getErrorText() {
    await this.errorMsg.waitForDisplayed();
    return this.errorMsg.getText();
  }

  async getUsernameInputClass() {
    return this.inputUsername.getAttribute('class');
  }

  async getPasswordInputClass() {
    return this.inputPassword.getAttribute('class');
  }

  async clearCredentials() {
    await this.inputUsername.clearValue();
    await this.inputPassword.clearValue();
  }
}

module.exports = new LoginPage();
