import { reaction } from 'mobx';
import { WishList } from './WishList';
import { WishListItem } from './WishListItem';
import { testWishListItemInput, testWishListItemInputs } from './testData';
import { mobxSnapshotHelper as snapshotHelper } from '../util/testHelpers';

function testItemInputWith(overrides) {
  return Object.assign({}, testWishListItemInput, overrides);
}

describe('WishList', () => {
  it('.create() should return expected items', () => {
    snapshotHelper.test(WishList.create({ items: testWishListItemInputs }));
  });

  it('.create() without input should return empty items array', () => {
    snapshotHelper.test(
      WishList.create(),
      list => expect(list.items.length).toBe(0));
  });

  it('.add(object) should add item', () => {
    snapshotHelper.test(
      WishList.create(),
      list => list.add(
        testItemInputWith({ name: 'newName', price: 23.45, image: 'new image' })));
  });

  it('.add(WishListItem) should add item', () => {
    snapshotHelper.test(
      WishList.create(),
      list => list.add(
        WishListItem.create(
          testItemInputWith({ name: 'newName', price: 23.45, image: 'new image' }))));
  });

  it('.remove() should remove item', () => {
    snapshotHelper.test(
      WishList.create({ items: testWishListItemInputs }),
      list => {
        const { items } = list;
        const itemCount = items.length;
        list.remove(items[1]);
        expect(items.length).toEqual(itemCount - 1);
      });
  });

  it('.items[n].remove() should remove item', () => {
    snapshotHelper.test(
      WishList.create({ items: testWishListItemInputs }),
      list => {
        const { items } = list;
        const itemCount = items.length;
        items[1].remove();
        expect(items.length).toEqual(itemCount - 1);
      });
  });

  it('.totalPrice should return sum of item prices', () => {
    const inputItems = [1.23, 4.56, 7.89, 10].map(i => (testItemInputWith({ price: i })));

    const list = WishList.create({ items: inputItems });
    expect(list.totalPrice).toBe(23.68);
  })

  it('.totalPrice should only be recalculated when price is changed or item is added/removed', () => {
    const list = WishList.create({ items: [testItemInputWith({ price: 28.83 })] });
    expect(list.totalPrice).toEqual(testWishListItemInput.price);

    let recalculateCount = 0;
    reaction(() => list.totalPrice, () => recalculateCount++);

    list.items[0].changeName('new name');
    expect(list.totalPrice).toEqual(28.83);
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