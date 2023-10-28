"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthSessionButton() {
    const router = useRouter();
    return (
        <button onClick={() => router.push("/login")} className="px-3 py-1.5 bg-main text-white rounded-md hover:bg-[#313f80] absolute top-2 right-2 ">
            Iniciar sesion
        </button>
    );
}
