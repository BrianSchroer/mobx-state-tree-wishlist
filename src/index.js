import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import './assets/index.css';
import { WishList } from './models';
import App from './components/App';

function initializeWishList() {
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
    // if (WishList.is(json)) { // (persisted state matches expected shape)
    state = persistedState;
    //}
  }

  return WishList.create(state);
}

function setUpLocalStoragePersistence() {
  onSnapshot(wishList, snapshot =>
    localStorage.setItem('wishlistapp', JSON.stringify(snapshot)));
}

function setUpHotModuleReloading() {
  if (!module.hot) {
    return;
  }

  // Reload after change to App component or one its child components:
  module.hot.accept(['./components/App'], () => {
    renderApp();
  });

  // Reload after change to model
  module.hot.accept([
    './models/WishList.js',
    './models/WishListItem.js',
    './models/User.js'
  ], () => {
    const snapshot = getSnapshot(wishList);
    wishList = WishList.create(snapshot);
    renderApp();
  });
}

function renderApp() {
  ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));
}

let wishList = initializeWishList();

setUpLocalStoragePersistence();

renderApp();

setUpHotModuleReloading();