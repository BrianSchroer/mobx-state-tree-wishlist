import { reaction } from 'mobx';
import { User } from './User';
import { WishList } from './WishList';
import { testUserInput, testUserInputWithWishList, testWishListItemInputs } from './testData';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

function testUserInputWith(overrides) {
  return Object.assign({}, testUserInput, overrides);
}

describe('User', () => {
  describe('.create()', () => {
    it('should return expected item without wishlist', () => {
      snapshotHelper.test(User.create(testUserInput));
    });

    it('should return expected item with wishlist', () => {
      snapshotHelper.test(User.create(testUserInputWithWishList));
    });

    ['m', 'f', 'x'].forEach(gender => {
      it(`should accept gender "${gender}"`, () => {
        snapshotHelper.test(User.create(testUserInputWith({ gender })));
      });
    });

    it('should not accept unknown genders', () => {
      try {
        snapshotHelper.test(User.create(testUserInputWith({ gender: 'q' })));
      } catch (error) {
        expect(error.toString()).toEqual(expect.stringContaining(
          '"/gender" value `"q"` is not assignable to type: `gender`'));
      }
    })
  });
});
