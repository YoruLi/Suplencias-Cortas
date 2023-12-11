"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DeleteCargo } from "../cargos/delete-cargo";
import EditTeacherDialog from "./dialog-edit-teacher";
import { DataTableColumnHeader } from "../ui/data-columns-header";

export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: "nombreCompleto",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Nombre Completo" />;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Email" />;
        },
    },
    {
        accessorKey: "dni",
        header: "DNI",
    },
    {
        accessorKey: "tel",
        header: "Telefono",
    },
    {
        accessorKey: "dir",
        header: "Direccion",
    },
    {
        accessorKey: "localidad",
        header: "Localidad",
    },
    // {
    //     accessorKey: "score",
    //     header: ({ column }) => {
    //         return <DataTableColumnHeader column={column} title="Puntaje" />;
    //     },
    // },
    {
        id: "actions",
        cell: ({ row }) => {
            const teacher = row.original;
            console.log(teacher);
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(teacher.nombreCompleto)}>Copiar docente</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DeleteCargo cargoId={teacher.idDocentes} entity="docentes" />
                        {/* <EditTeacherDialog teacher={teacher} /> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
