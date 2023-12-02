"use client";
import React from "react";
import { AspectRatio } from "./aspect-ratio";

export default function AspectRatioContainer({ children }: { children: React.ReactNode }) {
    return (
        <AspectRatio ratio={8 / 1} className="bg-muted  mx-auto max-w-[320px] rounded">
            {children}
        </AspectRatio>
    );
}
