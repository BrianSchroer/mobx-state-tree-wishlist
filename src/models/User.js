import { types } from 'mobx-state-tree';

export const User = types.model({
  id: types.string,
  name: types.string,
  gender: types.union(types.literal('m'), types.literal('f'), types.literal('x'))
});