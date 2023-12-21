"use server";

import { fetchUrl } from "@/utils/fetch-url";
import { getErrorMessage } from "@/utils/get-error-message";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
type Login = (data: { username: string; password: string }) => Promise<any>; // eslint-disable-line no-unused-vars

export const login: Login = async data => {
    const { password, username } = data;
    if (!password || !username) return;

    try {
        const res = await fetch(fetchUrl("login"), {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
            throw new Error("Something was wrong.");
        }

        const json = await res.json();
        if (json.status === 404 || json.status === 500) {
            throw new Error(json.message);
        }

        cookies().set({
            name: "user-token",
            value: json.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 1,
            path: "/",
        });

        return json;
    } catch (error) {
        console.log(error);
        throw new Error(getErrorMessage(error));
    }
};
