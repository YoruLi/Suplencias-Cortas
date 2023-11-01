"use client";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TeachersList({ teachers }: { teachers: Teacher[] }) {
    const searchParams = useSearchParams();
    const teacherSelected = searchParams.get("docente")?.split("?")[0];

    const router = useRouter();

    return (
        <>
            {teachers?.length > 0 && (
                <ul className="list-none absolute top-7 bg-white shadow shadow-slate-300 w-full z-20">
                    {teachers?.map(teacher => {
                        return (
                            <li className="flex items-center gap-2 hover:bg-slate-100   cursor-pointer" onClick={() => router.push(`?docente=${teacher.nombreCompleto}`)}>
                                <Avatar>
                                    <AvatarImage src="/imgs/picture.png" />
                                </Avatar>

                                <span>{teacher.nombreCompleto}</span>
                            </li>
                        );
                    })}
                </ul>
            )}

            {teacherSelected ? (
                <li className="flex items-center gap-2 hover:bg-slate-100 cursor-pointer ">
                    <Avatar>
                        <AvatarImage src="/imgs/picture.png" />
                    </Avatar>

                    <span>{teacherSelected}</span>
                </li>
            ) : null}
        </>
    );
}
