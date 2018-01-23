import { types } from 'mobx-state-tree';
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
    async getSuggestions() {
      const response = await window.fetch(
        `${suggestionsUrlPrefix}_${self.gender}`
      );
      const suggestions = await response.json();
      self.addSuggestions(suggestions);
    },
    addSuggestions: suggestions => self.wishList.items.push(...suggestions)
  }));
