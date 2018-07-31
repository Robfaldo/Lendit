import React from 'react';

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl : "https://makerslendit.s3.amazonaws.com/" + this.props.image + ".jpg",
    }
  }
  render() {
    return <li>
            <div className="itemProps">
              <p id="itemName">{this.props.itemName}</p>
              <p id="itemDescription">{this.props.itemDescription}</p>
              <img
                className="itemImage"
                style={{height:100, width: 100}}
                src={this.state.imageUrl}
                alt={this.props.itemName}
              />
            </div>
            <form className="itemButtons" onSubmit={this.props.handleSubmit}>
              <input name="itemId" type="hidden" value={this.props.itemId} />
              <button type="submit" className="itemBorrow" name="itemBorrow">
                Borrow
              </button>
            </form>
          </li>
  }
}

export default Item;
