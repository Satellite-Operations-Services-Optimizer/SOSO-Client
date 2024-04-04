import React, { useState, useEffect } from 'react'
import Viewer2D from "./Map/Viewer2D/Viewer2D";
import Viewer3D from "./Map/Viewer3D/Viewer3D";
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

const AssetMap = () => {
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

    return (
      <>
        <Viewer2D></Viewer2D>
        <Viewer3D></Viewer3D>
      </>
    )
}

export default AssetMap