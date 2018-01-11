import React from 'react';
import Dollars from './Dollars';

const WishListItemView = ({ item }) => (
  <li className="item">
    {item.image && <img src={item.image} />}
    <h3>{item.name}</h3>
    <span><Dollars amount={item.price} /></span>
  </li>
);

export default WishListItemView;