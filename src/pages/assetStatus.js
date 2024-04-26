"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import DataTable from "../components/tables/DataTable";
import styles from "../styles/dashboard.module.scss";
import AddGSModal from "../components/AddGSModal";
import AddSATModal from "../components/AddSATModal";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Viewer2D from "@/components/Map/Viewer2D/Viewer2D";
import Viewer3D from "@/components/Map/Viewer3D/Viewer3D";
import useWebSocket, { ReadyState } from "react-use-websocket";

const port = 5001;
const WS_URL1 = "ws://localhost:" + port + "/assets/satellites/1/state";
const WS_URL2 = "ws://localhost:" + port + "/assets/satellites/2/state";
const WS_URL3 = "ws://localhost:" + port + "/assets/satellites/3/state";
const WS_URL4 = "ws://localhost:" + port + "/assets/satellites/4/state";
const WS_URL5 = "ws://localhost:" + port + "/assets/satellites/5/state";

const webSocketOptions = (satelliteNo) => {
  return {
    shouldReconnect: (event) => true,
    retryOnError: true,
    reconnectAttempts: 30,
    reconnectInterval: 1000,
    onMessage: (event) => {
      console.log(
        "Satellite " + satelliteNo + " | " + "Received message " + event.data
      );
    },
    onClose: (event) => {
      console.log(
        "Satellite " + satelliteNo + " | " + "Connection Closed " + event
      );
    },
    onError: (event) => {
      console.log(
        "Satellite " + satelliteNo + " | " + "Error encountered " + event
      );
    },
    onOpen: (event) => {
      console.log(
        "Satellite " + satelliteNo + " | " + "Connection Opened " + event
      );
    },
    heartbeat: {
      message: "connect",
      timeout: 60000, // 1 minute, if no response is received, the connection will be closed
      interval: 25000, // every 25 seconds, a ping message will be sent
    },
  };
};

const columns = [
  {
    Header: "GS",
    accessor: "gs",
  },
  {
    Header: "In Contact",
    accessor: "inContact",
  },
  {
    Header: "Duration",
    accessor: "duration",
  },
  {
    Header: "Lost of signal",
    accessor: "lostOfSignal",
  },
];

// when you add API Url just comment this
const data = [
  {
    gs: 1,
    inContact: "SAT 1",
    duration: "10 minutes",
    lostOfSignal: "16:30:00",
  },
  {
    gs: 1,
    inContact: "False",
    duration: "False/O",
    lostOfSignal: "00:00:00",
  },
  {
    gs: 1,
    inContact: "SAT 4",
    duration: "12 minutes",
    lostOfSignal: "18:40:00",
  },
];

const columns2 = [
  {
    Header: "SAT",
    accessor: "sat", // Property name in your data
  },
  {
    Header: "Storage Current",
    accessor: "storageCurrent",
  },
  {
    Header: "Main",
    accessor: "main",
  },
  {
    Header: "Out",
    accessor: "out",
  },
  {
    Header: "Power",
    accessor: "power",
  },
];

// when you add API Url just comment this
const data2 = [
  {
    sat: 1,
    storageCurrent: "32gb",
    main: "False",
    out: "False",
    power: "Eclipse",
  },
  {
    sat: 2,
    storageCurrent: "16gb",
    main: "True",
    out: "False",
    power: "Sunlight",
  },
];

export default function AssetStatus() {
  const { sendMessage1, lastMessage1, readyState1 } = useWebSocket(
    WS_URL1,
    webSocketOptions("1")
  );

  const { sendMessage2, lastMessage2, readyState2 } = useWebSocket(
    WS_URL2,
    webSocketOptions("2")
  );

  const { sendMessage3, lastMessage3, readyState3 } = useWebSocket(
    WS_URL3,
    webSocketOptions("3")
  );

  const { sendMessage4, lastMessage4, readyState4 } = useWebSocket(
    WS_URL4,
    webSocketOptions("4")
  );

  const { sendMessage5, lastMessage5, readyState5 } = useWebSocket(
    WS_URL5,
    webSocketOptions("5")
  );

  //Access the following states to get the satellite data from the websocket
  const [satellite1, setSatellite1] = useState(null);
  const [satellite2, setSatellite2] = useState(null);
  const [satellite3, setSatellite3] = useState(null);
  const [satellite4, setSatellite4] = useState(null);
  const [satellite5, setSatellite5] = useState(null);

  useEffect(() => {
    setSatellite1(lastMessage2 == null ? satellite1 : lastMessage2.data);
    setSatellite2(lastMessage2 == null ? satellite2 : lastMessage2.data);
    setSatellite3(lastMessage3 == null ? satellite3 : lastMessage3.data);
    setSatellite4(lastMessage4 == null ? satellite4 : lastMessage4.data);
    setSatellite5(lastMessage5 == null ? satellite5 : lastMessage5.data);
  }, [lastMessage1, lastMessage2, lastMessage3, lastMessage4, lastMessage5]);

  // uncomment the below line when you add link in axios
  // const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openDropdown, setOpenDropdown] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 0) {
    }
  };

  useEffect(() => {
    // just change the url and uncomment the inner code
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      // setData(response.data);
    });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dashboard">
        <Sidebar />
        <DashBoardHeader />
        <div className="dashboardContent">
          <div className={styles.dashboardMainContent}>
            <Container className={styles.container}>
              <Box sx={{ width: "100%", marginBottom: "15px" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange} aria-label="Tabs">
                    <Tab label="ASSET STATUS" />
                    <Tab label="ASSET MAPS" />
                  </Tabs>
                </Box>
              </Box>
              {value == 0 ? (
                <div className={styles.dashboardContentRow}>
                  <div className={styles.TableCol}>
                    <div className={styles.TableHeading}>
                      <div className={styles.assetsDropdown}>
                        <Button
                          type="button"
                          className={styles.assetsDropdownBtn}
                          onClick={() => setOpenDropdown(!openDropdown)}
                        >
                          <MdAdd />
                          Add Assets
                          {/* {dropdown1 ? <IoIosArrowUp /> : <IoIosArrowDown />} */}
                        </Button>
                        {openDropdown && (
                          <div className={styles.assetsDropdownMenu}>
                            <Button
                              type="button"
                              onClick={() => setShowModal1(true)}
                            >
                              <span>Add Station</span>
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setShowModal2(true)}
                            >
                              <span>Add Satellite</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <DataTable
                      search={false}
                      tablePagination={true}
                      columns={columns}
                      data={data}
                      rowSeletion={false}
                      actionBtn={false}
                      actionBtnText=""
                    />
                    <hr />
                    <DataTable
                      search={false}
                      tablePagination={true}
                      columns={columns2}
                      data={data2}
                      rowSeletion={false}
                      actionBtn={false}
                      actionBtnText=""
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Viewer2D></Viewer2D>
                  <Viewer3D></Viewer3D>
                </>
              )}
            </Container>
          </div>
        </div>
      </main>
      <AddGSModal showModal1={showModal1} setShowModal1={setShowModal1} />
      <AddSATModal showModal2={showModal2} setShowModal2={setShowModal2} />
    </>
  );
}
