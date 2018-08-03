import React from 'react';

class ItemSubmitForm extends React.Component {
  // componentWillReceiveProps(nextProps){
  //   this.setState({map: this.props.map})
  //
  // }


  render() {
    return (
      <div class="row" style={{width: "50%"}}>
          <form class="col s12" className="ItemSubmitForm" onSubmit={this.props.handleSubmit}>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="item_name"
                  name="submitFormText"
                  type="text"
                  placeholder="Item Name"
                  onChange={this.props.handleChange}
                  value={this.props.itemName}
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  className="ItemInput"
                  name="itemDescription"
                  type="text"
                  placeholder="Please type in the item description here"
                  onChange={this.props.handleChange}
                  value={this.props.description}
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  name="location"
                  type="text"
                  placeholder="Please type in the full address"
                  onChange={this.props.handleChange}
                  value={this.props.location}
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  type="file"
                  accept=".jpg"
                  name="image-upload"
                  id="image-upload"
                  onChange={this.props.handleFileChange}
                />
              </div>
            </div>
            <button type = "submit" class="waves-effect waves-light btn">
              List Item
            </button>
          </form>
        </div>
    )
  }
}

export default ItemSubmitForm;
