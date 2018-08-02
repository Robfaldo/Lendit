import React from 'react';
import Item from './item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.itemsData};
    this.renderItem = (itemData) => {
      console.log(itemData);
      return (
        <Item
          key={itemData._id}
          owner={itemData.owner}
          currentBorrower={itemData.currentBorrower}
          itemId={itemData._id}
          itemName={itemData.itemName}
          itemDescription={itemData.itemDescription}
          image={itemData.image}
          userDetails={this.props.userDetails}
          handleItemBorrow={this.props.handleItemBorrow}
          handleItemReturn={this.props.handleItemReturn}
        />
      )
    }
  }

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
