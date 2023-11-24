import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import { Container, Button } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import DataTable from '../components/DataTable'
import styles from '../styles/dashboard.module.scss'
import axios from "axios";

const columns = [
  {
    Header: 'Target',
    accessor: 'asset_name', // Property name in data
  },
  {
    Header: 'Activity',
    accessor: 'description',
  },
  {
    Header: 'Window Start',
    accessor: 'start_time',
  },
  {
    Header: 'WindowEnd',
    accessor: 'end_time',
  },
  {
    Header: 'Duration',
    accessor: 'duration',
  },
  {
    Header: 'RepeatCycle Frequency MinimumGap',
    accessor: 'frequency_min',
  },
  {
    Header: 'RepeatCycle Frequency MaximumGap',
    accessor: 'frequency_max',
  },
  {
    Header: 'RepeatCycle Repetition',
    accessor: 'repetition',
  },
  {
    Header: 'PayloadOutage',
    accessor: 'operations_flag',
  },
   {
     Header: 'Action',
     accessor: 'actions',
     Cell: () => (
       <Button type="button">Decline</Button>
     ),
   },
  // Add more columns as needed
];

/* const data = [{
  target: "SOSO-3",
  activity: "OrbitManeuver",
  windowStart: "2023-10-09 T10:11:34",
  windowEnd: "2023-10-09 T10:26:34",
  duration: "900",
  repeatCycleFrequencyMinimumGap: "Null",
  repeatCycleFrequencyMaximumGap: "Null",
  repeatCycleRepetition: "Null",
  payloadOutage: "TRUE"
}]; */

export default function OrbitManeuver() {
  const [data, setData] = useState([]);
  const [hideShowSidebar, setHideShowSidebar] = useState(true);

  useEffect(() => {
    // just change the url and uncomment the inner code
    axios.get("http://127.0.0.1:1527/maintenance/orbit-maneuvers").then((response) => {
      setData(response.data.data);
    });
  }, []);
  

  return (
    <>
      <Head>
        <title>SOSO Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='dashboard'>
        <DashBoardHeader 
          setHideShowSidebar = {setHideShowSidebar}
          hideShowSidebar = {hideShowSidebar}
        />
        <Sidebar 
          hideShowSidebar={hideShowSidebar}
        />
        <div className={hideShowSidebar ? "dashboardContent" : "dashboardContent sidebar--open"}>
          <div className={styles.dashboardMainContent}>
            <Container className={styles.container}>
              <div className={styles.dashboardContentRow}>
                <div className={styles.TableCol}>
                  <DataTable 
                    search = {true}
                    tablePagination = {true}
                    columns = {columns}
                    data = {data}
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </main>
    </>
  )
}
