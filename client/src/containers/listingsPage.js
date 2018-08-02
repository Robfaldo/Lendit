import React from 'react';

import ItemSubmitForm from '../components/itemSubmitForm';
import ItemList from '../components/itemList';
import axios from 'axios';
import Map from '../components/map';

class ListingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      submitFormText: '',
      itemDescription: '',
      data: this.props.data,
      selectedFile: null,
      randomNumber: Math.floor(Math.random(1000000) * Math.floor(Math.pow(10,10))),
      currentView: [51.5146485, -0.0668833310722988],
    };
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
    };

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
    };

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

    this.handleItemReturn = async (event) => {
      event.preventDefault();
      const borrower = undefined;
      const itemId = event.target.itemId.value;
      await axios.put(`/api/items/${itemId}`, { borrowerId : borrower})
      alert('successfully returned item!')
    }

    this.handleMapUpdate = (map) => {
      console.log("MAP UPDATE CALLED");
      console.log(map);
      this.setState({map: map});
      console.log(this.state);
    }


  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  render() {
    return(
      <div>
        <Map data={[
          {coordinates: ["51.5146485", "-0.0668833310722988"], text: "this is a test marker"},
        ]}
             handleMapUpdate={this.handleMapUpdate}
             currentView={this.state.currentView}
             map={this.state.map}
        />
        <ItemSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleFileChange={this.handleFileChange}
          value={this.state.submitFormText}
          changeCurrentView={this.changeCurrentView}
          map={this.state.map}
        />
        <ItemList
          userDetails={this.props.user}
          itemsData={this.props.data}
          handleItemBorrow={this.handleItemBorrow}
          handleItemReturn={this.handleItemReturn}
        />
      </div>
    )
  }
}

export default ListingsPage;
