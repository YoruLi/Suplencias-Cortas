"use client";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function SubmitButton({ children, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full capitalize" disabled={pending} aria-disabled={pending}>
            {pending ? "cargando..." : children}
        </Button>
    );
}
