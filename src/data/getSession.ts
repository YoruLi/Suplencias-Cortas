"use server";
import { cookies } from "next/headers";

export const getSession = () => {
    const authCookie = cookies().get("auth") ?? undefined;

    if (!authCookie || !authCookie.value) {
        return undefined;
    }
    const session = JSON.parse(authCookie?.value);

    return session as Session;
};
