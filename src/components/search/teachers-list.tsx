"use client";
import React from "react";

import Icon from "../ui/icon";
import svgs from "@/data/svgs";
import Link from "next/link";

export default function TeachersList({ teachers }: { teachers: any }) {
    if (!Array.isArray(teachers)) {
        return <pre>{teachers?.message}</pre>;
    }

    return (
        <>
            {teachers?.length > 0 && (
                <ul className="list-none absolute top-7 bg-white shadow shadow-slate-300 w-full z-20">
                    {teachers?.map(teacher => {
                        return (
                            <Link
                                key={teacher.idDocentes}
                                href={`?docente=${teacher.idDocentes}/${teacher.nombreCompleto}`}
                                className="flex items-center gap-2 hover:bg-slate-100 cursor-pointer"
                            >
                                <Icon {...svgs.userIcon} className="h-9 w-9" />

                                <span className="text-sm">{teacher.nombreCompleto}</span>
                            </Link>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
