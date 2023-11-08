"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DialogDemo } from "./dialog";
import { DeleteCargo } from "./delete-cargo";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//     id: string;
//     amount: number;
//     status: "pending" | "processing" | "success" | "failed";
//     email: string;
// };

export const columns: ColumnDef<CargoResponse>[] = [
    {
        accessorKey: "nombreDocente",
        header: "Docente",
    },
    {
        accessorKey: "nombreCurso",
        header: "Curso",
    },
    {
        accessorKey: "nombreMateria",
        header: "Materia",
    },
    {
        accessorKey: "turno",
        header: "Turno",
    },
    {
        accessorKey: "horario",
        header: "Horario",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const cargos = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(cargos.nombreDocente)}>Copiar docente</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DeleteCargo cargoId={cargos.idCargos} entity="cargos" />
                        <DialogDemo cargo={cargos} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
