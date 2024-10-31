export default async function getMe(token?: string) {
    const init: RequestInit = {
        headers: {
            'Cookie': `payload-token=${token}`
        }
    }

    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/cms/users/me', init);
    if (!response.ok) return;
    return response.json();
}