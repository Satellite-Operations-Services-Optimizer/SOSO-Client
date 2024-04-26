import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Container, Button, Modal } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import DataTable from '../components/tables/DataTable'
import MaintenanceRequestModal from '../components/order_creation_modals/MaintenanceOrderCreationModal'
import { MdAdd } from "react-icons/md";
import styles from '../styles/dashboard.module.scss'
import axios from "axios";

const columns = [
  {
    Header: 'Target',
    accessor: 'target', 
  },
  {
    Header: 'Activity',
    accessor: 'activity',
  },
  {
    Header: 'Window Start',
    accessor: 'windowStart',
  },
  {
    Header: 'WindowEnd',
    accessor: 'windowEnd',
  },
  {
    Header: 'Duration',
    accessor: 'duration',
  },
  {
    Header: 'RepeatCycle Frequency MinimumGap',
    accessor: 'repeatCycleFrequencyMinimumGap',
  },
  {
    Header: 'RepeatCycle Frequency MaximumGap',
    accessor: 'repeatCycleFrequencyMaximumGap',
  },
  {
    Header: 'RepeatCycle Repetition',
    accessor: 'repeatCycleRepetition',
  },
  {
    Header: 'PayloadOutage',
    accessor: 'payloadOutage',
  },
  // Add more columns as needed
];

const data = [{
  target: "SOSO-1",
  activity: "MemoryScrub",
  windowStart: "2023-10-08 T00:00:00",
  windowEnd: "2023-10-15 T23:59:59",
  duration: "180",
  repeatCycleFrequencyMinimumGap: "144000",
  repeatCycleFrequencyMaximumGap: "216000",
  repeatCycleRepetition: "3",
  payloadOutage: "TRUE"
}];

export default function MemoryScrub() {
  // uncomment the below line when you add link in axios
  // const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // just change the url and uncomment the inner code
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      // setData(response.data);
    });
  }, []);
  
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
              <Button type="button" className={styles.maintenanceRequestBtn} onClick={() => setShowModal(true)}><MdAdd />Maintenance Request Modal</Button>
              <div className={styles.dashboardContentRow}>
                <div className={styles.TableCol}>
                  <DataTable 
                    search = {false}
                    tablePagination = {true}
                    columns = {columns}
                    data = {data}
                    maintenanceButton = {true}
                    rowSeletion = {true}
                    actionBtn= {true}
                    actionBtnText= "Decline"
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </main>
      <MaintenanceRequestModal
        showModal={showModal} 
        setShowModal={setShowModal}
      />
    </>
  )
}
