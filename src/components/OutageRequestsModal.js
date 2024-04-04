import React, { useState } from 'react'
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import styles from '../styles/dashboard.module.scss'


export default function OutageRequestsModal({showModal, setShowModal}) {
  const handleSubmit = () => {
    setModalShow(true)
    setShowModal(false)
  }

  return (
    <Modal 
      size="lg"
      show={showModal} 
      onHide={() => setShowModal(false)}
      className={styles.customModal} 
      centered
      >
      <Modal.Header className={styles.customModalHeader} closeButton>
        <Modal.Title className={styles.customModalTitle}>Outage Requests Form</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.customModalBody}>
        <Form className={styles.customForm}>
          <Row className={styles.formRow}>
            <Form.Group as={Col} md="12" className={styles.formCol}>
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
                <Form.Label>Start Time</Form.Label>
              </div>
            </Form.Group>
            <Form.Group as={Col} md="6" className={styles.formCol}>
              <div className={styles.materialInput}>
                <Form.Control type="text" required />
                <span className={styles.inputBar}></span>
                <Form.Label>End Time</Form.Label>
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
  )
}
