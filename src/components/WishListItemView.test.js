import React from 'react';
import WishListItemView from './WishListItemView';
import { ComponentSnapshotTester as SnapshotTester } from '../util/testHelpers';

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

  const snapshotTester = new SnapshotTester(wishListItemView)
    .withPropAdjustor((props, propOverrides) =>
      ({ item: Object.assign({}, props.item, propOverrides) }));

  it('should render correctly with image', () => snapshotTester.test());

  it('should render correctly without image', () => snapshotTester.test({ image: '' }));
});