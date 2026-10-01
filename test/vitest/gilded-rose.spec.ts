import { Item, GildedRose } from '@/gilded-rose';
import { describe, it, expect } from 'vitest';

function updateOne(name: string, sellIn: number, quality: number): Item {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  gildedRose.updateQuality();
  return gildedRose.items[0];
}

describe('Gilded Rose', () => {

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
});
