import React from 'react';
import moment from "moment";

export default function EvenDisplay({event}) {
    let duration = moment.duration(event.duration, 'seconds')

    let latitude
    let longitude
    if (event["event_type"]=="imaging" || event["event_type"]=="capture") {
        latitude = event['latitude']
        longitude = event['longitude']
    }
    return <>
        <div>Event type: {event["event_type"]}</div>
        {event['id'] && <div>ID: {event['id']}</div>}
        {event["groundstation_id"] && <div>Ground station: {event["groundstation_id"]}</div>}
        {event['latitude'] && <div>Latitude: {event['latitude']}</div>}
        {event['longitude'] && <div>Longitude: {event['longitude']}</div>}
        {event['image_type'] && <div>Image type: {event['image_type']}</div>}
        <div>Start time: {moment(event["start_time"]).format("llll")}</div>
        <div>Duration: {moment.utc(duration.asMilliseconds()).format("H[h ]m[m ]s[s ]")}</div>
    </>
}
