"use server";

import { fetchUrl } from "@/utils/fetch-url";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (data: FormData) => {
    const username = data.get("username");
    const password = data.get("password");
    if (!password || !username) return;

    const res = await fetch(fetchUrl("login"), {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const json = await res.json();
    cookies().set({
        name: "user-token",
        value: json.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 1,
        path: "/",
    });

    return redirect("/dashboard");
};
