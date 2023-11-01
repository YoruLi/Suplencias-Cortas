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
        <div className=" min-h-[calc(100dvh-56px-40px)] bg-transparent text-white mx-auto max-h-[calc(100dvh-56px-40px)]  ">
            <AddTeacher />
        </div>
    );
}

// bg - [rgb(47, 56, 97)];
