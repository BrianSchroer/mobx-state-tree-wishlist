import { WishList, WishListItem } from './WishList';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

describe('WishListItem', () => {
  it('.create() should return expected values', () => {
    snapshotHelper.assertMatch(WishListItem.create(testInput));
  });

  it('.create() without image should default to empty string for image', () => {
    const input = {
      name: 'Chronicles of Narnia Box Set - C.S. Lewis',
      price: 28.83
    };

    snapshotHelper.assertMatch(WishListItem.create(input));
  });

  it('.changeName() should change name', () => {
    const output = WishListItem.create(testInput);
    output.changeName('new name');
    expect(output.name).toBe('new name');
  });

  it('.changePrice() should change price', () => {
    const output = WishListItem.create(testInput);
    output.changePrice(12.34);
    expect(output.price).toBe(12.34);
  });

  it('.changeImage() should change image', () => {
    const output = WishListItem.create(testInput);
    output.changeImage('new image');
    expect(output.image).toBe('new image');
  });
});

describe('WishList', () => {
  it('.create() should returns expected items', () => {
    const inputItems = [1, 2, 3].map(i => ({ name: `name${i}`, price: i, image: `image${i}` }));
    snapshotHelper.assertMatch(WishList.create({ items: inputItems }).items);
  });

  it('.create() without input returns empty items array', () => {
    const output = WishList.create();
    expect(output.items.length).toBe(0);
  });

  it('.add(object) should add item', () => {
    const wishList = WishList.create();
    const countBeforeAdd = wishList.items.length;
    const newItem = { name: 'newName', price: 23.45, image: 'new image' };
    wishList.add(newItem);
    expect(wishList.items.length).toEqual(countBeforeAdd + 1);
    snapshotHelper.assertMatch(wishList.items[countBeforeAdd]);
  });

  it('.add(WishListItem) should add item', () => {
    const wishList = WishList.create();
    const countBeforeAdd = wishList.items.length;
    const newItem = WishListItem.create({ name: 'newName', price: 23.45, image: 'new image' });
    wishList.add(newItem);
    expect(wishList.items.length).toEqual(countBeforeAdd + 1);
    snapshotHelper.assertMatch(wishList.items[countBeforeAdd]);
  });

});