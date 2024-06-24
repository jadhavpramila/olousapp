import moment from "moment";

export function withoutChangeTimeZoneFormatDate(dateTime_object) {
    // "2022-06-01T10:14:24Z"
   let date=  moment(dateTime_object).format("YYYY-MM-DDTHH:mm:ss");
   return `${date}Z`
}

export function FormatDateAsPerAPIRequired(dateTime_object) {
    let date= dateTime_object.toISOString().split(".")[0] + "Z";
    return date
}

export function getCurrentDateTimeInUTCTimestamp(){
    let milliseconds = moment.utc(new Date()).format('x')
    let timestamp = milliseconds/1000
    return timestamp
}