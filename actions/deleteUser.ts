"use server";
import { cookies } from "next/headers";

export const deleteSession = async () => {
    "use server";
    cookies().delete("auth");
};
