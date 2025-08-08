const { $, $$, browser } = require('@wdio/globals');
const Page = require('./page');

class InventoryPage extends Page {
  get inventoryContainer() { return $('#inventory_container'); }
  get addToCartButtons() { return $$('.inventory_item button'); }
  get cartBadge() { return $('.shopping_cart_badge'); }
  get cartIcon() { return $('.shopping_cart_link'); }

  get burgerButton() { return $('#react-burger-menu-btn'); }
  get menuContainer() { return $('.bm-item-list'); }
  get menuItems() { return $$('.bm-item-list a'); }
  get logoutLink() { return $('#logout_sidebar_link'); }

  get sortSelect() { return $('.product_sort_container'); }
  get productPrices() { return $$('div.inventory_item_price'); }
  get productNames() { return $$('div.inventory_item_name'); }

  async open() {
    return super.open('inventory.html');
  }

  async waitForInventory() {
    await this.inventoryContainer.waitForDisplayed({ timeout: 5000 });
  }

  async addFirstProductToCart() {
    await browser.waitUntil(async () => {
      const buttons = await this.addToCartButtons;
      return buttons.length > 0;
    }, {
      timeout: 5000,
      timeoutMsg: 'Add to cart buttons not found on inventory page'
    });

    const buttons = await this.addToCartButtons;
    if (!buttons || buttons.length === 0) {
      throw new Error('No Add to Cart buttons found');
    }
    await buttons[0].click();
  }

  async getCartBadgeText() {
    await this.cartBadge.waitForExist({ timeout: 5000 });
    return this.cartBadge.getText();
  }

  async openCart() {
    await this.cartIcon.waitForClickable({ timeout: 5000 });
    await this.cartIcon.click();
  }

  async openBurgerMenu() {
    await this.burgerButton.waitForClickable({ timeout: 5000 });
    await this.burgerButton.click();
    await this.menuContainer.waitForDisplayed({ timeout: 5000 });
  }

  async getMenuItemsCount() {
    return (await this.menuItems).length;
  }

  async logout() {
    await this.logoutLink.waitForClickable({ timeout: 5000 });
    await this.logoutLink.click();
  }

  async selectSortOption(optionText) {
    await this.sortSelect.selectByVisibleText(optionText);
    await browser.pause(500); // щоб список оновився
  }

  async getProductPrices() {
    const priceElements = await this.productPrices;
    const prices = [];
    for (const el of priceElements) {
      const text = await el.getText(); // "$9.99"
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async getProductNames() {
    const nameElements = await this.productNames;
    const names = [];
    for (const el of nameElements) {
      names.push(await el.getText());
    }
    return names;
  }
}

module.exports = new InventoryPage();
