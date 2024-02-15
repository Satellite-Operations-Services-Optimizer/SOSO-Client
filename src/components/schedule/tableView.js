import styles from '@/styles/dashboard.module.scss'
import DataTable from '../DataTable'
import moment from 'moment'

const columns = [
  {
    Header: 'Satellite', // replace with Satellite Name in the future (requires modifying api endpoint, cuz better to include the field there than require more queries here)
    accessor: 'asset_name', 
  },
  {
    Header: 'Event Type',
    accessor: 'event_type',
  },
  {
    Header: 'Start Time',
    accessor: 'start_time',
  },
  {
    Header: 'Duration',
    accessor: 'duration',
  },
  // Add more columns as needed
];
export default function ScheduleTableView({events}) {
    if (!events?.length) return <>No Events Scheduled</>
    events = events.map((event) => {
        let duration = moment.duration(event.duration, 'seconds')
        return {
          ...event,
          start_time: moment(event.start_time).format("llll"),
          duration: moment.utc(duration.asMilliseconds()).format("H[h ]m[m ]s[s ]")
        }
    })
    return <>
        <div className={styles.dashboardContentRow}>
          <div className={styles.TableCol}>
              <DataTable
                  search={false}
                  tablePagination={true}
                  columns={columns}
                  data={events}
                  rowSeletion={true}
                  actionBtn={true}
                  actionBtnText="Decline"
              />
          </div>
        </div>
    </>
}