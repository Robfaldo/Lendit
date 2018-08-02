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
      location: '',
    };
    this.handleSubmit = async (event) => {
      event.preventDefault();
      let image = this.state.selectedFile ? this.state.randomNumber : "default";
      await this.getLocation(this.state.location);
      await this.props.postRequest(
        {
          itemName: this.state.submitFormText,
          itemDescription: this.state.itemDescription,
          image: image,
          owner: this.props.user["_id"],
          location: this.state.location ,
        }
      );
      console.log(`User submitted: ${this.state.submitFormText}`);
      this.setState({submitFormText: ''});
      this.submitImage();
    };

    this.getLocation = async (location) => {
      location = location.split(" ").join("%20");
      let url = ` https://nominatim.openstreetmap.org/search/${location}?format=json&addressdetails=1&limit=1&polygon_svg=1`;
      let data;
      let state = this;
      await axios.get(url)
        .then(response => {
          if(response.data.length !== 0) {
            data = response.data[0];
          } else {
            console.log('received no data')
          }
        }).then(thing => {
          let arr = data ? [data.lat, data.lon] : [51.5146485, -0.0668833310722988];
          console.log(arr);
          state.setState({
            location: arr,
          });
          return arr;
        }
      )
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
      await this.props.refreshUser();
      await this.props.getRequest();
      // event.target.reset();
    }

    this.handleItemReturn = async (event) => {
      event.preventDefault();
      const borrower = undefined;
      const itemId = event.target.itemId.value;
      await axios.put(`/api/items/${itemId}`, { borrowerId : borrower})
      await this.props.getRequest();
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
      <div class="row">
        <div class="col s12">
          <ItemSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleFileChange={this.handleFileChange}
          value={this.state.submitFormText}
          changeCurrentView={this.changeCurrentView}
          map={this.state.map}
          location={this.state.location}
        />
        </div>
        <div class="col s8">

        <ItemList
          userDetails={this.props.user}
          itemsData={this.props.data}
          handleItemBorrow={this.handleItemBorrow}
          handleItemReturn={this.handleItemReturn}
        />
        </div>
        <div class="col s4">
          <Map data={[
          {coordinates: ["51.5146485", "-0.0668833310722988"], text: "this is a test marker"},
        ]}
             handleMapUpdate={this.handleMapUpdate}
             currentView={this.state.currentView}
             map={this.state.map}
             itemsData={this.props.data}
        />
        </div>
      </div>
    )
  }
}

export default ListingsPage;
