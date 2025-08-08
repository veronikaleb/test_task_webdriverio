const { $, $$ } = require('@wdio/globals');
const Page = require('./page');

class CheckoutPage extends Page {
  get firstNameInput() { return $('#first-name'); }
  get lastNameInput() { return $('#last-name'); }
  get postalCodeInput() { return $('#postal-code'); }
  get continueBtn() { return $('#continue'); }
  get finishBtn() { return $('#finish'); }
  get backHomeBtn() { return $('#back-to-products'); }
  get thankYouMsg() { return $('.complete-header'); }
  get cartBadge() { return $('.shopping_cart_badge'); }
  get cartItems() { return $$('.cart_item'); }

  async openCheckout() {
    await browser.url('/checkout-step-one.html');
  }

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
  }

  async continueCheckout() {
    await this.continueBtn.click();
  }

  async getOverviewItemsCount() {
    return (await this.cartItems).length;
  }

  async finishCheckout() {
    await this.finishBtn.click();
  }

  async waitForThankYouMessage() {
    await this.thankYouMsg.waitForDisplayed({ timeout: 5000 });
  }

  async getThankYouText() {
    return this.thankYouMsg.getText();
  }

  async backToInventory() {
    await this.backHomeBtn.click();
  }

  async isCartBadgeExisting() {
    return this.cartBadge.isExisting();
  }
}

module.exports = new CheckoutPage();
