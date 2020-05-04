import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { addVending } from "../../actions/vending";
import { connect } from "react-redux";
import Select from "react-select";

import GoogleMapReact from "google-map-react";

import { MY_API_KEY } from "../../utils/keys";

const options = [
  { value: "Tunis", label: "Tunis" },
  { value: "Ariana", label: "Ariana" },
  { value: "Ben Arous", label: "Ben Arous" },
  { value: "Manouba", label: "Manouba" },
  { value: "Nabeul", label: "Nabeul" },
  { value: "Zaghouan", label: "Zaghouan" },
  { value: "Bizerte", label: "Bizerte" },
  { value: "Béja", label: "Béja" },
  { value: "Jendouba", label: "Jendouba" },
  { value: "Kef", label: "Kef" },
  { value: "Siliana", label: "Siliana" },
  { value: "Sousse", label: "Sousse" },
  { value: "Monastir", label: "Monastir" },
  { value: "Mahdia", label: "Mahdia" },
  { value: "Sfax", label: "Sfax" },
  { value: "Kairouan", label: "Kairouan" },
  { value: "Kasserine", label: "Kasserine" },
  { value: "Sidi Bouzid", label: "Sidi Bouzid" },
  { value: "Gabès", label: "Gabès" },
  { value: "Mednine", label: "Mednine" },
  { value: "Tataouine", label: "Tataouine" },
  { value: "Gafsa", label: "Gafsa" },
  { value: "Tozeur", label: "Tozeur" },
  { value: "Kebili", label: "Kebili" }
];

const AddVending = ({ plage, addVending }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    model: "",
    region: "",
    adress:"",
    lat: "",
    lng: ""
  });

  let { model, region,adress, lat, lng } = formData;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = e =>{
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });}

  const onSubmit = (e) => {
    e.preventDefault();
    addVending( model, region,adress, lat, lng);
    handleClose();
  };

  // google map

  const [center] = useState({
    lat: 36.81897,
    lng: 10.16579
  });
  const [zoom] = useState(11);

  const handleApiLoaded = (map, maps) => {
    let marker = new maps.Marker({ map: map, position: maps.LatLng(center) });
    const geocoder = new maps.Geocoder();
    const infowindow = new maps.InfoWindow();
    maps.event.addListener(map, "click", function(event) {
     
      setFormData({ ...formData, lat: event.latLng.lat(),
        lng: event.latLng.lng() });
      // var latitude = event.latLng.lat();
      // var longitude = event.latLng.lng();
      marker.setPosition(event.latLng);

      //console.log(latitude + ", " + longitude);
      console.log(event);
    });
  };

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Add Vending
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Vending</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <div style={{ height: "50vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={MY_API_KEY}
              defaultCenter={center}
              defaultZoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            ></GoogleMapReact>
          </div>
         
          <br/>
          <input
          placeholder="Adress"
            type="text"
            name="adress"
            value={adress}
            onChange={e => onChange(e)}
          />
          <br/>
          <Select
          placeholder="Select Region"
            options={options}
            onChange={v => setFormData({ ...formData, region: v.value })}
          />
          

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

AddVending.propTypes = {
  plage: PropTypes.string.isRequired,
  addVending: PropTypes.func.isRequired
};
const mapStateToProp = () => ({});
export default connect(null, { addVending })(AddVending);
