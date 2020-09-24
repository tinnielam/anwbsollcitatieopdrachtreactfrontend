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
      polylinedata: []
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatie: data }))
      .then(()=> this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          this.setState({ polylinedata: key.polyline }
         ))))))
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


var data ='sh{bIeth_@eAcCg@kAg@qAc@cAWq@c@kA[}@[}@Wu@W}@GWOk@[gAKWS{@[kA[yASw@CQK[Kk@Ka@?GK_@G_@Ga@CMCOCQKc@CSKi@CUG_@Ga@O_ACOG[Gm@C_@GWC]G[C[CWGc@Gi@C_@Gm@Ce@Ge@Ca@C]Gq@Gk@Gi@Ca@Cg@_@kECc@Gk@CQCYKqAGw@O{A?UWsCCQ?QGk@Gs@CYKqACMCe@CUCWGm@?QOuAGs@?QGa@g@cGCa@KeAQqB?YCQGa@?QGc@Co@KiACQCYKqAOwA?USaCOcBCa@Ks@OkB?QGc@GaAGe@Gs@Gk@?QCYCOCYGs@CYCQCYGy@Ce@Gk@G{@CQGaACUKeAScCGs@CQCY?QCYc@eFGe@C_@OiBGu@Go@KcACk@Gk@CKGo@Cc@QqBOcBUcCSqBEi@MkBEOM{AMyAAYAMCe@Ac@?m@?uA?s@?a@?i@Cg@?]AUEo@CUEg@Cs@[oDKkAEg@AQCYAQGs@IiA[qDEa@e@uF?ECQGs@E_AAG'
    let decode = google.maps.geometry.encoding.decodePath(data);


    let geodesicPolyline = new maps.Polyline({
      path: decode,
      geodesic: true,
      strokeColor: "#00a1e1",
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    geodesicPolyline.setMap(map);
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderPolylines(map, maps)}
        >
          {this.getFromLocation()}
          {this.getToLocation()}
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
