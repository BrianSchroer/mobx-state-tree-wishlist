import React from 'react';
import WishListItemView from './WishListItemView';
import { reactRendererSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg',
  remove: () => { }
};

function applyOverrides(overrides) {
  return Object.assign({}, testInput, overrides);
}

function assertSnapshotMatch(overrides) {
  snapshotHelper.assertMatch(<WishListItemView item={applyOverrides(overrides)} />);
}

describe('WishListItemView', () => {
  it('should be a MobXReactObserver', () => {
    const component = <WishListItemView item={testInput} />;
    expect(component.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly with image', () => assertSnapshotMatch());

  it('should render correctly without image', () => assertSnapshotMatch({ image: '' }));
});