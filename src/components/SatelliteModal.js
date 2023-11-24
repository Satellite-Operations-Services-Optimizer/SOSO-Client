import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function SatelliteModal( props ) {

  return (
    <Modal
      {...props}
    //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="customModal"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <p>Satellite name<br/> has been added!</p>
      </Modal.Body>
    </Modal>
  );
}
