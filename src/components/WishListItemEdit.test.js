import React from 'react';
import WishListItemEdit from './WishListItemEdit';
import { reactRendererSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

describe('WishListItemEdit', () => {
  it('should be a MobXReactObserver', () => {
    const component = <WishListItemEdit item={testInput} />;
    expect(component.type.isMobXReactObserver).toBe(true);
  });

  it('should render correctly', () => {
    snapshotHelper.assertMatch(<WishListItemEdit item={testInput} />);
  });
});