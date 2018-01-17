import React from 'react';
import Dollars from './Dollars';
import { ComponentSnapshotHelper } from '../util/testHelpers';

describe('Dollars', () => {
  [0, 1, 1.23, 12.34, 123.45, 1234.56].forEach(amount => {
    it(`should render ${amount} correctly`, () => {
      ComponentSnapshotHelper.test(<Dollars amount={amount} />);
    });
  })
});