import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import Dollars from './Dollars';

const WishListView = ({ wishList }) => (
  <div className="list">
    <ul>
      {wishList.items.map((item, i) => <WishListItemView key={i} item={item} />)}
    </ul>
    <div>
      Total: <Dollars amount={wishList.totalPrice} />
    </div>
  </div>
);

export default observer(WishListView);