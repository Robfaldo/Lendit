import React from 'react';
import {Button, Card, CardTitle} from 'react-materialize'

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl : "https://makerslendit.s3.amazonaws.com/" + this.props.image + ".jpg",
    }
    this.handleReturn = (event) => {
      alert('Returning an item! =)');
      event.preventDefault();
    }
    this.availableAndNotMine = () => {
      let notMine = this.props.userDetails['_id'] !== this.props.owner;
      let available = this.currentBorrower == undefined;
      return notMine && available;
    };
    this.borrowedByMe = () => {
      return this.props.userDetails['_id'] === this.props.currentBorrower;
    };
    this.mapChange = (event) => {
      event.preventDefault();
      console.log("clicked");
      this.props.map.setView(this.props.location, 17);
    }
  }
  render() {
    if (this.borrowedByMe()) {
      return (
        <li>
          <Card
            className='small'
            header={<CardTitle style={{height:350, width:300}}
            image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
            actions={
              [<form className="itemButtons" onSubmit={this.props.handleItemReturn}>
              <input name="itemId" type="hidden" value={this.props.itemId} />
              <button type="submit" className="itemReturn" name="itemReturn">
                Return
              </button>
              </form>]
            }
            onClick={this.mapChange}
          >
            {this.props.itemDescription}
          </Card>
        </li>
      )
    }

    else if (this.availableAndNotMine()) {
      return (
        <li>
          <Card
            className='small'
            header={<CardTitle style={{height:350, width:300}}
            image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
            actions={
              [<form className="itemButtons" onSubmit={this.props.handleItemBorrow}>
              <input name="itemId" type="hidden" value={this.props.itemId} />
              <button type="submit" className="itemBorrow" name="itemBorrow">
                Borrow
              </button>
              </form>]
            }
            onClick={this.mapChange}
          >
            {this.props.itemDescription}
          </Card>
        </li>
      )
    }

    else {
      return (
        <li>
          <Card
            className='small'
            header={<CardTitle style={{height:350, width:300}}
            image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
            onClick={this.mapChange}
          >
            {this.props.itemDescription}
          </Card>
        </li>
      )
    }
  }
}

export default Item;
