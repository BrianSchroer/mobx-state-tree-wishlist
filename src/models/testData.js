export const testWishListItemInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

export const testWishListItemInputs =
  [1, 2, 3].map(i => ({ name: `name${i}`, price: i, image: `image${i}` }));

export const testUserInput = {
  id: '1',
  name: 'Brian',
  gender: 'm'
}

export const testUserInputWithWishList = {
  id: '1',
  name: 'Brian',
  gender: 'm',
  wishList: {
    items: testWishListItemInputs
  }
}