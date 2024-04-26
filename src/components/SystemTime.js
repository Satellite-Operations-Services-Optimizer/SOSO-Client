import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import styles from "../styles/dashboard.module.scss";
import axios from "axios"
import moment from 'moment'
import Clock from "react-live-clock";

const SystemTime = () => {
  const [scheduleId, setScheduleId] = useState(null)
  const [timeOffset, setTimeOffset] = useState(null)
  const [clockStartingTime, setClockStartingTime] = useState(null)
  const formRef = React.createRef()


  let initializeTime = async () => {
    let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
    let response = await axios.get(`${base_url}/schedules/default`)
    let schedule = response.data
    setScheduleId(schedule.id)
    setTimeOffset(schedule.time_offset)
  }

  useEffect(() => {
    initializeTime()
  }, [])

  useEffect(() => {
    let currentTime = new Date().getTime()
    let timeOffsetMillis = timeOffset * 1000
    setClockStartingTime(new Date(currentTime + timeOffsetMillis))
  }, [timeOffset])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData(formRef.current)
    let formDataObj = Object.fromEntries(formData.entries())
    let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
    let reference_time = formDataObj.referenceTime
    let response = await axios.post(`${base_url}/schedules/${scheduleId}/set_reference_time?reference_time=${reference_time}`)
    setTimeOffset(response.data.time_offset)
  }

  return (
    <div className={styles.systemTimeWrap}>
      <h4>System Time Settings</h4>
      <div className={styles.systemTime}>
        <h6>Current System Time</h6>
        <Clock
          date={clockStartingTime ? clockStartingTime.toISOString() : new Date().toISOString()}
          format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
          className={styles.clockText}
          // ticking={true}
          timezone={"Canada/Eastern"}
          onChange={(date) => {
            console.log(new Date(date))
          }}
        />
      </div>
      <Form className={styles.customForm} onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.formGroup}>
          <Form.Label>Set System Reference Time</Form.Label>
          <Form.Control name="referenceTime" type="datetime-local" placeholder="Pick date and time" />
        </div>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default SystemTime