import React, { useEffect, useState, useRef } from "react";
import { renderToString } from "react-dom/server";
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import { Timeline } from "vis-timeline/esnext";
import { ButtonGroup, Button, IconButton } from "@mui/material";
import { MyLocation } from '@mui/icons-material'
import moment from "moment";
import EventDisplay from "./EventDisplay";

let eventColors = {
  "eclipse": "grey",
  "contact": "green",
  "observation": "blue",
  "imaging": "orange",
  "maintenance": "purple",
  "gs_outage": "red",
  "sat_outage": "red",
}

export default function ScheduleTimeline({events}) {
    if (!events?.length) return <>No Events Scheduled</>
    const timelineRef = useRef(null)
    const [timeline, setTimeline] = useState(null)
    const [rollingMode, setRollingMode] = useState(true)

    let default_start = localStorage.getItem('timelineStart') || undefined
    let default_end = localStorage.getItem('timelineEnd') || undefined
    let default_follow = !(default_start & default_end)
    let options = {
        start: default_start,
        end: default_end,
        editable: false,
        tooltip: {followMouse: false},
        rollingMode: {follow: false},
        zoomMin: 1000 * 60, // one minute in milliseconds
        zoomMax: 1000 * 60 * 60 * 24 * 31, // about one month in milliseconds 
    }



    let {items, groups} = parse_events(events||[])
    useEffect(() => {
        let tmline = new Timeline(timelineRef.current, items, groups, options)
        setTimeline(tmline)
        tmline.on('rangechanged', function (properties) {
            const { start, end } = properties;
            localStorage.setItem('timelineStart', start);
            localStorage.setItem('timelineEnd', end);
        })
        tmline.on('onInitialDrawComplete', function () {
            tmline.setOptions({rollingMode: false})
            tmline.setWindow(default_start, default_end);
        })
        return () => {
            tmline.destroy()
        }
    }, [])
    
    useEffect(() => {
        if (!timeline) return
        focusTimeline('hour')
        // setRollingMode(true)
    }, [timeline])
    // useEffect(() => {
    //     if (!timeline) return
    //     if (rollingMode) {
    //         timeline.setOptions({ rollingMode: {follow: true, offset: 0.5} })
    //     } else {
    //         timeline.setOptions({rollingMode: false})
    //     }
    // }, [timeline, rollingMode])

    function focusTimeline(timeUnit) {
        let start = moment().startOf(timeUnit)
        let end = moment().endOf(timeUnit)
        timeline.setOptions({rollingMode: false})
        timeline.setWindow(start, end)
    }
    function focusSelected() {
        // timeline.setOptions({rollingMode: false})
        timeline.focus(timeline.getSelection())
    }

    return <>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonGroup variant="outlined">
                <Button onClick={() => focusTimeline('hour')}>Hour</Button>
                <Button onClick={() => focusTimeline('day')}>Day</Button>
                <Button onClick={() => focusTimeline('week')}>Week</Button>
            </ButtonGroup>
            <IconButton onClick={() => focusSelected()}><MyLocation/></IconButton>
        </div>
        <div id="event-timeline" ref={timelineRef}></div>
    </>
}

function parse_events(events) {
    const items = []
    const groups_by_title = {}
    let max_group_id = 0

    events.map((event, idx) => {
        const event_id = create_event_id(event)
        const start = moment(event["start_time"])
        const end = moment(start).add(event["duration"], 'seconds');
        const group_title = event["asset_name"]

        if (!groups_by_title[group_title]) {
            groups_by_title[group_title] = {
                id: max_group_id + 1,
                content: group_title,
            }
            max_group_id += 1
        }

        items.push({
            id: event_id,
            group: groups_by_title[group_title].id,
            content: event["event_type"],
            start,
            end,
            style: `background-color: ${eventColors[event["event_type"]]}; outline: 1px solid ${eventColors[event["event_type"]]};`,
            title: renderToString(<EventDisplay event={event} />)
        })
    })
    return {
        items,
        groups: Object.values(groups_by_title)
    }
}

function create_event_id(event) {
    const event_id =  `${event["event_type"]}_${event["id"]}` // id is not unique across all events, so we need to add the event type to the id
    return event_id
}