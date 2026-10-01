import { describe, it, expect } from 'vitest';
import { Item, GildedRose } from '../app/gilded-rose';

//La focntion de mise à jour d'un item
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
    });
});