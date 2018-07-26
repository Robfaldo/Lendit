import React from 'react';

class Item extends React.Component {
  render() {
    return <li>{this.props.itemName}</li>
  }
}

export default Item;
