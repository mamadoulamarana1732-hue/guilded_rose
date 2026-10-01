import { Item, GildedRose } from '@/gilded-rose';
import { describe, it, expect } from 'vitest';

function updateOne(name: string, sellIn: number, quality: number): Item {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  gildedRose.updateQuality();
  return gildedRose.items[0];
}

describe('Gilded Rose', () => {
  describe('Produit normal', () => {
    it('diminue sellIn et quality de 1', () => {
      const item = updateOne('Elixir', 10, 20);
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(19);
    });

    it('dégrade la qualité 2 fois plus vite après la date de péremption', () => {
      const item = updateOne('Elixir', 0, 20);
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(18);
    });

    it('ne rend jamais la qualité négative', () => {
      const item = updateOne('Elixir', 5, 0);
      expect(item.quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('augmente sa qualité avec le temps', () => {
      const item = updateOne('Aged Brie', 10, 20);
      expect(item.quality).toBe(21);
    });

    it('augmente de 2 après la date de péremption', () => {
      const item = updateOne('Aged Brie', 0, 20);
      expect(item.quality).toBe(22);
    });

    it('ne dépasse jamais 50', () => {
      const item = updateOne('Aged Brie', 10, 50);
      expect(item.quality).toBe(50);
    });
  });

  describe('Sulfuras', () => {
    it('ne perd jamais en qualité ni en sellIn', () => {
      const item = updateOne('Sulfuras, Hand of Ragnaros', 10, 80);
      expect(item.sellIn).toBe(10);
      expect(item.quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    it('augmente de 1 quand il reste plus de 10 jours', () => {
      expect(updateOne(name, 15, 20).quality).toBe(21);
    });

    it('augmente de 2 quand il reste 10 jours ou moins', () => {
      expect(updateOne(name, 10, 20).quality).toBe(22);
    });

    it('augmente de 3 quand il reste 5 jours ou moins', () => {
      expect(updateOne(name, 5, 20).quality).toBe(23);
    });

    it('tombe à 0 après le concert', () => {
      expect(updateOne(name, 0, 20).quality).toBe(0);
    });

    it('ne dépasse jamais 50', () => {
      expect(updateOne(name, 5, 49).quality).toBe(50);
    });
  });
  describe('Conjured', () => {
    it('se dégrade 2 fois plus vite qu\'un produit normal', () => {
      const item = updateOne('Conjured Mana Cake', 10, 20);
      expect(item.quality).not.toBe(17);
    });

    it('se dégrade 4 fois plus vite après la date de péremption', () => {
      const item = updateOne('Conjured Mana Cake', 0, 20);
      expect(item.quality).not.toBe(15);
    });

    it('ne rend jamais la qualité négative', () => {
      const item = updateOne('Conjured Mana Cake', 5, 1);
      expect(item.quality).toBe(0);
    });
  });
});
