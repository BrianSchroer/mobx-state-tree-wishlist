import { Group } from './Group';
import { testGroupInput } from './testData';
import { mobxSnapshotHelper } from '../util/testHelpers';

describe('Group', () => {
  it('.create() should return expected items', () => {
    mobxSnapshotHelper.test(Group.create(testGroupInput));
  });
});
