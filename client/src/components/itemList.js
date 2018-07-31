import React from 'react';
import Item from './item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.itemsData};
    this.renderItem = (itemData) => {
      return (
        <Item
          key={itemData._id}
          itemId={itemData._id}
          itemName={itemData.itemName}
          itemDescription={itemData.itemDescription}
          image={itemData.image}
          handleSubmit={this.props.handleItemBorrow}
        />
      )
    }
  }
  // 
  // handleSubmit(event) {
  //   console.log(event.target.itemId.value);
  //   event.preventDefault();
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.itemsData });
  }

  render() {
    return (
      <ul>
        {this.state.data.map(item => this.renderItem(item))}
      </ul>
    )
  }
}

export default ItemList;
