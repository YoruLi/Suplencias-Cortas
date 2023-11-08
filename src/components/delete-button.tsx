"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteAction } from "../../actions/delete-plan";

export default function DeleteButton({ id, entity, children }: { id: string; entity: string; children?: React.ReactNode }) {
    return (
        <Button type="button" onClick={() => deleteAction(entity, id)} className=" bg-[#b1443c] hover:bg-[#a25650]">
            {children}
        </Button>
    );
}
