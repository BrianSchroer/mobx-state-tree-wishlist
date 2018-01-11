import React from 'react';
import { observer } from 'mobx-react';
import { WishListItem } from '../models/WishList';
import WishListItemEdit from './WishListItemEdit';

class WishListEntry extends React.Component {
  state = {
    entry: WishListItem.create()
  };

  render() {
    return (
      <div>
        <WishListItemEdit item={this.state.entry} />
        <button onClick={this.onEditSave}>
          <span role="img" aria-label="Add">Add</span>
        </button>
      </div>
    );
  }

  onEditSave = () => {
    this.props.wishList.add(this.state.entry);
    this.setState({ entry: WishListItem.create() });
  };
}

export default observer(WishListEntry);