"use client";

import React, { useState } from "react";
import { deleteSession } from "../../actions/deleteUser";
import Icon from "./icon";
import svgs from "@/data/svgs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../utils/cn";

export default function User({ session }: { session: Session | undefined }) {
    const [showUserConfig, setShowUserConfig] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const addDocentes = pathname === "/docentes/agregar";
    return (
        <div
            className={cn("w-full relative grid place-content-end z-50 h-[40px] gap-x-2 px-3", { "bg-[rgb(47,56,97)]": addDocentes })}
            onMouseLeave={() => setShowUserConfig(false)}
        >
            {!session ? (
                <button
                    onClick={() => router.push("/login")}
                    className={cn("rounded-md w-full h-full relative py-1.5 px-2", {
                        "bg-white text-main": addDocentes,
                        "bg-main text-white": !addDocentes,
                    })}
                >
                    Iniciar sesion
                </button>
            ) : (
                <div className="flex items-center gap-2">
                    <span className={`${addDocentes ? "text-white" : "text-current"}`}>{session?.user?.username}</span>

                    <button className="w-[40px] h-[40px] relative" onClick={() => setShowUserConfig(prev => !prev)}>
                        <Icon
                            {...svgs.userIcon}
                            className={cn("w-full h-full hover:opacity-80", {
                                "fill-white": addDocentes,
                            })}
                        />
                    </button>

                    {showUserConfig ? (
                        <div
                            className="bg-white border-slate-300 absolute inline-flex right-4 top-6 border py-1.5 px-2 hover:bg-[#d0cece] cursor-pointer "
                            onClick={() => deleteSession()}
                        >
                            <span className="text-center text-sm font-medium ">Cerrar session</span>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
