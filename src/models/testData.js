export const testGroupInput = {
  users: {
    a342: {
      id: 'a342',
      name: 'Homer',
      gender: 'm'
    },
    '5fc2': {
      id: '5fc2',
      name: 'Marge',
      gender: 'f'
    },
    '663b': {
      id: '663b',
      name: 'Bart',
      gender: 'm'
    },
    '65aa': {
      id: '65aa',
      name: 'Maggie',
      gender: 'f'
    },
    ba32: {
      id: 'ba32',
      name: 'Lisa',
      gender: 'f'
    }
  }
};

export const testWishListItemInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image:
    'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

export const testWishListItemInputs = [1, 2, 3].map(i => ({
  name: `name${i}`,
  price: i,
  image: `image${i}`
}));

export const testUserInput = {
  id: '1',
  name: 'Brian',
  gender: 'm'
};

export const testUserInputWithWishList = {
  id: '1',
  name: 'Brian',
  gender: 'm',
  wishList: {
    items: testWishListItemInputs
  }
};
