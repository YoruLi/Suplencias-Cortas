"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/ui/data-columns-header";
import { DeleteCargo } from "../../cargos/components/delete-cargo";
import EditTeacherDialog from "./edit-teacher-dialog";

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

    {
        id: "actions",
        cell: ({ row }) => {
            const teacher = row.original;

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
                        <DropdownMenuSeparator className="bg-gray-300" />

                        <EditTeacherDialog teacher={teacher} />
                        <DeleteCargo id={teacher.idDocentes} entity="docentes" title="Eliminar docente" />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
