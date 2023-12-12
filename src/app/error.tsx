"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Error() {
    return (
        <div className="grid place-content-center w-full h-screen text-center space-y-4">
            <h1 className="lg:text-9xl text-7xl text-main font-extrabold">Oops!</h1>
            <h2 className="uppercase font-bold text-main">404 - page not found</h2>

            <p className="line-clamp-2  w-[450px] text-sm">La pagina que estas buscando ha sido removida, se ha cambiado su nombre o actualmente no está disponible</p>

            <Button asChild className="rounded-full">
                <Link href={"/"}>Ir al inicio</Link>
            </Button>
        </div>
    );
}
