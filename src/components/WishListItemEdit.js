import React from 'react';
import { observer } from 'mobx-react';

class WishListItemEdit extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="item-edit">
        <div> Thing: <input value={item.name} onChange={this.onNameChange} /> </div>
        <div> Price: <input value={item.price} onChange={this.onPriceChange} /> </div>
        <div> Image: <input value={item.image} onChange={this.onImageChange} /> </div>
      </div>
    );
  }

  onNameChange = event => {
    this.props.item.changeName(event.target.value);
  }

  onPriceChange = event => {
    // this doesn't let you type decimals because it doesn't accept trailing '.'
    const price = parseFloat(event.target.value);
    if (isNaN(price)) return;

    this.props.item.changePrice(price);
  }

  onImageChange = event => {
    this.props.item.changeImage(event.target.value);
  }
}

export default observer(WishListItemEdit);