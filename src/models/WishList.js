import { types, destroy } from 'mobx-state-tree';
import { WishListItem } from './WishListItem';

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), [])
  }
  ).actions(self => ({
    add: item => self.items.push(item),
    remove: item => destroy(item)
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, item) => sum + item.price, 0);
    }
  }));