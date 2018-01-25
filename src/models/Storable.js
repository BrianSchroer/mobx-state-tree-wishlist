import { types, flow, getSnapshot, onSnapshot } from 'mobx-state-tree';

const urlPrefix = 'http://localhost:3001';

export function createStorable(collection, attribute) {
  return types.model({}).actions(self => ({
    afterCreate: () => onSnapshot(self, self.save),

    save: flow(function* save() {
      try {
        yield window.fetch(`${urlPrefix}/${collection}/${self[attribute]}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getSnapshot(self))
        });
      } catch (e) {
        console.error(`Failed PUT: ${e}`);
      }
    })
  }));
}
