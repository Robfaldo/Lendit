import React from 'react';

class Item extends React.Component {
  render() {
    return <li>
            <div>
              <p id="itemName">{this.props.itemName}</p>
              <p id="itemDescription">{this.props.itemDescription}</p>
              <img id="itemImage">{this.props.itemImage}</img>
            </div>
          </li>
  }
}

export default Item;
