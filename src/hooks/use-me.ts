import useSWR from "swr";

async function fetcher(path: string) {
    return fetch(path).then(response => response.json())
}

export default function useMe() {
    return useSWR<{ user: UserDTO }>('/api/users/me', fetcher);
}