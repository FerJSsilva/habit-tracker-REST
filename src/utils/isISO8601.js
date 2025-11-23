export default function isISO8601(date) {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?([+-]\d{2}:\d{2}|Z)$/;
  return iso8601Regex.test(date);
}