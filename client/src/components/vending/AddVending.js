import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import {addVending} from '../../actions/vending'
import {connect} from 'react-redux'

const AddVending = ({plage,addVending}) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    numero:'',
    model:'',
    lat,
    lng

  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) =>{
    setNum(e.target.value)
  }
  const onSubmit = () =>{
    console.log(plage)
    addVending(plage,num);
    handleClose()
  }

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
          
            <input type="text" name="numero" value={numero} onChange={e=>onChange(e)} />
           
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
  addVending: PropTypes.func.isRequired,
};
const mapStateToProp = () =>({

})
export default connect(null,{addVending})(AddVending);
