export default function ScheduleGanttChart2({events}) {
    if (!events) return <>No Events</>
    return <>
        <div id="schedule_gantt"></div>
    </>
}