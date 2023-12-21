"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import TeachersList from "./teachers-list";
import { debounce } from "@mui/material";

export default function Search({ placeholder }: { placeholder: string }) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = debounce((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <>
            <search>
                <Input
                    type="search"
                    placeholder={placeholder}
                    className="!outline-none !focus:outline-none !ring-0 !ring-offset-0 relative"
                    defaultValue={searchParams.get("query")?.toString()}
                    onChange={e => {
                        handleSearch(e.target.value);
                    }}
                />
            </search>
        </>
    );
}
