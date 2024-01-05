import React, { useState } from 'react'
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import MaintenanceOrderModal from './MaintenanceOrderModal'
import styles from '../styles/dashboard.module.scss'


export default function MaintenanceRequestModal({showModal, setShowModal}) {
  const [maintenanceId, setMaintenanceId] = useState("ID (int)");
  const [modalShow, setModalShow] = useState(false);
  const [satelliteName, setSatelliteName] = useState("Name");

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
                  <Form.Control type="text" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Target</Form.Label>
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
      <MaintenanceOrderModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        maintenanceId={maintenanceId}
      />
    </>
  )
}
