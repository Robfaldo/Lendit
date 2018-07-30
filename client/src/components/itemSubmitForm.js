import React from 'react';

function ItemSubmitForm(props) {
  return (
    <form className="ItemSubmitForm" onSubmit={props.handleSubmit}>
      ItemName: <input
        id="item_name"
        name="submitFormText"
        type="text"
        placeholder="Item Name"
        onChange={props.handleChange}
        value={props.itemName}
      /><br />

      ItemDescription: <textarea
        className="ItemInput"
        name="itemDescription"
        type="text"
        placeholder="Please type in the item description here"
        onChange={props.handleChange}
        value={props.description}
      /> <br />

      Upload Image: <input
        type="file"
        accept=".jpg"
        name="image-upload"
        id="image-upload"
        onChange={props.handleFileChange}
      />

      <button type = "submit" className="SubmitButton">
        List Item
      </button>
    </form>
  )
}

export default ItemSubmitForm;
