import { cn } from "@/utils/cn";
import React from "react";

interface Props {
    path: string;
    viewBox: string;
    className?: string;
}

export default function Icon({ path, viewBox, className }: Props) {
    return (
        <svg viewBox={viewBox} className={cn(" w-6 h-6", className)}>
            <path d={path}></path>
        </svg>
    );
}
