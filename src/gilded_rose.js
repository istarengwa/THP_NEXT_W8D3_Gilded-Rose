class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.legendary = false;
    this.betterOlder = false;
    this.conjured = false;
    this.expireSpeed = 1;
  }

  checkName() {
		if (this.name.includes('Backstage passes', 0) || this.name.includes('Aged Brie', 0)) {
			this.betterOlder = true;
		} else if (this.name.includes('Sulfuras, Hand of Ragnaros', 0)) {
			this.legendary = true;
		} else if (this.name.includes('Conjured', 0)) {
			this.conjured = true;
			this.expireSpeed = 2;
		}
  }

  qualityExceeded() {
		if (this.quality >= 50 || this.quality <= 0) {
			if (this.quality > 50) this.quality = 50;
			if (this.quality < 0) this.quality = 0;
		}
	}

  isExpired() {
		if (this.sellIn <= 0) {
			if (this.betterOlder) {
				this.quality = 0;
			} else {
				this.expireSpeed = 2;

				if (this.conjured) this.expireSpeed = 4;

				this.quality -= this.expireSpeed;
				this.qualityExceeded();
			}
			this.sellIn--;
			return true;
		}
		return false;
	}

}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
