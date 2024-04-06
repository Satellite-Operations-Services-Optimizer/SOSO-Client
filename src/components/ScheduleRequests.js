import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import styles from "../styles/scheduleRequestsTable.module.scss";

registerAllModules();

const tableData = [
  {
    parentChildID: 'P1',
    latitude: null,
    longitude: null,
    priority: "From 1 to 3",
    imageType: "From High to Low", 
    startDate: null, 
    endDate: null, 
    deliveryTime: null, 
    revisitTime: "False (No Grouping of Child orders)", 
    captureTime: null, 
    causeOfRejection: "If success, then print image captured.",
    __children: [
      { 
        parentChildID: 'C5',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C4',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C3',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C2',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C1',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
    ],
  },
  {
    parentChildID: 'P2',
    latitude: null,
    longitude: null,
    priority: "From 1 to 3",
    imageType: "From High to Low", 
    startDate: null, 
    endDate: null, 
    deliveryTime: null, 
    revisitTime: "False (No Grouping of Child orders)", 
    captureTime: null, 
    causeOfRejection: "If success, then print image captured.",
    __children: [
      { 
        parentChildID: 'C5',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C4',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C3',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C2',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
      {
        parentChildID: 'C1',
        latitude: null,
        longitude: null,
        priority: null,
        imageType: null, 
        startDate: null, 
        endDate: null, 
        deliveryTime: null, 
        revisitTime: null, 
        captureTime: null, 
        causeOfRejection: null,
      },
    ],
  },
];

const ScheduleRequests = () => {

  return (
    <div className={`scheduleRequestsTable ${styles.scheduleRequestsTableWrap}`}>
        <HotTable
          data={tableData}
          width="100%"
          height= "calc(100vh - 185px)"
          rowHeaders={true}
          colHeaders={['Parent ID (Grouping for Child ID)', 'Latitude', 'Longitude', 'Priority', 'Image Type', 'Start Date', "End Date", 'Delivery Time', 'Revisit Time', 'Capture Time', 'Cause of Rejection']}
          nestedRows={true}
          // contextMenu={true}
          bindRowsWithHeaders={true}
          manualRowMove={true}
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />
    </div>
  )
}

export default ScheduleRequests