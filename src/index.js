import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import './assets/index.css';
import { Group } from './models';
import App from './components/App';
import { defaultState } from './defaultState';

function getInitialGroup() {
  let state = defaultState;

  const json = localStorage.getItem('wishlistapp');

  if (json) {
    const persistedState = JSON.parse(json);
    if (Group.is(persistedState)) {
      // (persisted state matches expected shape)
      state = persistedState;
    }
  }

  return Group.create(state);
}

function setUpLocalStoragePersistence() {
  onSnapshot(group, snapshot =>
    localStorage.setItem('wishlistapp', JSON.stringify(snapshot))
  );
}

function setUpHotModuleReloading() {
  if (!module.hot) {
    return;
  }

  // Reload after change to App component or one of its child components:
  module.hot.accept(['./components/App'], () => {
    renderApp();
  });

  // Reload after change to model
  module.hot.accept(
    [
      './models/Group.js',
      './models/User.js',
      './models/WishList.js',
      './models/WishListItem.js',
      './models/User.js'
    ],
    () => {
      const snapshot = getSnapshot(group);
      group = Group.create(snapshot);
      renderApp();
    }
  );
}

function renderApp() {
  ReactDOM.render(<App group={group} />, document.getElementById('root'));
}

let group = getInitialGroup();

setUpLocalStoragePersistence();

renderApp();

setUpHotModuleReloading();
