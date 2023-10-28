import React from "react";

interface Props {
    path: string;
    viewBox: string;
}

export default function Icon({ path, viewBox }: Props) {
    return (
        <svg viewBox={viewBox} className=" w-6 h-6 ">
            <path d={path}></path>
        </svg>
    );
}
