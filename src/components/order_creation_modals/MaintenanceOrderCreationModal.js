import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Modal, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import styles from '../../styles/dashboard.module.scss'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from "axios";
import OrderCreationSuccessModal from './OrderCreationSuccessModal';
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";


export default function MaintenanceOrderCreationModal({showModal, setShowModal}) {
  const defaultMinRepeatFrequencyUnits = "days"
  const [maintenanceId, setMaintenanceId] = useState("ID (int)");
  const [modalShow, setModalShow] = useState(false);
  const [satelliteNames, setSatelliteNames] = useState([]);
  const [groundstationNames, setGroundstationNames] = useState([])
  const [windowStart, setWindowStart] = useState([new Date(), new Date()])
  const [windowEnd, setWindowEnd] = useState([new Date(), new Date()])
  const [minRepeatFrequencyUnits, setMinRepeatFrequencyUnits] = useState(defaultMinRepeatFrequencyUnits)

  const timeUnitOptions = ["mins", "hours", "days", "weeks", "months", "years"]

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
                  <Datetime value={windowStart} onChange={setWindowStart} inputProps={{placeholder: 'Window Start'}}/>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Datetime value={windowEnd} onChange={setWindowEnd} inputProps={{placeholder: 'Window End'}}/>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Duration" required/>
                    <Form.Select required>
                      {timeUnitOptions.map((option) => {
                        return (<option value={option}>{option}</option>)
                      })}
                    </Form.Select>
                    <span className={styles.inputBar}></span>
                  </InputGroup>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Repeat frequency (min)" />
                    <Form.Select>
                      {timeUnitOptions.map((option) => {
                        return (<option value={option}>{option}</option>)
                      })}
                    </Form.Select>
                    <span className={styles.inputBar}></span>
                  </InputGroup>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Repeat frequency (max)" />
                    <Form.Select>
                      {timeUnitOptions.map((option) => {
                        return (<option value={option}>{option}</option>)
                      })}
                    </Form.Select>
                    <span className={styles.inputBar}></span>
                  </InputGroup>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialSelect}>
                  <Form.Select required>
                    <option value={false}>False</option>
                    <option value={true}>True</option>
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
      <OrderCreationSuccessModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        orderId={maintenanceId}
      />
    </>
  )
}
