import React from 'react';

class ItemSubmitForm extends React.Component {
  render() {
    return (
      <form className="ItemSubmitForm" onSubmit={this.props.handleSubmit}>
        <textarea
          className="ItemInput"
          placeholder="Please type in the item name here"
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <button type = "submit" className="SubmitButton">
          List Item
        </button>
      </form>
    )
  }
}

export default ItemSubmitForm;
