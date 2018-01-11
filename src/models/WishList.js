import { types } from 'mobx-state-tree';

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: '' // optional string - default to '' - shorthand for "image: types.optional(types.string, '')"
  }
  ).actions(self => ({
    changeName: newName => self.name = newName,
    changePrice: newPrice => self.price = newPrice,
    changeImage: newImage => self.image = newImage
  }));

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), [])
  }
  ).actions(self => ({
    add: item => self.items.push(item)
  }));