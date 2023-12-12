import React from "react";

import AddTeacher from "@/app/(pages)/docentes/components/add-teacher";
import { getSession } from "@/data/getSession";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getSession();

    if (!session.success) {
        redirect("/login");
    }
    return (
        <>
            <AddTeacher />
        </>
    );
}
