import React, {useState} from 'react'
import Head from 'next/head'
import { Container, Button } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import DataTable from '../components/order_tables/DataTable'
import MaintenanceRequestModal from '../components/order_creation_modals/MaintenanceOrderCreationModal'
import { MdAdd } from "react-icons/md";
import styles from '../styles/dashboard.module.scss'

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
  // {
  //   Header: '',
  //   accessor: 'actions',
  //   Cell: () => (
  //     <Button type="button">Decline</Button>
  //   ),
  // },
  // Add more columns as needed
];

const data = [{
  target: "SOSO-1",
  activity: "Payload Diagnostic Activity",
  windowStart: "2023-10-08 T00:00:00",
  windowEnd: "2023-10-15 T23:59:59",
  duration: "300",
  repeatCycleFrequencyMinimumGap: "72000",
  repeatCycleFrequencyMaximumGap: "100800",
  repeatCycleRepetition: "7",
  payloadOutage: "TRUE"
}];

export default function PayloadDiagnosticActivity() {
  const [showModal, setShowModal] = useState(false);

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
