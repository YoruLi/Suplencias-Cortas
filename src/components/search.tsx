"use client";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

export default function Search({ search }: { search: string }) {
    const [text, setText] = useState("");
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const currentSearchParams = new URLSearchParams(params);
        if (text.length <= 0) {
            currentSearchParams.delete("search");
        } else {
            currentSearchParams.set("search", text);
        }
        const newSearch = currentSearchParams.toString();
        const newUrl = `${search}${newSearch ? `?${newSearch}` : ""}`;

        router.replace(newUrl);
    }, [text]);

    return (
        <search>
            <Input
                type="search"
                placeholder="Buscar docente..."
                className="!outline-none !focus:outline-none !ring-0 !ring-offset-0"
                value={text}
                onChange={e => setText(e.target.value)}
            />
        </search>
    );
}
