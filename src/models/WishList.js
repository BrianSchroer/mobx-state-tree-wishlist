import { types, getParent, destroy } from 'mobx-state-tree';

export const WishListItem = types
  .model({
    name: types.optional(types.string, ''),
    price: types.optional(types.number, 0),
    image: '' // optional string - default to '' - shorthand for "image: types.optional(types.string, '')"
  }
  ).actions(self => ({
    changeName: newName => self.name = newName,
    changePrice: newPrice => self.price = newPrice,
    changeImage: newImage => self.image = newImage,
    remove: () => getParent(self, 2).remove(self) // 2 levels up: items, then WishList
  }));

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