import React, { Component } from 'react';
import L from 'leaflet';


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      places: [],
      map: this.props.map,
    };

    this.addMarkers = () => {
      let data = this.props.data;
      data.forEach(place => {
        console.log("adding marker to map");
        let marker = L.marker(place.coordinates).addTo(this.state.map).bindPopup(place.text);
        this.state.markers.push(marker);
      });
    }

      this.addthemap = async () => {
        let map = await L.map('map').setView([51.5146485, -0.0668833310722988], 16);  //I'm so sorry
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






  render() {
    return (

      <div id = "map" style={{height:"500px", width:"50%"}}/>

    )
  }

}

export default Map;
