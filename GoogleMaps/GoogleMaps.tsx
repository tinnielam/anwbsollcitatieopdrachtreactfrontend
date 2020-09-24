import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import AnwbData from "../Data/AnwbData";

class GoogleMaps extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      verkeersinformatie: [],
      mapsLoaded: false,
      map: null,
      maps: null
    };
  }

  onMapLoaded(map, maps) {
    this.fitBounds(map, maps);
    this.setState({     
      mapsLoaded: true,
      map: map,
      maps: maps
    });
  }

  fitBounds(map, maps) {
    var bounds = new maps.LatLngBounds();
    for (let marker of this.props.markers) {
      bounds.extend(new maps.LatLng(marker.lat, marker.lng));
    }
    map.fitBounds(bounds);
  }

  afterMapLoadChanges() {
    return (
      <div style={{ display: "none" }}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={this.props.markers}
        />
      </div>
    );
  }

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
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}
                  {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
        >
          {this.state.verkeersinformatie.map(verkeersinformatie =>
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
          )}
          {this.state.verkeersinformatie.map(verkeersinformatie =>
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
          )}
        </GoogleMapReact>
      </div>
    );
  }
  static defaultProps = {
    center: {
      lat: 52.254709,
      lng: 5.353826
    },
    zoom: 8
  };
}

export default GoogleMaps;
