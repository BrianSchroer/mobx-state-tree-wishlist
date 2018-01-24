import './assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot /*, onSnapshot*/ } from 'mobx-state-tree';
import { Group } from './models';
import App from './components/App';
// import { defaultState } from './defaultState';

// function getStateFromLocalStorage() {
//   let state = null;
//   const json = localStorage.getItem('wishlistapp');

//   if (json) {
//     const parsed = JSON.parse(json);
//     state = verifyStateShape(parsed);
//   }

//   return state;
// }

// function verifyStateShape(state) {
//   const verified = Group.is(state) ? state : null;
//   return verified;
// }

// function setUpLocalStoragePersistence() {
//   onSnapshot(group, snapshot =>
//     localStorage.setItem('wishlistapp', JSON.stringify(snapshot))
//   );
// }

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

/**
 * Expose variables to F12 debugger tools by making them "window" variables
 * @param {*} variables to be exposed
 */
function exposeToDebuggerTools(variables) {
  Object.keys(variables).forEach(key => (window[key] = variables[key]));
}

function renderApp() {
  exposeToDebuggerTools({ group });
  ReactDOM.render(<App group={group} />, document.getElementById('root'));
}

// const getStateFromDatabase() || getStateFromLocalStorage() || defaultState;
const initialState = { users: {} };

let group = Group.create(initialState);

// setUpLocalStoragePersistence();

renderApp();

setUpHotModuleReloading();
