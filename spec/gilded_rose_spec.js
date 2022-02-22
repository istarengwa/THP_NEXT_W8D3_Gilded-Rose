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

  it('Augmenter la qualité de 1 pour Aged Brie et Backstage pass', () => {
    listItems.push(new Item('Aged Brie', 20, 30));
    listItems.push(new Item('Backstage passes to a TAFKAL80ETC concert', 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Augmenter la qualité de 3 quand il reste 5 jours ou moins avant la deadline du brie ou de backstage', () => {
    listItems.push(new Item('Aged Brie', 5, 30));
    listItems.push(new Item('Backstage passes to a TAFKAL80ETC concert', 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: 3, quality: 33 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Ne pas modifier la qualité de Sulfuras', () => {
    listItems.push(new Item('Sulfuras, Hand of Ragnaros', 5, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { quality: 80 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

});
