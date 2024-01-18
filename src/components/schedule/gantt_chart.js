import React, { useEffect, useState, useRef } from "react";
// import {Gantt} from "frappe-gantt/dist/frappe-gantt";
import { Gantt } from 'gantt-task-react'
import "gantt-task-react/dist/index.css"
import moment from "moment";


export default function ScheduleGanttChart({events}) {
    const [viewMode, setViewMode] = useState("Hour")
    const [viewDate, setViewDate] = useState(new Date())
    if (!events?.length) return <>No Events Scheduled</>

    const eventIdxMap = {}
    const tasks = events.map((event, idx) => {
        const event_id = create_event_id(event)
        eventIdxMap[event_id] = idx
        const start = new Date(event["start_time"])
        const end = new Date(start.getTime() + event["duration"]*1000)
        console.log(start)
        console.log(end)
        return  {
            id: event_id,
            name: event["event_type"],
            type: "task",
            start: start,
            end: end,
            isDisabled: true,
            project: event["asset_name"]
        }
    })

    return <>
        <Gantt
            tasks={tasks}
            viewMode={viewMode}
            viewDate={viewDate}
            // rtl={true}
        />
    </>
}

function create_event_id(event) {
    const event_id =  `${event["event_type"]}_${event["id"]}` // id is not unique across all events, so we need to add the event type to the id
    console.log(event_id)
    return event_id
}