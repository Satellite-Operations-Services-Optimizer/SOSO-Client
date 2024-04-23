import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import MaintenanceOrderCreationSuccessModal from './MaintenanceOrderCreationSuccessModal'
import styles from '../../styles/dashboard.module.scss'
import { set } from 'lodash';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from "axios";


export default function MaintenanceOrderCreationModal({showModal, setShowModal}) {
  const [maintenanceId, setMaintenanceId] = useState("ID (int)");
  const [modalShow, setModalShow] = useState(false);
  const [satelliteNames, setSatelliteNames] = useState([]);
  const [groundstationNames, setGroundstationNames] = useState([])

  let fetchAssetNames = async () => {
    let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
    let response = await axios.get(`${base_url}/assets/names`)
    setSatelliteNames(response.data.satellites)
    setGroundstationNames(response.data.groundstations)
  }

  useEffect(() => {
    fetchAssetNames()
  }, [])

  const handleSubmit = () => {
    setModalShow(true)
    setShowModal(false)
  }

  return (
    <>
      <Modal 
        size="lg"
        show={showModal} 
        onHide={() => setShowModal(false)}
        className={styles.customModal} 
        centered
        >
        <Modal.Header className={styles.customModalHeader} closeButton>
          <Modal.Title className={styles.customModalTitle}>Maintenance Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.customModalBody}>
          <Form className={styles.customForm}>
            <Row className={styles.formRow}>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Typeahead
                    id="target-typeahead"
                    options={satelliteNames.concat(groundstationNames)}
                    placeholder="Target"
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Activity</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Window Start</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Window End</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="12" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Duration</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>RepeatCycle Frequency MinimumGap</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>RepeatCycle Frequency MaximumGap</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>RepeatCycle Repetition</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialSelect}>
                  <Form.Select required>
                    <option value="" disabled selected></option>
                    <option value="0">False</option>
                    <option value="1">True</option>
                  </Form.Select>
                  <span className={styles.selectBar}></span>
                  <Form.Label>PayloadOutage</Form.Label>
                </div>  
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.customModalFooter}>
          <Button type="button" className={styles.dismissBtn} onClick={() => setShowModal(false)}>Dismiss</Button>
          <Button type="button" className={styles.submitBtn} onClick={handleSubmit}>Submit Data</Button>
        </Modal.Footer>
      </Modal>
      <MaintenanceOrderCreationSuccessModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        maintenanceId={maintenanceId}
      />
    </>
  )
}
