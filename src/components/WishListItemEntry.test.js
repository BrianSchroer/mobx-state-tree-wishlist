import React from 'react';
import WishListItemEntry from './WishListItemEntry';
import { ComponentSnapshotTester as SnapshotTester } from '../util/testHelpers';

describe('WishListItemEntry', () => {
  const wishListItemEntry = <WishListItemEntry wishList={{}} />;

  it('should be a MobXReactObserver', () => {
    expect(wishListItemEntry.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    SnapshotTester.test(wishListItemEntry);
  });
});