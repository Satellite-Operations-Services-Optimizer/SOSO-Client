import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import styles from '../../styles/dashboard.module.scss'
import axios from "axios";

const imageRequestColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Order ID', accessor: 'order_id' },
    { Header: 'Latitude', accessor: 'latitude' },
    { Header: 'Longitude', accessor: 'longitude' },
    { Header: 'Image Type', accessor: 'image_type' },
    { Header: 'Window start', accessor: 'window_start' },
    { Header: 'Window end', accessor: 'window_end' },
    { Header: 'Duration', accessor: 'duration' },
    { Header: 'Delivery deadline', accessor: 'delivery_deadline' },
    { Header: 'Priority', accessor: 'priority' },
    { Header: 'Payload size', accessor: 'downlink_size' },
    { Header: 'Power usage', accessor: 'power_usage' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Status message', accessor: 'status_message' },
]
const maintenanceRequestColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Order ID', accessor: 'order_id' },
    { Header: 'Window start', accessor: 'window_start' },
    { Header: 'Window end', accessor: 'window_end' },
    { Header: 'Duration', accessor: 'duration' },
    { Header: 'Delivery deadline', accessor: 'delivery_deadline' },
    { Header: 'Priority', accessor: 'priority' },
    { Header: 'Payload size', accessor: 'downlink_size' },
    { Header: 'Power usage', accessor: 'power_usage' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Status message', accessor: 'status_message' },
]

const outageRequestColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Order ID', accessor: 'order_id' },
    { Header: 'Asset name', accessor: 'asset_name' },
    { Header: 'Start time', accessor: 'window_start' },
    { Header: 'End time', accessor: 'window_end' },
    { Header: 'Duration', accessor: 'duration' },
]

export default function RequestsView({orderType, orderIds}) {
    if (!orderIds?.length) return <>No Orders Selected</>
    const [requests, setRequests] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    let columns;
    if (orderType==="maintenance") {
        columns = maintenanceRequestColumns;
    } else if (orderType==="imaging") {
        columns = imageRequestColumns;
    } else if (orderType==="outage") {
        columns = outageRequestColumns;
    }

    let refreshData = async (pageIndex, pageSize) => {
        try {
            let base_url = process.env.NEXT_PUBLIC_BASE_API_URL
            let url;
            if (orderIds.length === 0) {
                url = `${base_url}/schedules/requests?page=${pageIndex + 1}&per_page=${pageSize}`
            } else {
                url = `${base_url}/${orderType}/orders/${orderIds[0]}/requests?page=${pageIndex + 1}&per_page=${pageSize}` // TODO: handle multiple order ids
            }
            const response = {data: []}//await axios.get(url)
            // TODO modify the returned json, adding the 'completion_rate' column (visit_count/number_of_visits)
            // Modify status to have emoji displaying visuals for the status
            setRequests(response.data)
        } catch (error) {
            setRequests([])
            throw error;
        }
    }

    useEffect(() => {
        refreshData(pageIndex, pageSize)
    }, [pageIndex, pageSize])

    return <>
        <div className={styles.dashboardContentRow}>
            <div className={styles.TableCol}>
                <DataTable 
                search = {false}
                tablePagination = {true}
                columns = {columns}
                data = {requests}
                maintenanceButton = {true}
                rowSeletion = {true}
                actionBtn= {true}
                actionBtnText= "Decline"
                onPageChange={(pageIndex, pageSize) => setPageIndex(pageIndex) && setPageSize(pageSize)}
                />
            </div>
        </div>
    </>
}