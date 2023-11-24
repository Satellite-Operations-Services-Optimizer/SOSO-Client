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
    accessor: 'latitude', // Property name in data
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
    Header: 'Image Resolution',
    accessor: 'image_res',
  },
  {
    Header: 'Image Start Time',
    accessor: 'start_time',
  },
  {
    Header: 'Image End Time',
    accessor: 'end_time',
  },
  {
    Header: 'Delivery Deadline',
    accessor: 'delivery_deadline',
  },
/*   {
    Header: 'Revisit Time',
    accessor: 'revisitTime',
  }, */
  {
    Header: '',
    accessor: 'actions',
    Cell: () => (
      <Button type="button">Decline</Button>
    ),
  },
  // Add more columns as needed
];

// when you add API Url just comment this
/* const data = [{
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
]; */

export default function ImageOrders() {
  // uncomment the below line when you add link in axios
  const [data, setData] = useState([]);
  const [hideShowSidebar, setHideShowSidebar] = useState(true);

  useEffect(() => {
    // just change the url and uncomment the inner code
    axios.get("http://127.0.0.1:1527/images/image-orders").then((response) => {
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
