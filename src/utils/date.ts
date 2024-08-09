/**
 * Formats a given date to a custom string format.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string in the format "YYYY-MM-DD HH:mm:ss AM/PM".
 */
function formatDateToCustomString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Set the time to "00:00:00 AM"
  const hours = "00";
  const minutes = "00";
  const seconds = "00";
  const ampm = "AM";

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}
