import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import styles from '../styles/dashboard.module.scss'
import axios from "axios";
import ScheduleTimeline from "../components/schedule/timeline"
import ScheduleTableView from "@/components/schedule/tableView";
import { Box, Tab, Tabs, Select, InputLabel, MenuItem, FormControl } from "@mui/material";

export async function getStaticProps() {
  const response = await axios.get("http://localhost:5000/schedules/")
  const data = response.data.reduce((acc, schedule_json) => {
    acc[schedule_json['name']] = schedule_json
    return acc
  }, {})
  return {
    props: {
      schedules: data
    }
  }
}

let displayed_event_types = ["eclipse", "contact", "observation"] // "imaging", "maintenance", "gs_outage", "sat_outage"

export default function ScheduleView({schedules}) {
  const defaultScheduleName = "Default Schedule"
  const [tab, setTab] = useState(0);
  const [currentScheduleName, setCurrentScheduleName] = useState(defaultScheduleName)
  const [scheduledEvents, setScheduledEvents] = useState([])

  const updateScheduledEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/schedules/${schedules[currentScheduleName]?.id}/events`)
      let events = response.data.filter(
        (event) => event.event_type==="eclipse" || event.event_type=="contact" || event.event_type=="observation"//event.event_type === "imaging" || event.event_type === "maintenance" || event.event_type == "gs_outage" || event.event_type == "sat_outage"
      )
      setScheduledEvents(events)
    } catch {
      setScheduledEvents([])
    }
  }

  useEffect(() => {
    updateScheduledEvents()
  }, [currentScheduleName])

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
              <FormControl>
                <InputLabel id="schedule-select-label">Schedule</InputLabel>
                <Select
                  labelId="schedule-select-label"
                  id="schedule-select"
                  defaultValue={defaultScheduleName}
                  label="Schedule"
                  onChange={(event) => setCurrentScheduleName(event.target.value)}
                >
                  {Object.keys(schedules).map((schedule_name, idx) => {
                    return <MenuItem key={idx} value={schedule_name.trim()}>{schedule_name}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <Box sx={{ width: "100%", marginBottom: "15px" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={tab} onChange={(_, value) => setTab(value)} aria-label="Tabs">
                    <Tab label="Table View" />
                    <Tab label="Timeline View" />
                  </Tabs>
                </Box>
              </Box>
              <Box sx={{ width: "100%", marginBottom: "15px" }}>
                {tab == 0 ? <ScheduleTableView events={scheduledEvents}/> : <ScheduleTimeline events={scheduledEvents}/>}
              </Box>
            </Container>
          </div>
        </div>
      </main>
    </>
  )
}

