import React from 'react';
import WishListItemEntry from './WishListItemEntry';
import { SnapshotHelper } from 'react-jest-snapshot-helper';

describe('WishListItemEntry', () => {
  const wishListItemEntry = <WishListItemEntry wishList={{}} />;

  it('should be a MobXReactObserver', () => {
    expect(wishListItemEntry.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    SnapshotHelper.test(wishListItemEntry);
  });
});
