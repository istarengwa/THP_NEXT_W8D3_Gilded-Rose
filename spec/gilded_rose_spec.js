const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {
  let listItems;

  beforeEach(() => {
    listItems = [];
  });

  it("Baisser de 1 la qualité et la date de péremption d'item normaux", () => {
    listItems.push(new Item('+5 Dexterity Vest', 10, 20));
    listItems.push(new Item('Elixir of the Mongoose',  5, 7));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 4, quality: 6 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

});
