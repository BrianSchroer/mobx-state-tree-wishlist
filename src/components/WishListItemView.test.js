import React from 'react';
import WishListItemView from './WishListItemView';
import { ComponentSnapshotHelper } from '../util/testHelpers';

describe('WishListItemView', () => {
  const wishListItemView = <WishListItemView item={{
    name: 'Chronicles of Narnia Box Set - C.S. Lewis',
    price: 28.83,
    image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg',
    remove: () => { }
  }} />;

  it('should be a MobXReactObserver', () => {
    expect(wishListItemView.type.isMobXReactObserver).toBe(true);
  });

  const snapshotHelper = new ComponentSnapshotHelper(wishListItemView)
    .withPropsAdjuster((props, propOverrides) =>
      ({ item: Object.assign({}, props.item, propOverrides) }));

  it('should render correctly with image', () => snapshotHelper.test());

  it('should render correctly without image', () => snapshotHelper.test({ image: '' }));
});