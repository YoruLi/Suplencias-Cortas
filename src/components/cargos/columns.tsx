"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { DeleteCargo } from "./delete-cargo";
import { EditTeacherPosition } from "../cargos/edit-teacher-position";
import Candidates from "@/app/(pages)/cargos/components/candidates";

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
        accessorKey: "dias",
        header: "Dias",
    },
    {
        accessorKey: "horario",
        header: "Horario",
    },
    {
        accessorKey: "estado",
        header: "Estado",
    },

    {
        accessorKey: "titular",
        header: "Suplente de",
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
                        <Candidates cargoId={cargos.idCargos} />
                        <EditTeacherPosition cargo={cargos} />
                        <DeleteCargo cargoId={cargos.idCargos} entity="cargos" />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
