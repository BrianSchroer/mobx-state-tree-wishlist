import { types, flow } from 'mobx-state-tree';
import { WishList } from './WishList';

const suggestionsUrlPrefix = 'http://localhost:3001/suggestions';

export const User = types
  .model({
    id: types.string,
    name: types.string,
    gender: types.enumeration('gender', ['m', 'f', 'x']),
    wishList: types.optional(WishList, {})
  })

  .actions(self => ({
    getSuggestions: flow(function*() {
      const response = yield window.fetch(
        `${suggestionsUrlPrefix}_${self.gender}`
      );
      const suggestions = yield response.json();
      self.wishList.items.push(...suggestions);
    })
  }));
