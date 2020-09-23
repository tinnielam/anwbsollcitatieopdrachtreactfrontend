import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './GoogleMarker';


const SimpleMap = (props: any) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={11.0168}
            lng={76.9558}
            name="My Marker"
            color="red"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;



