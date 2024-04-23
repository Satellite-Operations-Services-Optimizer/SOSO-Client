import moment from 'moment'
import 'moment-duration-format'

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function transformOrderDataForDisplay(order) {
    // TODO modify the returned json, adding the 'completion_rate' column (visit_count/number_of_visits)
    // Modify status to have emoji displaying visuals for the status
    return {
        ...order,
        display_window_start: order.window_start ? moment(order.window_start).format("llll") : undefined,
        display_window_end: order.window_end ? moment(order.window_end).format("llll") : undefined,
        display_delivery_deadline: order.delivery_deadline ? moment(order.delivery_deadline).format("llll") : undefined,
        display_duration: moment.duration(order.duration, 'seconds').format("h [hrs] m [mins] s [secs]"),
        display_revisit_frequency: moment.duration(order.revisit_frequency, 'seconds').format("d [days] h [hrs] m [mins] s [secs]"),
        display_revisit_frequency_max: order.revisit_frequency_max ? moment.duration(order.revisit_frequency_max).format("d [days] h[hrs] m[mins] s[secs]") : undefined,
        display_status: order.status ? `${addStatusEmoji(order.status)} ${capitalize(order.status)}` : undefined,
    }
}

// CREATE TYPE schedule_request_status AS ENUM ('received', 'processing', 'rejected', 'declined', 'displaced', 'scheduled', 'sent_to_gs');
function addStatusEmoji(status) {
    switch (status) {
        case 'received':
            return '📥'
        case 'processing':
            return "⏳"
        case 'rejected':
            return '❌'
        case 'declined':
            return '❌'
        case 'displaced':
            return "⏳"
        case 'scheduled':
            return '✅'
        case 'sent_to_gs':
            return '📡'
        default:
            return status
    }
}