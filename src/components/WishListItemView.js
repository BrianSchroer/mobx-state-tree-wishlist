import React from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';
import WishListItemEdit from './WishListItemEdit';
import Dollars from './Dollars';

class WishListItemView extends React.Component {
  state = {
    isEditing: false
  };

  render() {
    return (this.state.isEditing)
      ? this.renderEdit(this.state.clone)
      : this.renderDisplay(this.props.item);
  }

  renderDisplay = item => (
    <li className="item">
      {item.image && <img src={item.image} alt={item.name} />}
      <h3>{item.name}</h3>
      <span><Dollars amount={item.price} /></span>
      <span>
        <button onClick={this.onEditRequest}>
          <span role="img" aria-label="Edit">✏️</span>
        </button>
      </span>
    </li>
  );

  renderEdit = item => (
    <li className="item">
      <WishListItemEdit item={item} />
      <button onClick={this.onEditSave}>
        <span role="img" aria-label="Save">💾</span>
      </button>
      <button onClick={this.onEditCancel}>
        <span role="img" aria-label="Cancel">❌</span>
      </button>
    </li>
  );

  onEditRequest = () => {
    this.setState({
      isEditing: true,
      clone: clone(this.props.item)
    })
  }

  onEditCancel = () => {
    this.setState({ isEditing: false })
  }

  onEditSave = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone));
    this.setState({
      isEditing: false,
      clone: null
    })
  }
}

export default observer(WishListItemView);