"use client";

import { formattedDate } from "@/utils/formatted-date";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: "descripcion",
    },
    {
        accessorKey: "resolucion",
        header: "Resolucion",
        cell: ({ row }) => (
            <div className={`" ${row.getValue("resolucion") === "fracaso" ? "text-red-600" : "text-green-600"} font-bold capitalize`}>{row.getValue("resolucion")}</div>
        ),
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
        cell: ({ row }) => <div>{formattedDate(row.getValue("fecha"))}</div>,
    },
];
