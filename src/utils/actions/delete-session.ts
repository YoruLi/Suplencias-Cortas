"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteSession = async () => {
    cookies().delete("user-token");
    return redirect("/login");
};
