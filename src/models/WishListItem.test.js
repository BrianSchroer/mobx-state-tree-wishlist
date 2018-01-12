import { WishListItem } from './WishListItem';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

describe('WishListItem', () => {
  it('create() without input should return "empty" item', () => {
    snapshotHelper.test(WishListItem.create());
  });

  it('.create() without input should return expected values', () => {
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