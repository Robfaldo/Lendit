import React from 'react';

class ItemSubmitForm extends React.Component {
  render() {
    return (
        <div className="ItemSubmitForm">
          <textarea className="ItemInput" placeholder="Please type in the item name here"></textarea>
          <button className="SubmitButton" onClick={this.props.handleClick}>List Item</button>
        </div>
    )
  }
}

export default ItemSubmitForm;
