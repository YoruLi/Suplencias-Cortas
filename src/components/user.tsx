"use client";
import React from "react";
import { deleteSession } from "../../actions/delete-session";
import Icon from "./icon";
import svgs from "@/data/svgs";

import { cn } from "../utils/cn";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
export default function User({ session }: { session: Session | undefined }) {
    return (
        <div className={cn("w-full relative grid place-content-end p-2 z-50 bg-transparent")}>
            {!session?.success ? (
                <Button asChild>
                    <Link href={"/login"}>Iniciar sesion</Link>
                </Button>
            ) : (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="relative flex items-center gap-2 outline-none bg-[#e3e2e2] px-3 hover:bg-[#e0e0e0]  rounded">
                            <Icon {...svgs.userIcon} className={cn("w-[34px] h-[34px]")} />
                            <div>
                                <span className="text-sm font-bold">{session?.user}</span>
                                <legend className="text-xs text-start">Admin</legend>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Perfil</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteSession()}>Cerrar sesion</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}
