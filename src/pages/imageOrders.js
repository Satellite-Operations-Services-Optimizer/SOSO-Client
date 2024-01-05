import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Container, Button } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import DataTable from '../components/DataTable'
import styles from '../styles/dashboard.module.scss'
import axios from "axios";

const columns = [
  {
    Header: 'Latitude',
    accessor: 'latitude', 
  },
  {
    Header: 'Longitude',
    accessor: 'longitude',
  },
  {
    Header: 'Priority',
    accessor: 'priority',
  },
  {
    Header: 'Image Type',
    accessor: 'imageType',
  },
  {
    Header: 'Image Start Time',
    accessor: 'imageStartTime',
  },
  {
    Header: 'Image End Time',
    accessor: 'imageEndTime',
  },
  {
    Header: 'Delivery Time',
    accessor: 'deliveryTime',
  },
  {
    Header: 'Revisit Time',
    accessor: 'revisitTime',
  },
  // Add more columns as needed
];

// when you add API Url just comment this
const data = [{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "High",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},{
  latitude: -0.3157088942224249,
  longitude: 111.84921138464108,
  priority: 1,
  imageType: "Low",
  imageStartTime: "2023-10-09 T22:58:54",
  imageEndTime: "2023-10-09 T23:58:54",
  deliveryTime: "2023-10-10 T05:58:54",
  revisitTime: "False"
},
];

export default function ImageOrders() {
  // uncomment the below line when you add link in axios
  // const [data, setData] = useState([]);

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
              <div className={styles.dashboardContentRow}>
                <div className={styles.TableCol}>
                  <DataTable 
                    search = {false}
                    tablePagination = {true}
                    columns = {columns}
                    data = {data}
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
    </>
  )
}
