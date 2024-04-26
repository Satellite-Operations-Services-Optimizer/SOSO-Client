import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import RemoteDataTable from './RemoteDataTable'
import styles from '../../styles/dashboard.module.scss'
import axios from "axios";
import { transformOrderDataForDisplay, capitalize } from '../utils'

const maintenanceOrderColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    { name: 'Asset name', selector: row => row.asset_name, sortable: true },
    { name: 'Window start', selector: row => row.display_window_start, sortable: true, sortField: 'window_start'},
    { name: 'Window end', selector: row => row.display_window_end, sortable: true, sortField: 'window_end' },
    { name: 'Duration', selector: row => row.display_duration, sortable: true, sortField: 'duration' },
    { name: 'Delivery deadline', selector: row => row.display_delivery_deadline, sortable: true, sortField: 'delivery_deadline' },
    { name: 'Number of occurrences', selector: row => row.number_of_visits, sortable: true },
    { name: 'Repeat frequency (min)', selector: row => row.display_revisit_frequency, sortable: true, sortField: 'revisit_frequency' },
    { name: 'Repeat frequency (max)', selector: row => row.display_revisit_frequency_max, sortable: true, sortField: 'revisit_frequency_max' },
    // { name: 'Completion rate', selector: row => row.completion_rate, sortable: true },
    { name: 'Priority', selector: row => row.priority, sortable: true },
    { name: 'Payload outage', selector: row => row.payload_outage, sortable: true },
    { name: 'Payload size', selector: row => row.downlink_size, sortable: true },
    { name: 'Power usage', selector: row => row.power_usage, sortable: true },
];

const imageOrderColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Image Type', selector: row => row.image_type, sortable: true },
    { name: 'Latitude', selector: row => row.latitude, sortable: true },
    { name: 'Longitude', selector: row => row.longitude, sortable: true },
    { name: 'Window start', selector: row => row.display_window_start, sortable: true, sortField: 'window_start'},
    { name: 'Window start', selector: row => row.display_window_start, sortable: true, sortField: 'window_start' },
    { name: 'Window end', selector: row => row.display_window_end, sortable: true, sortField: 'window_end' },
    { name: 'Duration', selector: row => row.display_duration, sortable: true, sortField: 'duration' },
    { name: 'Delivery deadline', selector: row => row.display_delivery_deadline, sortable: true, sortField: 'delivery_deadline' },
    { name: 'Number of occurrences', selector: row => row.number_of_visits, sortable: true },
    { name: 'Repeat frequency', selector: row => row.display_revisit_frequency, sortable: true, sortField: 'revisit_frequency' },
    // { name: 'Completion rate', selector: row => row.completion_rate, sortable: true },
    { name: 'Priority', selector: row => row.priority, sortable: true },
    { name: 'Payload outage', selector: row => row.payload_outage, sortable: true },
    { name: 'Payload size', selector: row => row.downlink_size, sortable: true },
    { name: 'Power usage', selector: row => row.power_usage, sortable: true },
];

const outageOrderColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Asset name', selector: row => row.asset_name, sortable: true },
    { name: 'Start time', selector: row => row.display_window_start, sortable: true, sortField: 'window_start' },
    { name: 'End time', selector: row => row.display_window_end, sortable: true, sortField: 'window_end' },
    { name: 'Duration', selector: row => row.display_duration, sortable: true, sortField: 'duration' },
    { name: 'Number of occurrences', selector: row => row.number_of_visits, sortable: true },
    { name: 'Repeat frequency', selector: row => row.display_revisit_frequency, sortable: true, sortField: 'revisit_frequency' },
];

export default function OrderView({orderType, preselectedRows, onSelectionChanged}) {
    const columns = orderType === "maintenance" ? maintenanceOrderColumns :
                    orderType === "imaging" ? imageOrderColumns :
                    orderType === "outage" ? outageOrderColumns : [];

    let fetchPaginatedData = async (page, perPage) => {
        try {
            let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
            let endpoint = `${base_url}/${orderType}/orders?page=${page}&per_page=${perPage}`
            const response = await axios.get(endpoint)
            let transformedData = response.data.data.map(order => transformOrderDataForDisplay(order))
            return {
                data: transformedData,
                total: parseInt(response.data.total)
            }
        } catch (error) {
            throw error;
        }
    }

    let declineRequests = async (orderIds) => {
        let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
        try {
            for (let orderId of orderIds) {
                await axios.post(`${base_url}/${orderType}/orders/${orderId}/requests/decline`)
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
                    preselectedRows={preselectedRows}
                    onSelectedRowsChange={selectedRows => onSelectionChanged(selectedRows)}
                    actionTitle="Decline"
                    actionWarning="Are you sure you want to decline all schedule requests from the selected orders?"
                    handleAction={(rows) => declineRequests(rows.map(row => row.id))}
                />
            </div>
        </div>
    </>
}
