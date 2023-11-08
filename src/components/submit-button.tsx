"use client";
import React from "react";
import { Button } from "./ui/button";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton({ content }: { content: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full capitalize" disabled={pending} aria-disabled={pending}>
            {pending ? "cargando..." : content}
        </Button>
    );
}
