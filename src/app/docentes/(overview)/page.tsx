import { TableLoader } from "@/components/dashboard-loader";
import Icon from "@/components/icon";
import { getSession } from "@/data/getSession";
import svgs from "@/data/svgs";
import { getTeachers } from "@/teacher/api/get-teachers";
import Link from "next/link";
import React from "react";

export default async function page() {
    const session = getSession();
    const teachers: Teacher[] = await getTeachers();

    const tableHeaders = ["nombre c.", "email", "dni", "telefono", "direccion", "puntaje"];

    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <h2 className="text-black text-2xl py-4 ">Docentes</h2>

            {session ? (
                <div>
                    <Link
                        href={"/docentes/agregar"}
                        className="border border-[#5b72d7] hover:bg-main hover:text-white transition-colors px-2 py-1.5 rounded-sm text-sm text-main font-bold"
                    >
                        Agregar docente
                    </Link>
                </div>
            ) : null}

            {teachers?.length > 0 ? (
                <div className="relative overflow-x-auto">
                    <table className="min-w-full table-auto relative overflow-hidden">
                        <thead className="border bg-[#f3f3f3] ">
                            <tr>
                                {tableHeaders.map(value => (
                                    <th scope="col" className="capitalize text-center leading-loose text-slate-800 font-normal font-sans">
                                        {value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-center border">
                            {teachers?.map((teacher: Teacher, index: number) => (
                                <tr key={index} className="leading-[45px]  [&>td]:whitespace-nowrap [&>td]:px-2 text-gray-600 font-light font-sans border-b ">
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Icon path={svgs.userIcon.path} viewBox={svgs.userIcon.viewBox} className="w-7 h-7" />
                                            {teacher.nombreCompleto}
                                        </div>
                                    </td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.dni}</td>
                                    <td>{teacher.tel}</td>
                                    <td>{teacher.dir}</td>
                                    <td>{teacher.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <span>Loading</span>
            )}
        </div>
    );
}
