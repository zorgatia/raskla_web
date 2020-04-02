import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

import { connect } from "react-redux";
import { getVendings, removeVending } from "../../actions/vending";
import { MY_API_KEY } from "../../utils/keys";
import Spinner from "../layout/Spinner";

const Mapp = ({ getVendings, vending: { vendings,vending, loading } }) => {
  useEffect(() => {
    // console.log(vendings)
    getVendings();
    
  }, []);

  /* const [searchB, setSearchB] = useState("");
  const onChange = e => {
    setSearchB(e.target.value);
  }; 
  const onSubmit = e => {
    e.preventDefault();
    const vending = vendings.find(b=>b.num===searchB);
    console.log(vending)
    
  };*/
  const [center,setCenter] = useState({
    lat: 36.81897,
    lng: 10.16579
  });
  const [zoom] = useState(11);
  const handleApiLoaded = (map, maps) => {
    // let marker = new maps.Marker({ map: map, position: maps.LatLng(center) });
    // const geocoder = new maps.Geocoder();
    const infowindow = new maps.InfoWindow();

    //let autocomplete = new maps.places.Autocomplete(searchInput.current, {types: ['geocode']})
    console.log(vending)
    setMarkers(map, maps);
    if(vending){
      map.panTo({lat:vending.loc.lat,lng:vending.loc.lng})
      removeVending()
    }
    
    
  };
  const setMarkers = (map, maps) => {
    const image = {
      url:
        "https://res.cloudinary.com/ebniecolo/image/upload/c_scale,w_20/v1585837788/vending_bh0iq9.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new maps.Point(0, 32)
    };
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly"
    };
    vendings.forEach(b => {
      //  console.log('asd')
       console.log(b)
      const marker = new maps.Marker({
        position: { lat: b.loc.lat, lng: b.loc.lng },
        map: map,
        icon: image,
        title: b.number,
        zIndex: 10
      });
      marker.addListener("click", function() {
        const infowindow = new maps.InfoWindow({
          content: b.status,
          maxWidth: 200
        });
        infowindow.open(map, marker);
      });
    });
  };
  return loading || vendings == null ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <div className="content-body">
        <div className="container">
          <div>
            
          </div>
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={MY_API_KEY}
              defaultCenter={center}
              defaultZoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            ></GoogleMapReact>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
Mapp.propTypes = {
  getVendings: PropTypes.func.isRequired,
  vending: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  vending: state.vending
});

export default connect(
  mapStateToProp,
  { getVendings }
)(Mapp);
