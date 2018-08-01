import React from 'react';
import {Button, Card, CardTitle} from 'react-materialize'

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl : "https://makerslendit.s3.amazonaws.com/" + this.props.image + ".jpg",
    }
  }
  render() {
    return <li>
            <Card
              className='small'
              header={<CardTitle style={{height:350, width:300}}
              image={this.state.imageUrl}>{this.props.itemName}</CardTitle>}
              actions={
                [<form className="itemButtons" onSubmit={this.props.handleSubmit}>
                <input name="itemId" type="hidden" value={this.props.itemId} />
                <button type="submit" className="itemBorrow" name="itemBorrow">
                  Borrow
                </button>
                </form>]
              }>
              {this.props.itemDescription}
            </Card>
          </li>
  }
}

export default Item;
