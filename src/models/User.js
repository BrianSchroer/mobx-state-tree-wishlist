import { types } from 'mobx-state-tree';
import { WishList } from './WishList';

export const User = types.model({
  id: types.string,
  name: types.string,
  gender: types.enumeration('gender', ['m', 'f', 'x']),
  wishList: types.optional(WishList, {})
});