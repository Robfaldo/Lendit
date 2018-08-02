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

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.itemsData });
  }



  render() {
    return (
      <ul>
        {/* {this.state.data.map(item => this.renderItem(item))} */}
        <div class="row">
          <div class="col s12">
            <h3>Listings</h3>
          </div>
          <div class="col s6">
            {this.state.data.slice(0, this.state.data.length/2+1).map(item => this.renderItem(item))}
          </div>
          <div class="col s6">
            {this.state.data.slice(this.state.data.length/2).map(item => this.renderItem(item))}
          </div>
        </div>
      </ul>
    )
  }
}

export default ItemList;
