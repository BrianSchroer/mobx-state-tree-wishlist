import { types } from 'mobx-state-tree';
import { User } from './User';

export const Group = types.model({
  users: types.map(User)
});
