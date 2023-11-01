"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";

export default function Search() {
    const [text, setText] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (text) {
            router.push(`/cargos/agregar?search=${text}`);
        }
    }, [text]);

    return (
        <div className="relative">
            <Input placeholder="Buscar docente..." className="relative" value={text} onChange={e => setText(e.target.value)} />
        </div>
    );
}
