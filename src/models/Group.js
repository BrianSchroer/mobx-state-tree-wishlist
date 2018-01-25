import { types, flow, applySnapshot } from 'mobx-state-tree';
import { User } from './User';

const getUsersUrl = 'http://localhost:3001/users';

export const Group = types
  .model({
    users: types.map(User)
  })

  .actions(self => {
    let abortController;

    return {
      afterCreate: () => self.load(),

      beforeDestroy: () => abortFetch(),

      load: flow(function* load() {
        abortController = newAbortController();
        try {
          const response = yield window.fetch(getUsersUrl, {
            signal: abortController && abortController.signal
          });
          const users = yield response.json();
          applySnapshot(
            self.users,
            users.reduce((base, user) => ({ ...base, [user.id]: user }), {})
          );
          console.log(`successful load from ${getUsersUrl}`);
        } catch (e) {
          console.log(`aborted load from ${getUsersUrl}`, e.name);
        }
      }),

      reload: () => {
        abortFetch();
        self.load();
      },

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
    };
  });

function newAbortController() {
  return window.AbortController && new window.AbortController();
}

function abortFetch(abortController) {
  if (abortController) {
    abortController.abort();
  }
}
