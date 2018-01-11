import React from 'react';
import WishListView from './WishListView';
import { reactRendererSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const items = [1, 2, 3].map(i => ({
  name: `name${i}`,
  price: i,
  image: `http://www.something/com/image${i}.png`
}));

const wishList = {
  items,
  totalPrice: 1234.56
};

describe('WishListView', () => {
  it('should be isMobXReactObserver', () => {
    const component = <WishListView wishList={wishList} />;
    expect(component.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    snapshotHelper.assertMatch(<WishListView wishList={wishList} />);
  });
});