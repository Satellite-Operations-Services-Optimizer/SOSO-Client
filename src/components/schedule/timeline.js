import React, { useEffect, useState, useRef } from "react";
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css';
import moment, { max } from "moment";


export default function ScheduleTimeline({events}) {
    if (!events?.length) return <>No Events Scheduled</>

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
                title: group_title,
            }
            max_group_id += 1
        }

        items.push({
            id: event_id,
            group: groups_by_title[group_title].id,
            title: event["event_type"],
            start_time: start,
            end_time: end,
        })
    })

    return <>
        <Timeline
            groups={Object.values(groups_by_title)}
            items={items}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
        />
    </>
}

function create_event_id(event) {
    const event_id =  `${event["event_type"]}_${event["id"]}` // id is not unique across all events, so we need to add the event type to the id
    console.log(event_id)
    return event_id
}