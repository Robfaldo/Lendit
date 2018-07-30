import React from 'react';

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl : "https://makerslendit.s3.amazonaws.com/" + this.props.image + ".jpg",
    }
  }
  render() {
    return <li><img style={{height:100, width: 100}} src={this.state.imageUrl} alt={this.props.itemName}/>{this.props.itemName}</li>
  }
}

export default Item;
