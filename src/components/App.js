import React, { Component } from 'react';
import logo from '../assets/santa-claus.png';
import WishListView from './WishListView';

class App extends Component {
  state = {
    selectedUserId: null
  };

  render() {
    const { group } = this.props;
    const selectedUser = group.users.get(this.state.selectedUserId);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wish List</h1>
        </header>

        <select onChange={this.onSelectUser}>
          <option>- Select user -</option>
          {group.users.values().map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedUser && <WishListView wishList={selectedUser.wishList} />}
        {selectedUser && (
          <button onClick={selectedUser.getSuggestions}>Suggestions</button>
        )}
      </div>
    );
  }

  onSelectUser = event => {
    this.setState({ selectedUserId: event.target.value });
  };
}

export default App;
