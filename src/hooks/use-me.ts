import useSWR from "swr";
import {UserDTO} from "@/types/user";

async function fetcher(path: string) {
    return fetch(path).then(response => response.json())
}

export default function useMe() {
    return useSWR<{ user: UserDTO }>('/cms/users/me', fetcher);
}