import React from "react";

import AddTeacher from "@/components/add-teacher";
import { getSession } from "@/data/getSession";
import { redirect } from "next/navigation";

export default async function page() {
    const session = getSession();

    if (!session) {
        redirect("/login");
    }
    return (
        <>
            <AddTeacher />
        </>
    );
}

// bg - [rgb(47, 56, 97)];
