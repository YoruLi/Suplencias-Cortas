"use client";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import TeachersList from "./teachers-list";

export default function Search({ search, teachers }: { search: string; teachers: any }) {
    const [text, setText] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const teacherSelected = searchParams.get("docente")?.split("/")[1];
    console.log(teacherSelected);
    useEffect(() => {
        const currentSearchParams = new URLSearchParams(searchParams);
        if (text.length <= 0) {
            currentSearchParams.delete("search");
        } else {
            currentSearchParams.set("search", text);
        }
        const newSearch = currentSearchParams.toString();
        const newUrl = `${search}${newSearch ? `?${newSearch}` : ""}`;

        router.replace(newUrl);
    }, [text]);

    return (
        <>
            <search>
                <Input
                    type="search"
                    placeholder="Buscar docente..."
                    className="!outline-none !focus:outline-none !ring-0 !ring-offset-0 relative"
                    value={teacherSelected ? teacherSelected : text}
                    onChange={e => setText(e.target.value)}
                />
            </search>

            <TeachersList teachers={teachers} />
        </>
    );
}
