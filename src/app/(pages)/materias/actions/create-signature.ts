"use server";

import { fetchUrl } from "@/utils/fetch-url";
import { redirect } from "next/navigation";

export const createSignature = async (data: any) => {
    const response = await fetch(fetchUrl("materias"), {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return redirect("/materias");
};
