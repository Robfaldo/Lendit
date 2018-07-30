import React from 'react';
import Item from './item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = (itemData) => {
      return (
        <Item
          key={itemData._id}
          itemId={itemData._id}
          itemName={itemData.itemName}
          itemDescription={itemData.itemDescription}
          image={itemData.image}
          handleSubmit={this.handleSubmit}
        />
      )
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event.target.itemId.value);
    event.preventDefault();
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
