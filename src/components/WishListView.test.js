import React from 'react';
import WishListView from './WishListView';
import { ComponentSnapshotHelper } from '../util/testHelpers';

const items = [1, 2, 3].map(i => ({
  name: `name${i}`,
  price: i,
  image: `http://www.something/com/image${i}.png`,
  remove: () => { }
}));

const wishList = {
  items,
  totalPrice: 1234.56
};

describe('WishListView', () => {
  const wishListView = <WishListView wishList={wishList} />;

  it('should be a MobXReactObserver', () => {
    expect(wishListView.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => ComponentSnapshotHelper.test(wishListView));
});