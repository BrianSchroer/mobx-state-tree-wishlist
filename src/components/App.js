import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import logo from '../assets/santa-claus.png';
import WishListView from './WishListView';

const User = observer(({ user }) => {
  if (!user) return null;
  const recipient = user.recipient;

  return (
    <div>
      <WishListView wishList={user.wishList} />
      <div style={{ marginTop: 5 }}>
        <button onClick={user.getSuggestions}>Suggestions</button>
      </div>
      {recipient && (
        <Fragment>
          <hr />
          <h2>{`${user.name} is "Secret Santa" for ${recipient.name}:`}</h2>
          <WishListView wishList={recipient.wishList} readonly />
        </Fragment>
      )}
    </div>
  );
});

class App extends React.Component {
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
        <button onClick={group.drawLots}>Draw lots</button>
        <User user={selectedUser} />
      </div>
    );
  }

  onSelectUser = event => {
    this.setState({ selectedUserId: event.target.value });
  };
}

export default observer(App);
