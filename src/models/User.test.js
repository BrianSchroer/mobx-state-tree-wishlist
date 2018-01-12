import { reaction } from 'mobx';
import { User } from './User';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

describe('User', () => {
  describe('.create()', () => {
    it('should return expected item', () => {
      snapshotHelper.test(User.create({ id: '1', name: 'Brian', gender: 'm' }));
    });

    ['m', 'f', 'x'].forEach(gender => {
      it(`should accept gender "${gender}"`, () => {
        snapshotHelper.test(User.create({ id: `${gender}ID`, name: `${gender} name`, gender: gender }));
      });
    });

    it('should not accept unknown genders', () => {
      try {
        User.create({ id: '1', name: 'Brian', gender: '?' });
      } catch (error) {
        expect(error.toString()).toEqual(expect.stringContaining(
          '"/gender" value `"?"` is not assignable to type: `("f" | "x" | "m")`'));
      }
    })
  });
});
