import React from 'react';

class Item extends React.Component {
  render() {
    return <li>
            <div className="itemProps">
              <p id="itemName">{this.props.itemName}</p>
              <p id="itemDescription">{this.props.itemDescription}</p>
              <img id="itemImage">{this.props.itemImage}</img>
            </div>
            <form className="itemButtons" onSubmit={this.props.handleSubmit}>
              <input name="itemId" type="hidden" value={this.props.itemId} />
              <button type="submit" className="itemBorrow" name="itemBorrow">
                Borrow
              </button>
            </form>
          </li>
  }
}

export default Item;
