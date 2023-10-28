import { cookies } from "next/headers";

export const getSession = () => {
    const authCookie = cookies().get("auth") ?? "";
    const session = authCookie?.value ? JSON.parse(authCookie?.value) : undefined;
};
