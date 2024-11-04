export default async function getMeServerService(token?: string): Promise<{ user?: UserDTO } | null> {
    const init: RequestInit = {
        headers: {
            'Cookie': `payload-token=${token}`
        }
    }
    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/users/me', init);
    if (!response.ok) return null;
    return response.json();
}