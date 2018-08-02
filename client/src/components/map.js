import React, { Component } from 'react';
import L from 'leaflet';


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      places: [],
      map: this.props.map,
      data: null
    };



    this.addMarkers = () => {
      if(this.state.data === null) return;
      let data = this.state.data;
      data.forEach(place => {
        console.log("adding marker to map");
        let marker = L.marker(place.location).addTo(this.state.map).bindPopup(place.itemName);
        this.state.markers.push(marker);
      });
    };

    this.addthemap = async () => {
      let map = await L.map('map').setView([51.5146485, -0.0668833310722988], 16);
      await this.setState({map: map});
      await this.props.handleMapUpdate(map);
      await L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: "pk.eyJ1Ijoia2hpZWJpZ2dzIiwiYSI6ImNqazdjNGk0ZzEyZngzcGszcnU3bGFlcjEifQ.Dpxxa0nVOMimeYlSTciMSg",
      }).addTo(this.state.map);
      // await L.tileLayer('https://api.mapbox.com/styles/v1/khiebiggs/cjk8adcp519r12rlhw7knuxmf/tiles/256/{z}/{x}/{y}?access_token={token}', {token: "pk.eyJ1Ijoia2hpZWJpZ2dzIiwiYSI6ImNqazdjNGk0ZzEyZngzcGszcnU3bGFlcjEifQ.Dpxxa0nVOMimeYlSTciMSg"}).addTo(this.state.map);
      console.log("ADD THE MAP CALLED");
      this.addMarkers();
    };


    // shouldComponentUpdate() {
    //   return false
    // }


    // componentWillReceiveProps(nextProps){
    //   //Perform some operation
    //   if(nextProps.map !== this.props.m) {
    //     this.setState({
    //       map: nextProps.map,
    //     });
    //     this.addthemap();
    //   }
    // }
  };
  componentDidMount() {
    this.addthemap();
    // this.addMarkers();
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data){
      this.setState({ data: nextProps.itemsData });
      this.addMarkers();
    }
  }





  render() {
    return (

      <div id = "map" style={{height:"100vh", width:"100%"}}/>

    )
  }

}

export default Map;
