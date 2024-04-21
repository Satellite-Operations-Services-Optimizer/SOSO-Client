import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../../styles/dashboard.module.scss'

export default function MaintenanceOrderCreationSuccessModal( props ) {

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.customModal} 
    >
      <Modal.Header className={styles.customModalHeader} closeButton>
      </Modal.Header>
      <Modal.Body>
        <p className={styles.stationName}>Maintenance Order <br/>added!</p>
        <span className={styles.maintenanceId}>{props.maintenanceId}</span>
      </Modal.Body>
      <Modal.Footer className={styles.customModalFooter}>
        <Button type="button" className={styles.dismissBtn} onClick={props.onHide}>Dismiss</Button>
      </Modal.Footer>
    </Modal>
  );
}
