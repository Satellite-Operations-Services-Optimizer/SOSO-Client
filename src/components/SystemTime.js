import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import styles from "../styles/dashboard.module.scss";

const SystemTime = () => {

  // const [currentDateTime, setCurrentDateTime] = useState("2024-03-21 15:10:19");
  // const givenTime = new Date(currentDateTime);
  // const seconds = givenTime.getTime() / 1000;
  // console.log(seconds, "seconds");

  // const [newDateTime, setNewDateTime] = useState(seconds);
  
  // setInterval(() => {
  //   setNewDateTime(parseInt(newDateTime) + 1);
  //   console.log(newDateTime, "newDateTime");
  //   const dateTime = new Date(newDateTime * 1000); 
  //   console.log(dateTime, "dateTime");
  // }, 1000);

  return (
    <div className={styles.systemTimeWrap}>
      <h4>System Time Settings</h4>
      <div className={styles.systemTime}>
        <h6>Current Time</h6>
        <p>2024-03-21 15:10:19 PM</p>
      </div>
      <Form className={styles.customForm}>
        <div className={styles.formGroup}>
          <Form.Label>Pick Date and Time:</Form.Label>
          <Form.Control type="datetime-local" placeholder="Pick date and time" />
        </div>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default SystemTime