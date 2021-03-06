import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import AnwbData from "../Data/AnwbData";

class GoogleMaps extends React.Component {
  public decodedLevels: []

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      verkeersinformatie: [],
      polylinedata: []
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  private getFromLocation() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <Marker
            lat={key.fromLoc.lat}
            lng={key.fromLoc.lon}
            text={key.events.text}
            color="red"
          />
        ))
      )
    );
  }

  private getToLocation() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <Marker
            lat={key.toLoc.lat}
            lng={key.toLoc.lon}
            text={key.events.text}
            color="blue"
          />
        ))
      )
    );
  }

  private renderPolylines(map, maps): any {    
    let geodesicPolyline = new maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: '#00a1e1',
      strokeOpacity: 1.0,
      strokeWeight: 4
    })
    geodesicPolyline.setMap(map)
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => this.renderPolylines(map, maps)}
        >
          {this.getFromLocation()}
          {this.getToLocation()}
        </GoogleMapReact>
      </div>
    );
  }
  static defaultProps = {
      markers: [
    {lat: 53.42728, lng: -6.24357},
    {lat: 43.681583, lng: -79.61146}
  ],
    center: {
      lat: 52.254709,
      lng: 5.353826
    },
    zoom: 8
  };
}

export default GoogleMaps;
