import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";

const data = [1, 2, 3, 4, 5];

const GoogleMaps = (props: any) => {
  const [center, setCenter] = useState({ lat: 52.066, lng: 5.200414 });
  const [zoom, setZoom] = useState(8);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {data.map(item => (
          <Marker lat={item.lat} lng={item.lng} name={item.name} color="red" />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMaps;
