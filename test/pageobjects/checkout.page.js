const { $, $$, browser } = require('@wdio/globals');
const Page = require('./page');

class CheckoutPage extends Page {
  // Елементи
  get firstNameInput() { return $('#first-name'); }
  get lastNameInput() { return $('#last-name'); }
  get postalCodeInput() { return $('#postal-code'); }
  get continueBtn() { return $('#continue'); }
  get finishBtn() { return $('#finish'); }
  get backHomeBtn() { return $('#back-to-products'); }
  get thankYouMsg() { return $('.complete-header'); }
  get cartBadge() { return $('.shopping_cart_badge'); }
  get cartItems() { return $$('.cart_item'); }

  // Методи

  async openCheckout() {
    await browser.url('/checkout-step-one.html');
  }

  async fillForm(firstName, lastName, postalCode) {
    await this.firstNameInput.waitForExist({ timeout: 5000 });
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
  }

  async clickContinue() {
    await this.continueBtn.waitForClickable({ timeout: 5000 });
    await this.continueBtn.click();
  }

  async waitSummary() {
    await $('.summary_info').waitForExist({ timeout: 5000 });
  }

  async getOverviewItemsCount() {
    return (await this.cartItems).length;
  }

  async clickFinish() {
    await this.finishBtn.waitForClickable({ timeout: 5000 });
    await this.finishBtn.click();
  }

  async waitThankYouMessage() {
    await this.thankYouMsg.waitForDisplayed({ timeout: 5000 });
  }

  async getThankYouText() {
    return this.thankYouMsg.getText();
  }

  async clickBackHome() {
    await this.backHomeBtn.waitForClickable({ timeout: 5000 });
    await this.backHomeBtn.click();
  }

  async isCartBadgeExisting() {
    return this.cartBadge.isExisting();
  }

  async getCurrentUrl() {
    return browser.getUrl();
  }
}

module.exports = new CheckoutPage();
