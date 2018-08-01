import React from 'react';
import ItemList from './itemList';

class MyAvailableItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {itemsData: []}
    this.myOwnItem = (item) => {
      return item.owner === this.props.userDetails['_id']
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ itemsData: nextProps.itemsData });
  }

  render() {
    return <ItemList itemsData={this.state.itemsData} />
  }
}

export default MyAvailableItems;
