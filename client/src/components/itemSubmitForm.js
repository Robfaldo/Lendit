import React from 'react';

class ItemSubmitForm extends React.Component {
  // componentWillReceiveProps(nextProps){
  //   this.setState({map: this.props.map})
  //
  // }


  render() {
    return (
      <form className="ItemSubmitForm" onSubmit={this.props.handleSubmit}>
        ItemName: <input
          id="item_name"
          name="submitFormText"
          type="text"
          placeholder="Item Name"
          onChange={this.props.handleChange}
          value={this.props.itemName}
          required
        /><br />

        ItemDescription: <textarea
          className="ItemInput"
          name="itemDescription"
          type="text"
          placeholder="Please type in the item description here"
          onChange={this.props.handleChange}
          value={this.props.description}
          required
        /> <br />

        Location: <textarea
        className="ItemInput"
        name="location"
        type="text"
        placeholder="Please type in the full address"
        onChange={this.props.handleChange}
        value={this.props.location}
        required
      /> <br />

        Upload Image: <input
          type="file"
          accept=".jpg"
          name="image-upload"
          id="image-upload"
          onChange={this.props.handleFileChange}
        />

        <button type = "submit" className="SubmitButton">
          List Item
        </button>

      </form>
    )
  }
}

export default ItemSubmitForm;
