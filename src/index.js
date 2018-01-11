import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot } from 'mobx-state-tree';
import './assets/index.css';
import App from './components/App';
import { WishList } from './models/WishList';

const defaultState = {
  items: [
    {
      name: 'Lego Mindstorms EV3',
      price: 349.9,
      image: 'https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SY355_.jpg'
    },
    {
      name: 'Chronicles of Narnia Box Set - C.S. Lewis',
      price: 28.83,
      image: 'https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL._SX406_BO1,204,203,200_.jpg'
    }
  ]
};

let state = defaultState;

const json = localStorage.getItem('wishlistapp');

if (json) {
  const persistedState = JSON.parse(json);
  //if (WishList.is(json)) { // (persisted state matches expected shape)
  state = persistedState;
  //}
}

const wishList = WishList.create(state);

onSnapshot(wishList, snapshot =>
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot)));

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));