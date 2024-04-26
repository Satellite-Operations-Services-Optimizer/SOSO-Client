import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import styles from '../../styles/dashboard.module.scss'
import axios from "axios";
import RemoteDataTable from './RemoteDataTable'
import { transformOrderDataForDisplay } from '../utils'

const imageRequestColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Status', selector: row => row.display_status, sortable: true, sortField: 'status' },
    { name: 'Order ID', selector: row => row.order_id, sortable: true },
    // { name: 'Order Type', selector: row => row.order_type, sortable: true },
    { name: 'Latitude', selector: row => row.latitude, sortable: true },
    { name: 'Longitude', selector: row => row.longitude, sortable: true },
    { name: 'Image Type', selector: row => row.image_type, sortable: true },
    { name: 'Window start', selector: row => row.display_window_start, sortable: true, sortField: 'window_start'},
    { name: 'Window end', selector: row => row.display_window_end, sortable: true, sortField: 'window_end' },
    { name: 'Duration', selector: row => row.display_duration, sortable: true, sortField: 'duration' },
    { name: 'Delivery deadline', selector: row => row.display_delivery_deadline, sortable: true, sortField: 'delivery_deadline' },
    { name: 'Priority', selector: row => row.priority, sortable: true },
    { name: 'Payload size', selector: row => row.downlink_size, sortable: true },
    { name: 'Power usage', selector: row => row.power_usage, sortable: true },
    { name: 'Status message', selector: row => row.status_message, sortable: true },
];

const maintenanceRequestColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Status', selector: row => row.display_status, sortable: true, sortField: 'status' },
    { name: 'Order ID', selector: row => row.order_id, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    // { name: 'Order Type', selector: row => row.order_type, sortable: true },
    { name: 'Window start', selector: row => row.display_window_start, sortable: true, sortField: 'window_start'},
    { name: 'Window end', selector: row => row.display_window_end, sortable: true, sortField: 'window_end' },
    { name: 'Duration', selector: row => row.display_duration, sortable: true, sortField: 'duration' },
    { name: 'Delivery deadline', selector: row => row.display_delivery_deadline, sortable: true, sortField: 'delivery_deadline' },
    { name: 'Priority', selector: row => row.priority, sortable: true },
    { name: 'Payload size', selector: row => row.downlink_size, sortable: true },
    { name: 'Power usage', selector: row => row.power_usage, sortable: true },
    { name: 'Status message', selector: row => row.status_message, sortable: true },
];

const outageRequestColumns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Status', selector: row => row.display_status, sortable: true, sortField: 'status' },
    { name: 'Order ID', selector: row => row.order_id, sortable: true },
    // { name: 'Order Type', selector: row => row.order_type, sortable: true },
    { name: 'Asset name', selector: row => row.asset_name, sortable: true },
    { name: 'Start time', selector: row => row.display_window_start, sortable: true },
    { name: 'End time', selector: row => row.display_window_end, sortable: true },
    { name: 'Duration', selector: row => row.display_duration, sortable: true },
];

export default function RequestsView({orderType, orderIds}) {
    let columns;
    if (orderType==="maintenance") {
        columns = maintenanceRequestColumns;
    } else if (orderType==="imaging") {
        columns = imageRequestColumns;
    } else if (orderType==="outage") {
        columns = outageRequestColumns;
    }

    let fetchPaginatedRequestsData = async (page, perPage) => {
        // TODO modify the returned json, adding the 'completion_rate' column (visit_count/number_of_visits)
        // Modify status to have emoji displaying visuals for the status
        try {
            let base_url = process.env.NEXT_PUBLIC_BASE_API_URL

            let pagingParams = `page=${page}&per_page=${perPage}`
            let orderIdParams = orderIds.length > 0 ? 'order_ids=' + orderIds.join('&order_ids=') : ''
            let orderTypeParams = `order_types=${orderType}`
            let params = [pagingParams, orderIdParams, orderTypeParams].filter(param => param.length > 0).join('&')

            let endpoint = `${base_url}/schedules/requests?${params}`
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

    let declineOrders = async (requestIds) => {
        let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
        try {
            for (let requestId of requestIds) {
                await axios.post(`${base_url}/schedules/requests/${requestId}/decline`)
                // sleep to wait for scheduler to decline the request
                await new Promise(r => setTimeout(r, 500));
            }
        } catch (error) {
            throw error;
        }
    }

    return <>
        <div className={styles.dashboardContentRow}>
            <div className={styles.TableCol}>
                <RemoteDataTable
                    title="Requests"
                    columns={columns}
                    fetchPaginatedData={fetchPaginatedRequestsData}
                    isSelectable={true}
                    actionTitle="Decline"
                    actionWarning="Are you sure you want to decline the selected requests?"
                    handleAction={(rows) => declineOrders(rows.map(row => row.id))}
                    rowDisabledCriteria={(row) => row.status == 'declined' || row.status == 'rejected'}
                />
            </div>
        </div>
    </>
}
