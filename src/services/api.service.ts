import 'server-only';

import qs from 'qs';

import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";


export class APIService<T = PayloadDocument> {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(private readonly basePath: string) {
        if (!process.env.CMS_API_URL) throw new Error('Variable CMS_API_URL is not defined');
        if (!process.env.CMS_API_KEY) throw new Error('Variable CMS_API_KEY is not defined');

        this.baseUrl = `${process.env.CMS_API_URL}/api/${basePath}`;
        this.apiKey = process.env.CMS_API_KEY;
    }

    protected getPagination(pagination: PaginationDTO): string {
        if (Object.keys(pagination).length)
            return `?${qs.stringify(pagination)}`;
        return ''
    }

    protected getAuthenticationHeaders() {
        return {
            Authorization: "services API-Key " + process.env.CMS_API_KEY
        }
    }

    public async create(create: PartialEntityDTO<T>): Promise<T | null> {
        const init: RequestInit = {
            method: "POST",
            headers: {
                ...getPayloadHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(create)
        };

        const response = await fetch(this.baseUrl, init);
        if (!response.ok) return null;

        return await response.json();
    }

    public async findAll(pagination: PaginationDTO): Promise<PaginatedResponse<T> | null> {
        const init: RequestInit = {
            method: "GET",
            headers: {
                ...getPayloadHeaders(),
            },
        };

        const queryString = this.getPagination(pagination);

        const response = await fetch(this.baseUrl + queryString, init);
        if (!response.ok) return null;

        return await response.json();
    }

    public async findById(id: string) {
        const init: RequestInit = {
            method: "GET",
            headers: {
                ...getPayloadHeaders(),
            },
        };

        const response = await fetch(this.baseUrl + "/" + id, init);
        if (!response.ok) return null;

        return await response.json();
    }

    public async updateById(id: string, updatedData: PartialEntityDTO<T>) {
        const init: RequestInit = {
            method: "PATCH",
            headers: {
                ...getPayloadHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        };

        const response = await fetch(this.baseUrl + "/" + id, init);
        if (!response.ok) return null;

        return await response.json();
    }

    public async deleteById(id: string): Promise<boolean> {
        const init: RequestInit = {
            method: "DELETE",
            headers: {
                ...getPayloadHeaders(),
            },
        };

        const response = await fetch(this.baseUrl + "/" + id, init);
        return response.ok;
    }
}