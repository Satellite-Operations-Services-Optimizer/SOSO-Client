import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Modal, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import styles from '../../styles/dashboard.module.scss'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from "axios";
import OrderCreationSuccessModal from './OrderCreationSuccessModal';
import moment from 'moment'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import { set } from 'lodash';


export default function MaintenanceOrderCreationModal({showModal, setShowModal}) {
  const [maintenanceId, setMaintenanceId] = useState("ID (int)");
  const [modalShow, setModalShow] = useState(false);
  const [targetName, setTargetName] = useState(null)
  const [satelliteNames, setSatelliteNames] = useState([]);
  const [groundstationNames, setGroundstationNames] = useState([])
  const [windowStart, setWindowStart] = useState(null)
  const [windowEnd, setWindowEnd] = useState(null)
  const [success, setSuccess] = useState(false)
  const formRef = React.createRef()

  const timeUnitOptions = ["minutes", "hours", "days", "weeks", "months", "years"]

  let fetchAssetNames = async () => {
    let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
    let response = await axios.get(`${base_url}/assets/names?asset_type=satellite`)
    setSatelliteNames(response.data.satellites)
    setGroundstationNames(response.data.groundstations)
  }

  useEffect(() => {
    fetchAssetNames()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current),
    formDataObj = Object.fromEntries(formData.entries())

    let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
    try {
      let body = {
        Target: targetName,
        Activity: formDataObj.activity,
        Window: {
          Start: windowStart.toISOString(),
          End: windowEnd.toISOString(),
        },
        Duration: moment.duration(formDataObj.duration, formDataObj.durationUnit).asSeconds().toString(),
        RepeatCycle: {
          Frequency: {
            MinimumGap: moment.duration(formDataObj.repeatFrequency, formDataObj.repeatFrequencyUnit).asSeconds().toString(),
            MaximumGap: moment.duration(formDataObj.repeatFrequencyMax, formDataObj.repeatFrequencyMaxUnit).asSeconds().toString(),
          },
          Repetition: formDataObj.repeatCount,
        },
        PayloadOutage: formDataObj.payloadOutage
      }
      let response = await axios.post(`${base_url}/maintenance/orders/create`, body)
      setSuccess(true)
      setMaintenanceId(response.data)
    } catch (error) {
      setSuccess(false)
      throw error;
    }

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
          <Form onSubmit={handleSubmit} className={styles.customForm} ref={formRef}>
            <Row className={styles.formRow}>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Typeahead
                    id="target-typeahead"
                    options={satelliteNames.concat(groundstationNames)}
                    onChange={(selections) => selections.length>0 ? setTargetName(selections[0]) : setTargetName(null)}
                    placeholder="Target"
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" name='activity' required />
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
                    <Form.Control placeholder="Duration" name="duration" required/>
                    <Form.Select name="durationUnit" required>
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
                  <Form.Control type="text" name="repeatCount" required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Repeat Count</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <InputGroup className="mb-3">
                    <Form.Control name="repeatFrequency" placeholder="Repeat frequency (min)" />
                    <Form.Select name="repeatFrequencyUnit">
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
                    <Form.Control name="repeatFrequencyMax" placeholder="Repeat frequency (max)" />
                    <Form.Select name="repeatFrequencyMaxUnit">
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
                  <Form.Select name="payloadOutage" required>
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
        success={success}
      />
    </>
  )
}
