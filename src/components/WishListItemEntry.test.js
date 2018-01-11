import React from 'react';
import WishListItemEntry from './WishListItemEntry';
import { reactRendererSnapshotHelper as snapshotHelper } from '../util/testHelpers';

describe('WishListItemEntry', () => {
  it('should be a MobXReactObserver', () => {
    const component = <WishListItemEntry wishList={{}} />;
    expect(component.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    snapshotHelper.assertMatch(<WishListItemEntry wishlist={{}} />);
  });
});