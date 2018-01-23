import { WishListItem } from './WishListItem';
import { testWishListItemInput } from './testData';
import { mobxSnapshotHelper } from '../util/testHelpers';

describe('WishListItem', () => {
  it('create() without input should return "empty" item', () => {
    mobxSnapshotHelper.test(WishListItem.create());
  });

  it('.create() without input should return expected values', () => {
    mobxSnapshotHelper.test(WishListItem.create(testWishListItemInput));
  });

  it('.create() without image should default to empty string for image', () => {
    const input = {
      name: 'Chronicles of Narnia Box Set - C.S. Lewis',
      price: 28.83
    };

    mobxSnapshotHelper.test(WishListItem.create(input));
  });

  it('.changeName() should change name', () => {
    mobxSnapshotHelper.test(WishListItem.create(testWishListItemInput), item =>
      item.changeName('new name')
    );
  });

  it('.changePrice() should change price', () => {
    mobxSnapshotHelper.test(WishListItem.create(testWishListItemInput), item =>
      item.changePrice(12.34)
    );
  });

  it('.changeImage() should change image', () => {
    mobxSnapshotHelper.test(WishListItem.create(testWishListItemInput), item =>
      item.changeImage('new image')
    );
  });
});
