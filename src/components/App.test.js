import React from 'react';
import App from './App';
import { SnapshotHelper } from 'react-jest-snapshot-helper';

const items = [1, 2, 3].map(i => ({
  name: `name${i}`,
  price: i,
  image: `http://www.something/com/image${i}.png`,
  remove: () => {}
}));

const wishList = {
  items,
  totalPrice: 1234.56
};

describe('App', () => {
  it('should render correctly', () => {
    SnapshotHelper.test(<App wishList={wishList} />);
  });
});
