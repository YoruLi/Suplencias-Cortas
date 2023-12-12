"use client";
import React from "react";
import { Button } from "../ui/button";
import { deleteAction } from "../../../actions/delete-action";
import toast from "react-hot-toast";

export default function DeleteButton({ id, entity, children }: { id: string; entity: string; children?: React.ReactNode }) {
    return (
        <Button
            type="button"
            onClick={() => {
                toast.promise(deleteAction(entity, id), {
                    loading: "Cargando...",
                    success: data => {
                        if (data.status === 409 || data.status === 500) throw new Error(`${data.message}`);
                        return `${data.message}`;
                    },
                    error: e => `${e.message}`,
                });
            }}
            className=" bg-[#b1443c] hover:bg-[#a25650]"
        >
            {children}
        </Button>
    );
}
