import React, { Component } from 'react';
import L from 'leaflet';


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      places: [],
      map: null,
    };
  }

  access_token = process.env.MAP_KEY;

  componentDidMount() {
    this.addthemap();
    // this.addMarkers();
  };

  addMarkers = () => {
    let instance = this;
    let data = this.props.data;
    data.forEach(place =>{
      console.log("adding marker to map");
      let marker = L.marker(place.coordinates).addTo(this.state.map).bindPopup(place.text);
      this.state.markers.push(marker);
    });

  };

  addthemap = async () => {
    await this.setState({map: L.map('map').setView([51.5146485,-0.0668833310722988],16)});
    await L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: '',
      accessToken: "pk.eyJ1Ijoia2hpZWJpZ2dzIiwiYSI6ImNqazdjNGk0ZzEyZngzcGszcnU3bGFlcjEifQ.Dpxxa0nVOMimeYlSTciMSg",
    }).addTo(this.state.map);
    await L.tileLayer('https://api.mapbox.com/styles/v1/khiebiggs/cjk8adcp519r12rlhw7knuxmf/tiles/256/{z}/{x}/{y}?access_token={token}',{token: "pk.eyJ1Ijoia2hpZWJpZ2dzIiwiYSI6ImNqazdjNGk0ZzEyZngzcGszcnU3bGFlcjEifQ.Dpxxa0nVOMimeYlSTciMSg"}).addTo(this.state.map);
    console.log("ADD THE MAP CALLED");
    this.addMarkers();
  };

  render() {
    return (

      <div id = "map"/>

    )
  }

}

export default Map;
