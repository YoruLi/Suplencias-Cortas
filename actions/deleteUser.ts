"use server";

import { cookies } from "next/headers";

export const deleteSession = async () => {
    cookies().delete("auth");
};
