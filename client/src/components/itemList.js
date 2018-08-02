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
          location={itemData.location}
          map={this.props.map}
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
        <div class="row">
          <div class="col s12">
            <h3>Listings</h3>
          </div>
          <div class="col s6">
            {this.state.data.slice(0, this.state.data.length/2+1).map(item => this.renderItem(item))}
          </div>
          <div class="col s6">
            {this.state.data.slice(this.state.data.length/2+1).map(item => this.renderItem(item))}
          </div>
        </div>
      </ul>
    )
  }
}

export default ItemList;
