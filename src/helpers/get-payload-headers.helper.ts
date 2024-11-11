export function getPayloadHeaders() {
  return {
    Authorization: 'services API-Key ' + process.env.CMS_API_KEY,
  };
}
