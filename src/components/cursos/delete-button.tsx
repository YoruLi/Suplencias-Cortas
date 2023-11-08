"use client";
import React from "react";
import { Button } from "../ui/button";
import { deleteAction } from "../../../actions/delete-curso";

export default function DeleteButton({ id }: { id: string }) {
    return (
        <Button type="button" onClick={() => deleteAction(id)} className="hover:bg-red-500 bg-red-600">
            Eliminar curso
        </Button>
    );
}
