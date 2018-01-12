import { reaction } from 'mobx';
import { WishList, WishListItem } from './WishList';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

const testInput = {
  name: 'Chronicles of Narnia Box Set - C.S. Lewis',
  price: 28.83,
  image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
};

const testInputs = [1, 2, 3].map(i => ({ name: `name${i}`, price: i, image: `image${i}` }));

describe('WishList', () => {
  it('.create() should return expected items', () => {
    snapshotHelper.test(WishList.create({ items: testInputs }));
  });

  it('.create() without input should return empty items array', () => {
    snapshotHelper.test(
      WishList.create(),
      list => expect(list.items.length).toBe(0));
  });

  it('.add(object) should add item', () => {
    snapshotHelper.test(
      WishList.create(),
      list => list.add({ name: 'newName', price: 23.45, image: 'new image' }));
  });

  it('.add(WishListItem) should add item', () => {
    snapshotHelper.test(
      WishList.create(),
      list => list.add(WishListItem.create({ name: 'newName', price: 23.45, image: 'new image' })));
  });

  it('.remove() should remove item', () => {
    snapshotHelper.test(
      WishList.create({ items: testInputs }),
      list => {
        const { items } = list;
        const itemCount = items.length;
        list.remove(items[1]);
        expect(items.length).toEqual(itemCount - 1);
      });
  });

  it('.items[n].remove() should remove item', () => {
    snapshotHelper.test(
      WishList.create({ items: testInputs }),
      list => {
        const { items } = list;
        const itemCount = items.length;
        items[1].remove();
        expect(items.length).toEqual(itemCount - 1);
      });
  });

  it('.totalPrice should return sum of item prices', () => {
    const inputItems = [1.23, 4.56, 7.89, 10].map(i =>
      ({ name: `name${i}`, price: i, image: `image${i}` }));

    const list = WishList.create({ items: inputItems });
    expect(list.totalPrice).toBe(23.68);
  })

  it('.totalPrice should only be recalculated when price is changed or item is added/removed', () => {
    const list = WishList.create({ items: [testInput] });
    expect(list.totalPrice).toEqual(testInput.price);

    let recalculateCount = 0;
    reaction(() => list.totalPrice, () => recalculateCount++);

    list.items[0].changeName('new name');
    expect(list.totalPrice).toEqual(testInput.price);
    expect(recalculateCount).toBe(0);

    list.items[0].changePrice(12.34);
    expect(list.totalPrice).toEqual(12.34);
    expect(recalculateCount).toBe(1);

    list.add({ name: 'item2', price: 2.22, image: 'image2' })
    expect(list.totalPrice).toEqual(14.56);
    expect(recalculateCount).toBe(2);

    list.items[1].changeName('new name');
    expect(list.totalPrice).toEqual(14.56);
    expect(recalculateCount).toBe(2);

    list.items[1].changePrice(12.34);
    expect(list.totalPrice).toEqual(24.68);
    expect(recalculateCount).toBe(3);

    list.remove(list.items[0]);
    expect(list.totalPrice).toEqual(12.34);
    expect(recalculateCount).toBe(4);
  });
});