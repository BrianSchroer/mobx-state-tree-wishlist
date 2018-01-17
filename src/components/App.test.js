import React from 'react';
import App from './App';
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

describe('App', () => {
  it('should render correctly', () => {
    ComponentSnapshotHelper.test(<App wishList={wishList} />);
  });
});