import React from 'react';

import ItemSubmitForm from './itemSubmitForm';
import ItemList from './itemList';
import axios from 'axios';

class ListingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitFormText: '', itemDescription: '', data: this.props.data, selectedFile: null, randomNumber: Math.floor(Math.random(1000000) * Math.floor(Math.pow(10,10)))};
    this.handleSubmit = async (event) => {
      event.preventDefault();
      let image = this.state.selectedFile ? this.state.randomNumber : "default";
      await this.props.postRequest(
        {
          itemName: this.state.submitFormText,
          itemDescription: this.state.itemDescription,
          image: image,
          owner: this.props.user["_id"],
        }
      );
      console.log(`User submitted: ${this.state.submitFormText}`);
      this.setState({submitFormText: ''});
      this.submitImage();
    }

    this.submitImage = () =>{
      const formData = new FormData();
      formData.append('image', this.state.selectedFile, this.state.randomNumber + ".jpg");
      axios.post('/api/upload', formData);
    };

    this.handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    };

    this.handleFileChange = async (event) => {
      console.log(event.target.files[0]);
      // file.name = this.props.user._id;
      await this.setState({selectedFile: event.target.files[0]});
      console.log(this.state.selectedFile);
    }

    this.handleItemBorrow = async (event) => {
      event.preventDefault();
      const borrower = this.props.user["_id"]
      const itemId = event.target.itemId.value
      console.log(itemId)
      console.log("borower id",this.props.user["_id"]);
      console.log("item id", event.target.itemId.value);
      await axios.put(`/api/items/${itemId}`, { borrowerId : borrower})
      // event.target.reset();
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  render() {
    return(
      <div>
        <ItemSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleFileChange={this.handleFileChange}
          value={this.state.submitFormText}
        />
        <ItemList
          itemsData={this.props.data}
          handleItemBorrow={this.handleItemBorrow}
        />
      </div>
    )
  }
}

export default ListingsPage;
