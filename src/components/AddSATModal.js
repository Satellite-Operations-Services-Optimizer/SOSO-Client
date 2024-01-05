import React, { useState } from "react";
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import SatelliteModal from './SatelliteModal'
import styles from '../styles/dashboard.module.scss'

export default function AddSATModal({showModal2, setShowModal2}) {
  const [checkJson, setCheckJson] = useState();
  const [jsonFileName, setJsonFileName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [satelliteName, setSatelliteName] = useState("Name");

  const jsonFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/json' || file.type === 'text/plain' || /\.(json|txt)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          try {
            if (file.type === 'application/json') {
              // const jsonData = JSON.parse(fileContent);
              // Handle JSON data
              setJsonFileName(file.name);
              setCheckJson(false);
            } else if (file.type === 'text/plain') {
              // Handle text file data
              setJsonFileName(file.name);
              setCheckJson(false);
            }
          } catch (error) {
            setJsonFileName("Upload only JSON File");
            setCheckJson(true);
          }
        };
        reader.readAsText(file);
      } else {
        setJsonFileName("Invalid file type. Please upload .json or .text file.");
        setCheckJson(true);
      }
    }
  };

  const handleSubmit = () => {
    setModalShow(true)
    setShowModal2(false)
  }

  return (
    <>
      <Modal 
        size="lg"
        show={showModal2} 
        onHide={() => setShowModal2(false)}
        className={styles.customModal} 
        centered
        >
        <Modal.Header className={styles.customModalHeader} closeButton>
          <Modal.Title className={styles.customModalTitle}>Add Satellite to SOSO Constellation</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.customModalBody}>
          <Form className={styles.addSatelliteForm}>
            <Row className={styles.formRow}>
              <Col md={12} className={styles.formGroup}>
                  <div className={styles.uploadFile}>
                    <input type="file" accept=".json, .txt" onChange={jsonFileUpload} />
                    <span className={checkJson ? styles.red : ""}>{jsonFileName ? jsonFileName : "Upload only JSON or Text File"}</span>
                  </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.customModalFooter}>
          <Button type="button" className={styles.dismissBtn} onClick={() => setShowModal2(false)}>Dismiss</Button>
          <Button type="button" className={styles.submitBtn} onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <SatelliteModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        satelliteName={satelliteName}
      />
    </>
  )
}
