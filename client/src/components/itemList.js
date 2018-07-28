import React from 'react';
import Item from './item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = (itemData) => {
      return <Item key={itemData._id} itemName={itemData.itemName} />
    }
  }

  render() {
    return (
      <ul>
        {this.props.itemsData.map(item => this.renderItem(item))}
      </ul>
    )
  }
}

export default ItemList;
