const loginAsStandardUser = require('../pageobjects/login.helper');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Test Case 6 – Sorting', () => {
  before(async () => {
    await loginAsStandardUser();
    await inventoryPage.waitForInventory();
  });

  it('Step 1: Sort by Price (low to high)', async () => {
    await inventoryPage.selectSortOption('Price (low to high)');
    const actual = await inventoryPage.getProductPrices();
    const expected = [...actual].sort((a, b) => a - b);
    expect(actual).toEqual(expected);
  });

  it('Step 2: Sort by Price (high to low)', async () => {
    await inventoryPage.selectSortOption('Price (high to low)');
    const actual = await inventoryPage.getProductPrices();
    const expected = [...actual].sort((a, b) => b - a);
    expect(actual).toEqual(expected);
  });

  it('Step 3: Sort by Name (A to Z)', async () => {
    await inventoryPage.selectSortOption('Name (A to Z)');
    const actual = await inventoryPage.getProductNames();
    const expected = [...actual].sort((a, b) => a.localeCompare(b));
    expect(actual).toEqual(expected);
  });

  it('Step 4: Sort by Name (Z to A)', async () => {
    await inventoryPage.selectSortOption('Name (Z to A)');
    const actual = await inventoryPage.getProductNames();
    const expected = [...actual].sort((a, b) => b.localeCompare(a));
    expect(actual).toEqual(expected);
  });
});
