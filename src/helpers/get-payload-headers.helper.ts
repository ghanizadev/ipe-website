export function getPayloadHeaders() {
    return {
        Authorization: "users API-Key " + process.env.CMS_API_KEY
    }
}