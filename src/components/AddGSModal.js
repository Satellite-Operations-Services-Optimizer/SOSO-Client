import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import GroundStationModal from './GroundStationModal'
import styles from '../styles/dashboard.module.scss'

export default function AddGSModal({showModal1, setShowModal1}) {
  const [modalShow, setModalShow] = useState(false);
  const [stationName, setStationName] = useState("Name");

  const handleSubmit = () => {
    setModalShow(true);
    setShowModal1(false)
  }

  return (
    <>
      <Modal 
        size="lg"
        show={showModal1} 
        onHide={() => setShowModal1(false)}
        className={styles.customModal} 
        centered
        >
        <Modal.Header className={styles.customModalHeader} closeButton>
          <Modal.Title className={styles.customModalTitle}>Add Ground Stations</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.customModalBody}>
          <Form className={styles.customForm}>
            <Row className={styles.formRow}>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Name</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Height</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Latitude</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Longitude</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Uplink Rate</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Downlink Rate</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md={6} className={styles.formGroup}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Mask</Form.Label>
                </div>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.customModalFooter}>
          <Button type="button" className={styles.dismissBtn} onClick={() => setShowModal1(false)}>Dismiss</Button>
          <Button type="button" className={styles.submitBtn} onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <GroundStationModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        stationName={stationName}
      />
    </>
  )
}
