import { headers } from "next/headers";

export const fetchUrl = (fetch: string) => {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
    return `${protocol}${host}/api/${fetch}`;
};
