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

export default function ImageOrderCreationModal({showModal, setShowModal}) {
  const [orderId, setOrderId] = useState(undefined)
  const [success, setSuccess] = useState(false)
  const [imageType, setImageType] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [deliverByTime, setDeliverByTime] = useState(null)
  const formRef = React.createRef()
  const imageTypeOptions = ["low", "medium", "high"]
  const timeUnitOptions = ["minutes", "hours", "days", "weeks", "months", "years"]

  const [modalShow, setModalShow] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current),
    formDataObj = Object.fromEntries(formData.entries())

    let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
    try {
        let body = {
            Latitude: parseFloat(formDataObj.latitude),
            Longitude: parseFloat(formDataObj.longitude),
            Priority: parseInt(formDataObj.priority),
            ImageType: imageType,
            ImageStartTime: startTime.toISOString(),
            ImageEndTime: endTime.toISOString(),
            DeliveryTime: deliverByTime.toISOString(),
            Recurrence: formDataObj.repeatCount < 1 ? [{Revisit: "False"}] : {
                Revisit: "True",
                NumberOfRevisits: parseInt(formDataObj.repeatCount),
                RevisitFrequency: parseInt(formDataObj.repeatFrequency),
                RevisitFrequencyUnits: formDataObj.repeatFrequencyUnit,
            },
        };
      let response = await axios.post(`${base_url}/imaging/orders/create`, body)
      setSuccess(true)
      setOrderId(response.data)
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
          <Modal.Title className={styles.customModalTitle}>Image Order Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.customModalBody}>
          <Form onSubmit={handleSubmit} className={styles.customForm} ref={formRef}>
            <Row className={styles.formRow}>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" name='latitude' required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Latitude</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" name='longitude' required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Longitude</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Form.Control type="text" name='priority' required />
                  <span className={styles.inputBar}></span>
                  <Form.Label>Priority</Form.Label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Typeahead
                    id="image-type-typeahead"
                    options={imageTypeOptions}
                    onChange={(selections) => selections.length>0 ? setImageType(selections[0]) : setImageType(null)}
                    placeholder="Image Type"
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Datetime value={startTime} onChange={setStartTime} inputProps={{placeholder: 'Start Time'}}/>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Datetime value={endTime} onChange={setEndTime} inputProps={{placeholder: 'End Time'}}/>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" className={styles.formCol}>
                <div className={styles.materialInput}>
                  <Datetime value={deliverByTime} onChange={setDeliverByTime} inputProps={{placeholder: 'Deliver By'}}/>
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
                    <Form.Control name="repeatFrequency" placeholder="Repeat frequency" />
                    <Form.Select name="repeatFrequencyUnit">
                      {timeUnitOptions.map((option) => {
                        return (<option value={option}>{option}</option>)
                      })}
                    </Form.Select>
                    <span className={styles.inputBar}></span>
                  </InputGroup>
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
        orderId={orderId}
        success={success}
      />
    </>
  )
}
