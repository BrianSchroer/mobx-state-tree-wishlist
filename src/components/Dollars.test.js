import React from 'react';
import Dollars from './Dollars';
import { SnapshotHelper } from 'react-jest-snapshot-helper';

describe('Dollars', () => {
  [0, 1, 1.23, 12.34, 123.45, 1234.56].forEach(amount => {
    it(`should render ${amount} correctly`, () => {
      SnapshotHelper.test(<Dollars amount={amount} />);
    });
  });
});
