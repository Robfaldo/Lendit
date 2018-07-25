import React from 'react';

class ItemSubmitForm extends React.Component {
  render() {
    return (
        <div className="ItemSubmitForm">
          <textarea className="ItemInput"></textarea>
          <button className="SubmitButton" onClick={this.props.handleClick}></button>
        </div>
    )
  }
}

export default ItemSubmitForm;
