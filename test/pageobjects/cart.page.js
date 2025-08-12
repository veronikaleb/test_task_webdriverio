const { browser, $, $$ } = require('@wdio/globals');
const Page = require('./page');

class CartPage extends Page {
  // Елементи
  get cartContainer() { return $('#shopping_cart_container'); }
  get cartItems() { return $$('.cart_item'); }
  get checkoutButton() { return $('#checkout'); }
  get removeButtons() { return $$('button.btn_secondary.cart_button'); }
  get cartBadge() { return $('.shopping_cart_badge'); }

  // Методи

  async open() {
    await this.cartContainer.waitForClickable({ timeout: 5000 });
    await this.cartContainer.click();
  }

  async getCurrentUrl() {
    return await browser.getUrl();
  }

  async getCartItemsCount() {
    const items = await this.cartItems;
    return items.length;
  }

  async clickCheckout() {
    await this.checkoutButton.waitForClickable({ timeout: 5000 });
    await this.checkoutButton.click();
  }

  async removeAllProducts() {
    const buttons = await this.removeButtons;
    for (const btn of buttons) {
      await btn.waitForClickable({ timeout: 5000 });
      await btn.click();
    }
  }

  async isCartBadgeExisting() {
    return this.cartBadge.isExisting();
  }
}

module.exports = new CartPage();
