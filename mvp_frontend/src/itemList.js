import React from 'react';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = (itemName, index) => {
      return <li>key={index} value={itemName}</li>
    }
  }
  render() {
    return (
      <ul>
        {this.props.itemData
          .map((itemName, index) => this.renderItem(itemName, index))}
      </ul>
    )
  }
}

export default ItemList;
