"use client";
import Icon from "@/components/ui/icon";
import { TableCell, TableRow } from "@/components/ui/table";
import svgs from "@/data/svgs";
import { cn } from "@/utils/cn";
import { formattedDate } from "@/utils/formatted-date";
import React from "react";

export const MobileTable = ({ table, columns }: { table: any; columns: any }) => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:hidden mt-10">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                    <div className="flex items-center relative space-x-3 px-6 py-5 rounded-lg shadow ring-1  ring-opacity-5 ring-black" key={row.id}>
                        <div className="min-w-0 flex-1 ">
                            <div className="flex items-center space-x-3">
                                <p>{row.original.descripcion}</p>

                                <span
                                    className={cn("py-0.5 rounded-full flex-shrink-0 px-2 text-xs font-bold", {
                                        "bg-green-200 text-green-700": row.original.resolucion === "éxito",
                                        "bg-red-200 text-red-500": row.original.resolucion === "fracaso",
                                    })}
                                >
                                    {row.original.resolucion}
                                </span>
                            </div>

                            <p className="truncate mt-1 text-sm text-gray-700 first-letter:capitalize">{formattedDate(row.original.fecha)}</p>
                        </div>
                    </div>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </div>
    );
};
