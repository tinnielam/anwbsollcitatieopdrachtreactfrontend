import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import AnwbData from "../Data/AnwbData";

class GoogleMaps extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      verkeersinformatie: []
    };
  }

  static defaultProps = {
    center: {
      lat: 52.254709,
      lng: 5.353826
    },
    zoom: 8
  };

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.state.verkeersinformatie.map(verkeersinformatie =>
            verkeersinformatie.segments.map(segments =>
              segments.jams.map((key, index) => (
                <Marker
                  lat={key.fromLoc.lat}
                  lng={key.fromLoc.lon}
                  text="My Marker"
                  color="red"
                />
              ))
            )
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMaps;
