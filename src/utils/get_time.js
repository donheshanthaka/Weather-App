import moment from "moment-timezone"
import tz_lookup from "tz-lookup"

/**
 * Returns the current time in the time zone of the given longitude and latitude coordinates.
 * @param {number} lon - The longitude of the location.
 * @param {number} lat - The latitude of the location.
 * @returns {string} A formatted string representing the current time in the format "h.mm a, MMM D".
 */
const getTime = (lon, lat) => {
  const timezone = tz_lookup(lat, lon)

  const currentTime = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss")

  const date = new Date(currentTime)
  const formattedDate = moment(date).format("h.mm a, MMM D")

  const timeString = formattedDate
    .substring(0, formattedDate.indexOf(","))
    .trim()

  const dateString = formattedDate
    .substring(formattedDate.indexOf(",") + 1)
    .trim()

  const outputString = `${timeString}, ${dateString}`

  return outputString
}

export default getTime
