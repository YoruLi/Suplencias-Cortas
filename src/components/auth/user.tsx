"use client";
import React from "react";
import { deleteSession } from "../../../actions/delete-session";
import Icon from "../ui/icon";
import svgs from "@/data/svgs";

import { cn } from "../../utils/cn";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
export default function User({ session }: { session: Session | undefined }) {
    return (
        <>
            {!session?.success ? (
                <Link href={"/login"} className="flex gap-1 text-sm items-center w-full bg-transparent justify-center  hover:bg-[#f3f3f3] px-4 py-4 lg:py-2.5 lg:px-2.5">
                    <Icon path={svgs.logIn.path} viewBox={svgs.logIn.viewBox} className="lg:w-5 lg:h-5" />
                    <span className="hidden lg:block">Iniciar sesion</span>
                </Link>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger className="relative flex items-center lg:gap-2 outline-none rounded w-full bg-transparent px-4 py-4 lg:py-1 lg:px-1 hover:bg-[#f3f3f3]">
                        <Icon {...svgs.userIcon} className={cn("w-6 lg:w-8 h-6 lg:h-8")} />
                        <div>
                            <span className="text-sm font-bold hidden lg:block">{session?.user}</span>
                            <legend className="text-xs text-start hidden lg:block">Admin</legend>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteSession()}>Cerrar sesion</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}
