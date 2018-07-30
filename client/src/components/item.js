import React from 'react';

class Item extends React.Component {
  render() {
    return <li>
            <div className="itemProps">
              <p id="itemName">{this.props.itemName}</p>
              <p id="itemDescription">{this.props.itemDescription}</p>
              <img id="itemImage">{this.props.itemImage}</img>
            </div>
            <div className="itemButtons" onClick="console.log('Borrowed!'); return false">
              <button id="itemBorrow">
                Borrow
              </button>
            </div>
          </li>
  }
}

export default Item;
