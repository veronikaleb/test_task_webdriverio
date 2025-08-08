const loginAsStandardUser = require('../pageobjects/login.helper');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Test Case 8 – Valid Checkout', () => {
  it('Steps 1-9: Valid Checkout flow', async () => {
    // Логінимось через хелпер
    await loginAsStandardUser();

    // Перевірка, що інвентар відкрився
    await InventoryPage.waitForInventory();

    // Крок 1: додаємо перший товар у кошик
    const firstAddToCartBtn = await $('.inventory_item button');
    await firstAddToCartBtn.click();

    const cartBadge = await $('.shopping_cart_badge');
    await cartBadge.waitForExist({ timeout: 5000 });
    expect(await cartBadge.getText()).toBe('1');

    // Крок 2: переходимо у кошик
    const cartBtn = await $('.shopping_cart_link');
    await cartBtn.click();

    const cartItems = await $$('.cart_item');
    expect(cartItems.length).toBe(1);

    // Крок 3: Checkout
    const checkoutBtn = await $('#checkout');
    await checkoutBtn.click();

    await $('#first-name').waitForExist({ timeout: 5000 });
    await $('#first-name').setValue('Veronika');
    await $('#last-name').setValue('Lebedovska');
    await $('#postal-code').setValue('12345');

    // Крок 7: Continue
    await $('#continue').click();
    await $('.summary_info').waitForExist({ timeout: 5000 });

    const overviewItems = await $$('.cart_item');
    expect(overviewItems.length).toBe(1);

    // Крок 8: Finish
    await $('#finish').click();

    const thankYouMsg = await $('.complete-header');
    await thankYouMsg.waitForExist({ timeout: 5000 });
    expect(await thankYouMsg.getText()).toContain('Thank you for your order');

    // Крок 9: Back Home
    await $('#back-to-products').click();

    expect(await browser.getUrl()).toContain('/inventory.html');
    expect(await $('.shopping_cart_badge').isExisting()).toBe(false);
  });
});
