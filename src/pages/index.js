import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Container, Button, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import styles from '../styles/dashboard.module.scss'



export default function Home() {
  // uncomment the below line when you add link in axios
  // const [data, setData] = useState([]);
  
  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='dashboard'>
        <Sidebar/>
        <DashBoardHeader />
        <div className="dashboardContent">
          <div className={styles.dashboardMainContent}>
            <Container className={styles.container}>
              <Row>
                <Col sm={12}>
                  <div className={styles.graphCardWrap}>
                    <h6>Events Rate</h6>
                    <div className={styles.graphCard}>
                      {/* add graph here */}
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className={styles.graphCardWrap}>
                    <h6>Order Status Breakdown</h6>
                    <div className={styles.graphCard}>
                      {/* add graph here */}
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className={styles.graphCardWrap}>
                    <h6>Resource Utilization</h6>
                    <div className={styles.graphCard}>
                      {/* add graph here */}
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className={styles.graphCardWrap}>
                    <h6>System Alerts</h6>
                    <div className={styles.graphCard}>
                      {/* add graph here */}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </main>
    </>
  )
}
