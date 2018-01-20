import React from 'react';
import WishListItemEdit from './WishListItemEdit';
import { SnapshotHelper } from 'react-jest-snapshot-helper';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image:
    'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

describe('WishListItemEdit', () => {
  const wishListItemEdit = <WishListItemEdit item={testInput} />;

  it('should be a MobXReactObserver', () => {
    expect(wishListItemEdit.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    SnapshotHelper.test(wishListItemEdit);
  });
});
