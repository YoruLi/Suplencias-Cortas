"use client";
import svgs from "@/data/svgs";
import React from "react";

import { useRouter } from "next/navigation";
import Icon from "@/components/icon";

export default function GoBack() {
    const router = useRouter();
    return (
        <div className="absolute left-2 top-2 cursor-pointer " onClick={() => router.push("/")}>
            <Icon path={svgs.leftArrow.path} viewBox={svgs.leftArrow.viewBox} />
        </div>
    );
}
