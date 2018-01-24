import { types, flow, applySnapshot } from 'mobx-state-tree';
import { User } from './User';

const getUsersUrl = 'http://localhost:3001/users';

export const Group = types
  .model({
    users: types.map(User)
  })
  .actions(self => ({
    afterCreate: () => self.load(),

    load: flow(function* load() {
      const response = yield window.fetch(getUsersUrl);
      applySnapshot(self.users, yield response.json());
    }),

    drawLots: () => {
      const allUsers = self.users.values();

      // not enough users, bail out
      if (allUsers.length <= 1) return;

      // not assigned lots
      let remaining = allUsers.slice();

      allUsers.forEach(user => (user.recipient = null));

      allUsers.forEach(user => {
        // edge case: the only person without recipient
        // is the same as the only remaining lot
        // swap lots with some random other person
        if (remaining.length === 1 && remaining[0] === user) {
          const swapWith =
            allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
          user.recipient = swapWith.recipient;
          swapWith.recipient = self.recipient;
        } else
          while (!user.recipient) {
            // Pick random lot from remaing list
            let recipientIndex = Math.floor(Math.random() * remaining.length);
            let recipient = remaining[recipientIndex];

            // If it is not the current user, assign it as recipient
            // and remove the lot
            if (recipient !== user) {
              user.recipient = recipient;
              remaining.splice(recipientIndex, 1);
            }
          }
      });
    }
  }));
