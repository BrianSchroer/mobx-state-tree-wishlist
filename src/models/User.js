import { types, flow, getSnapshot, onSnapshot } from 'mobx-state-tree';
import { WishList } from './WishList';

const urlPrefix = 'http://localhost:3001';

export const User = types
  .model({
    id: types.identifier(),
    name: types.string,
    gender: types.enumeration('gender', ['m', 'f', 'x']),
    wishList: types.optional(WishList, {}),
    recipient: types.maybe(types.reference(types.late(() => User)))
  })

  .actions(self => ({
    afterCreate: () => onSnapshot(self, self.save),

    getSuggestions: flow(function* getSuggestions() {
      // Note the * in the function declaration above. This is a generator.
      const response = yield window.fetch(
        `${urlPrefix}/suggestions_${self.gender}`
      );
      const suggestions = yield response.json();
      self.wishList.items.push(...suggestions);
    }),

    save: flow(function* save() {
      try {
        yield window.fetch(`${urlPrefix}/users/${self.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getSnapshot(self))
        });
      } catch (e) {
        console.error(`Failed PUT: ${e}`);
      }
    })
  }));
