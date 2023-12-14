"use server";
import { headers } from "next/headers";

export const fetchUrl = (fetch: string) => {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
    return `${protocol}${host}/api/${fetch}`;
};

type Methods = "POST" | "GET" | "PUT" | "DELETE";
export const fetcher = async ({ fetchUrl, data, method }: { fetchUrl: string; data?: any; method: Methods }) => {
    const url = process.env.FETCH_URL;
    const config = {
        ...(!data && { cache: "no-store" }),
        ...(data && {
            method: method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }),
    };
    try {
        const response = await fetch(`${url}/api/${fetchUrl}`, config);

        if (!response.ok) {
            const errorMessage = await response.text();

            throw new Error(errorMessage);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        throw error;
    }
};
