
import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import styles from '../../styles/dashboard.module.scss'
import axios from "axios";
import RemoteDataTable from './RemoteDataTable'
import { transformEventDataForDisplay } from '../utils'

const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Satellite', selector: row => row.asset_name, sortable: true },
    { name: 'Event Type', selector: row => row.event_type, sortable: true },
    { name: 'Start Time', selector: row => row.display_start_time, sortable: true, sortField: 'start_time' },
    { name: 'Duration', selector: row => row.display_duration, sortable: true, sortField: 'duration' },
];

export default function EventsView({scheduleId, eventTypes}) {
    if (scheduleId==null || scheduleId==undefined) return <>No Schedule Selected</>

    let fetchPaginatedRequestsData = async (page, perPage) => {
        // TODO modify the returned json, adding the 'completion_rate' column (visit_count/number_of_visits)
        // Modify status to have emoji displaying visuals for the status
        try {
            let base_url = process.env.NEXT_PUBLIC_BASE_API_URL

            let pagingParams = `page=${page}&per_page=${perPage}`
            let eventTypesFilter = ""
            if (eventTypes.length > 0) {
                eventTypesFilter = 'event_types=' + eventTypes.join('&event_types=')
            }
            let params = [pagingParams, eventTypesFilter].filter(param => param.length > 0).join('&')
            if (params.length > 0) {
                params = '?' + params
            }

            let endpoint = `${base_url}/schedules/${scheduleId}/events${params}`
            const response = await axios.get(endpoint)
            let transformedData = response.data.data.map(order => transformEventDataForDisplay(order))
            return {
                data: transformedData,
                total: parseInt(response.data.total)
            }
        } catch (error) {
            throw error;
        }
    }

    return <>
        <div className={styles.dashboardContentRow}>
            <div className={styles.TableCol}>
                <RemoteDataTable
                    title="Scheduled Events"
                    columns={columns}
                    fetchPaginatedData={fetchPaginatedRequestsData}
                    isSelectable={false}
                />
            </div>
        </div>
    </>
}
