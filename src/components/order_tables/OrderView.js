import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import RemoteDataTable from './RemoteDataTable'
import styles from '../../styles/dashboard.module.scss'
import axios from "axios";
import moment from 'moment'


// const maintenanceOrderColumns = [
//     { Header: 'ID', accessor: 'id' },
//     { Header: 'description', accessor: 'description' },
//     { Header: 'Asset name', accessor: 'asset_name' },
//     { Header: 'Window start', accessor: 'window_start' },
//     { Header: 'Window end', accessor: 'window_end' },
//     { Header: 'Duration', accessor: 'duration' },
//     { Header: 'Delivery deadline', accessor: 'delivery_deadline' },
//     { Header: 'Number of occurrences', accessor: 'number_of_visits' },
//     { Header: 'Repeat frequency (min)', accessor: 'revisit_frequency' },
//     { Header: 'Repeat frequency (max)', accessor: 'revisit_frequency_max' },
//     // { Header: 'Completion rate', accessor: 'completion_rate' },
//     { Header: 'Priority', accessor: 'priority' },
//     { Header: 'Payload outage', accessor: 'payload_outage' },
//     { Header: 'Payload size', accessor: 'downlink_size' },
//     { Header: 'Power usage', accessor: 'power_usage' },
// ];

// const imageOrderColumns = [
//     { Header: 'ID', accessor: 'id' },
//     { Header: 'Window start', accessor: 'window_start' },
//     { Header: 'Window end', accessor: 'window_end' },
//     { Header: 'Duration', accessor: 'duration' },
//     { Header: 'Delivery deadline', accessor: 'delivery_deadline' },
//     { Header: 'Number of occurrences', accessor: 'number_of_visits' },
//     { Header: 'Repeat frequency', accessor: 'revisit_frequency' },
//     // { Header: 'Completion rate', accessor: 'completion_rate' },
//     { Header: 'Priority', accessor: 'priority' },
//     { Header: 'Payload outage', accessor: 'payload_outage' },
//     { Header: 'Payload size', accessor: 'downlink_size' },
//     { Header: 'Power usage', accessor: 'power_usage' },
// ];

// const outageOrderColumns = [
//     { Header: 'ID', accessor: 'id' },
//     { Header: 'Start time', accessor: 'window_start' },
//     { Header: 'End time', accessor: 'window_end' },
//     { Header: 'Duration', accessor: 'duration' },
//     { Header: 'Number of occurrences', accessor: 'number_of_visits' },
//     { Header: 'Repeat frequency', accessor: 'revisit_frequency' },
// ];

const maintenanceOrderColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    { name: 'Asset name', selector: row => row.asset_name, sortable: true },
    { name: 'Window start', selector: row => row.display_window_start, sortable: true },
    { name: 'Window end', selector: row => row.display_window_end, sortable: true },
    { name: 'Duration', selector: row => row.display_duration, sortable: true },
    { name: 'Delivery deadline', selector: row => row.display_delivery_deadline, sortable: true },
    { name: 'Number of occurrences', selector: row => row.number_of_visits, sortable: true },
    { name: 'Repeat frequency (min)', selector: row => row.display_revisit_frequency, sortable: true },
    { name: 'Repeat frequency (max)', selector: row => row.display_revisit_frequency_max, sortable: true },
    // { name: 'Completion rate', selector: row => row.completion_rate, sortable: true },
    { name: 'Priority', selector: row => row.priority, sortable: true },
    { name: 'Payload outage', selector: row => row.payload_outage, sortable: true },
    { name: 'Payload size', selector: row => row.downlink_size, sortable: true },
    { name: 'Power usage', selector: row => row.power_usage, sortable: true },
];

const imageOrderColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Window start', selector: row => row.display_window_start, sortable: true },
    { name: 'Window end', selector: row => row.display_window_end, sortable: true },
    { name: 'Duration', selector: row => row.display_duration, sortable: true },
    { name: 'Delivery deadline', selector: row => row.display_delivery_deadline, sortable: true },
    { name: 'Number of occurrences', selector: row => row.number_of_visits, sortable: true },
    { name: 'Repeat frequency', selector: row => row.display_revisit_frequency, sortable: true },
    // { name: 'Completion rate', selector: row => row.completion_rate, sortable: true },
    { name: 'Priority', selector: row => row.priority, sortable: true },
    { name: 'Payload outage', selector: row => row.payload_outage, sortable: true },
    { name: 'Payload size', selector: row => row.downlink_size, sortable: true },
    { name: 'Power usage', selector: row => row.power_usage, sortable: true },
];

const outageOrderColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Start time', selector: row => row.display_window_start, sortable: true },
    { name: 'End time', selector: row => row.display_window_end, sortable: true },
    { name: 'Duration', selector: row => row.display_duration, sortable: true },
    { name: 'Number of occurrences', selector: row => row.number_of_visits, sortable: true },
    { name: 'Repeat frequency', selector: row => row.display_revisit_frequency, sortable: true },
];

export default function OrderView({orderType, selectedOrderIds, onSelectionChanged}) {
    const columns = orderType === "maintenance" ? maintenanceOrderColumns :
                    orderType === "imaging" ? imageOrderColumns :
                    orderType === "outage" ? outageOrderColumns : [];

    let fetchPaginatedData = async (page, perPage) => {
        try {
            let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
            let url = `${base_url}/${orderType}/orders?page=${page}&per_page=${perPage}`
            const response = await axios.get(url)
            let transformedData = response.data.map(order => transformOrderDataForDisplay(order))
            return {
                data: transformedData,
                total: response.headers['x-total-count']
            }
        } catch (error) {
            throw error;
        }
    }

    return <>
        <div className={styles.dashboardContentRow}>
            <div className={styles.TableCol}>
                <RemoteDataTable
                    title={`${capitalize(orderType)} Orders`}
                    columns={columns}
                    fetchPaginatedData={fetchPaginatedData}
                    preselectedRows={selectedOrderIds}
                    onSelectedRowsChange={selectedRows => onSelectionChanged(selectedRows)}
                />
            </div>
        </div>
    </>
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function transformOrderDataForDisplay(order) {
    // TODO modify the returned json, adding the 'completion_rate' column (visit_count/number_of_visits)
    // Modify status to have emoji displaying visuals for the status
    let duration = moment.duration(order.duration, 'seconds')
    let revisit_frequency = moment.duration(order.revisit_frequency, 'seconds')
    let display_revisit_frequency_max = order.revisit_frequency_max ? moment.utc(moment.duration(order.revisit_frequency_max).asMilliseconds()).format("D[d ] H[h ]m[m ]s[s ]") : undefined
    if (order.window_start) {
        return {
            ...order,
            display_window_start: moment(order.window_start).format("llll"),
            display_window_end: moment(order.window_end).format("llll"),
            display_delivery_deadline: moment(order.delivery_deadline).format("llll"),
            display_duration: moment.utc(duration.asMilliseconds()).format("H[h ]m[m ]s[s ]"),
            display_revisit_frequency: moment.utc(revisit_frequency.asMilliseconds()).format("D[d ] H[h ]m[m ]s[s ]"),
            display_revisit_frequency_max: display_revisit_frequency_max
        }
    } else {
        return {
            ...order,
            display_start_time: moment(order.window_start).format("llll"),
            display_end_time: moment(order.window_end).format("llll"),
            display_duration: moment.utc(duration.asMilliseconds()).format("H[h ]m[m ]s[s ]"),
            display_revisit_frequency: moment.utc(repeat_frequency.asMilliseconds()).format("D[d ] H[h ]m[m ]s[s ]"),
            display_revisit_frequency_max: display_revisit_frequency_max
        }
    }
}