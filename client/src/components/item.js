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
    }
    this.borrowedByMe = () => {
      return this.props.userDetails['_id'] === this.props.currentBorrower;
    }
  }
  render() {
    if (this.borrowedByMe()) {
      return (
        <li>
          <Card
            className='small'
            header={<CardTitle style={{ width:"inherit" }}
            image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
            actions={
              [<form className="itemButtons" onSubmit={this.props.handleItemReturn}>
              <input name="itemId" type="hidden" value={this.props.itemId} />
              <button class="btn waves-effect waves-light" type="submit" name="itemReturn">
                Return
              </button>
              </form>]
            }>
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
            header={<CardTitle style={{ width:"inherit"}}
            image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
            actions={
              [<form className="itemButtons" onSubmit={this.props.handleItemBorrow}>
              <input name="itemId" type="hidden" value={this.props.itemId} />
              <button class="btn waves-effect waves-light" type="submit" name="itemBorrow">
                Borrow
              </button>
              </form>]
            }>
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
            header={<CardTitle style={{ width:"inherit" }}
            image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
          >
            {this.props.itemDescription}
          </Card>
        </li>
      )
    }
  }
}

export default Item;
