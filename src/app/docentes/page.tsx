import { getSession } from "@/data/getSession";
import Link from "next/link";
import React from "react";

export default function page() {
    const session = getSession();

    return (
        <div className=" h-full w-full px-8">
            <h2 className="text-black text-2xl py-4 ">Docentes</h2>
            {session ? (
                <Link href={"/docentes/agregar"} className="border border-main px-2 py-1.5 rounded-sm text-sm text-main font-bold">
                    Agregar docente
                </Link>
            ) : null}
        </div>
    );
}
