"use client";
import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { XIcon } from "lucide-react";
import Icon from "./icon";
import svgs from "@/data/svgs";
import Link from "next/link";

export default function TeachersList({ teachers }: { teachers: TeachersResponse }) {
    const searchParams = useSearchParams();
    const teacherSelected = searchParams.get("docente")?.split("/")[1];

    if (!Array.isArray(teachers)) {
        return <pre>{teachers?.message}</pre>;
    }

    return (
        <>
            {teachers?.length > 0 && (
                <ul className="list-none absolute top-7 bg-white shadow shadow-slate-300 w-full z-20">
                    {teachers?.map(teacher => {
                        return (
                            <Link href={`?docente=${teacher.idDocentes}/${teacher.nombreCompleto}`} className="flex items-center gap-2 hover:bg-slate-100 cursor-pointer">
                                <Icon {...svgs.userIcon} className="h-9 w-9" />

                                <span className="text-sm">{teacher.nombreCompleto}</span>
                            </Link>
                        );
                    })}
                </ul>
            )}

            {teacherSelected ? (
                <li className="flex items-center  hover:bg-slate-100 cursor-pointer gap-2">
                    <Icon {...svgs.userIcon} className="h-9 w-9" />

                    <span className="text-sm">{teacherSelected}</span>

                    <Link href={`?docente=`} className="ml-auto">
                        <XIcon className="w-4 mr-4 hover:stroke-red-700" />
                    </Link>
                </li>
            ) : null}
        </>
    );
}
