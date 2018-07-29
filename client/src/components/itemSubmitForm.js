import React from 'react';

class ItemSubmitForm extends React.Component {
  render() {
    return (
      <form className="ItemSubmitForm" onSubmit={this.props.handleSubmit}>
        ItemName: <input
          id="item_name"
          name="itemName"
          type="text"
          placeholder="Item Name"
          onChange={this.handleChange}
          value={this.props.itemName}
        /><br />

        ItemDescription: <textarea
          className="ItemInput"
          name="itemDescription"
          type="text"
          placeholder="Please type in the item description here"
          onChange={this.props.handleChange}
          value={this.props.description}
        /> <br />

        Upload Image: <input
          type="file"
          name="image-upload"
          id="image-upload"
        />

        <button type = "submit" className="SubmitButton">
          List Item
        </button>
      </form>
    )
  }
}

export default ItemSubmitForm;
