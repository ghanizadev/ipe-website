export default async function logoutService() {

    const url = process.env.NEXT_PUBLIC_URL + '/api/users/logout';
    const init: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    }

    const response = await fetch(url, init)
    if (!response.ok) return;
    return response.json();
}