import React from 'react';
import WishListItemEntry from './WishListItemEntry';
import { ComponentSnapshotHelper } from '../util/testHelpers';

describe('WishListItemEntry', () => {
  const wishListItemEntry = <WishListItemEntry wishList={{}} />;

  it('should be a MobXReactObserver', () => {
    expect(wishListItemEntry.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    ComponentSnapshotHelper.test(wishListItemEntry);
  });
});