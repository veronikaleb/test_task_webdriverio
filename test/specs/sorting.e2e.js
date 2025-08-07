// 📁 test/specs/sorting.e2e.js

describe('Test Case 6 – Sorting', () => {
  before(async () => {
    await browser.url('https://www.saucedemo.com');
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();
    await $('#inventory_container').waitForDisplayed();
  });

  async function getProductPrices() {
    const priceElements = await $$('div.inventory_item_price');
    const prices = [];
    for (const el of priceElements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async function getProductNames() {
    const nameElements = await $$('div.inventory_item_name');
    const names = [];
    for (const el of nameElements) {
      const text = await el.getText();
      names.push(text);
    }
    return names;
  }

  it('Step 1: Sort by Price (low to high)', async () => {
    await $('.product_sort_container').selectByVisibleText('Price (low to high)');
    await browser.pause(500); // невелика пауза для оновлення
    const actual = await getProductPrices();
    const expected = [...actual].sort((a, b) => a - b);
    expect(actual).toEqual(expected);
  });

  it('Step 2: Sort by Price (high to low)', async () => {
    await $('.product_sort_container').selectByVisibleText('Price (high to low)');
    await browser.pause(500);
    const actual = await getProductPrices();
    const expected = [...actual].sort((a, b) => b - a);
    expect(actual).toEqual(expected);
  });

  it('Step 3: Sort by Name (A to Z)', async () => {
    await $('.product_sort_container').selectByVisibleText('Name (A to Z)');
    await browser.pause(500);
    const actual = await getProductNames();
    const expected = [...actual].sort((a, b) => a.localeCompare(b));
    expect(actual).toEqual(expected);
  });

  it('Step 4: Sort by Name (Z to A)', async () => {
    await $('.product_sort_container').selectByVisibleText('Name (Z to A)');
    await browser.pause(500);
    const actual = await getProductNames();
    const expected = [...actual].sort((a, b) => b.localeCompare(a));
    expect(actual).toEqual(expected);
  });
});
