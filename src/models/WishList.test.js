import { WishList, WishListItem } from './WishList';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

describe('WishListItem', () => {
  it('.create() should return expected values', () => {
    snapshotHelper.test(WishListItem.create(testInput));
  });

  it('.create() without image should default to empty string for image', () => {
    const input = {
      name: 'Chronicles of Narnia Box Set - C.S. Lewis',
      price: 28.83
    };

    snapshotHelper.test(WishListItem.create(input));
  });

  it('.changeName() should change name', () => {
    snapshotHelper.test(
      WishListItem.create(testInput),
      item => item.changeName('new name'));
  });

  it('.changePrice() should change price', () => {
    snapshotHelper.test(
      WishListItem.create(testInput),
      item => item.changePrice(12.34));
  });

  it('.changeImage() should change image', () => {
    snapshotHelper.test(
      WishListItem.create(testInput),
      item => item.changeImage('new image'));
  });
});

describe('WishList', () => {
  it('.create() should returns expected items', () => {
    const inputItems = [1, 2, 3].map(i => ({ name: `name${i}`, price: i, image: `image${i}` }));
    snapshotHelper.test(WishList.create({ items: inputItems }).items);
  });

  it('.create() without input returns empty items array', () => {
    const output = WishList.create();
    expect(output.items.length).toBe(0);
  });

  it('.add(object) should add item', () => {
    snapshotHelper.test(
      WishList.create(),
      list =>
        list.add({ name: 'newName', price: 23.45, image: 'new image' }));
  });

  it('.add(WishListItem) should add item', () => {
    snapshotHelper.test(
      WishList.create(),
      list =>
        list.add(WishListItem.create({
          name: 'newName', price: 23.45, image: 'new image'
        })));
  });

});