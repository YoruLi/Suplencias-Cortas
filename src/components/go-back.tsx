"use client";
import svgs from "@/data/svgs";
import React from "react";

import { useRouter } from "next/navigation";
import Icon from "@/components/icon";

export default function GoBack() {
    const router = useRouter();
    return (
        <div className="absolute left-2 top-2 cursor-pointer hover:fill-[#0F172A] fill-[#0f172a77] transition-colors delay-100 " onClick={() => router.push("/")}>
            <Icon path={svgs.leftArrow.path} viewBox={svgs.leftArrow.viewBox} />
        </div>
    );
}
