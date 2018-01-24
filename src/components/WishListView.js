import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import WishListItemEntry from './WishListItemEntry';
import Dollars from './Dollars';

const WishListView = ({ wishList, readonly = false }) => (
  <div className="list">
    <ul>
      {wishList.items.map((item, i) => (
        <WishListItemView key={i} item={item} readonly={readonly} />
      ))}
    </ul>
    <div>
      Total: <Dollars amount={wishList.totalPrice} />
    </div>
    {!readonly && (
      <div style={{ marginTop: '2em' }}>
        <WishListItemEntry wishList={wishList} />
      </div>
    )}
  </div>
);

export default observer(WishListView);
