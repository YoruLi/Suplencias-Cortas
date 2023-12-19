"use client";
import Icon from "@/components/ui/icon";
import { TableCell, TableRow } from "@/components/ui/table";
import svgs from "@/data/svgs";
import { cn } from "@/utils/cn";
import { flexRender } from "@tanstack/react-table";
import React from "react";

export const MobileTable = ({ table, columns }: { table: any; columns: any }) => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:hidden my-10">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                    <div className="flex items-center relative space-x-3 px-6 py-5 rounded-lg shadow ring-1  ring-opacity-5 ring-black" key={row.id}>
                        <div className="min-w-0 flex-1 ">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 ">
                                    <p>{row.original.nombreDocente}</p>

                                    <Icon path={svgs.docenteIcon.path} viewBox={svgs.docenteIcon.viewBox} className="w-4" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn("py-0.5 rounded-full flex-shrink-0 px-2 text-xs font-bold", {
                                            "bg-green-200 text-green-700": row.original.estado === "Asignado",
                                            "bg-red-200 text-red-500": row.original.estado === "Sin asignar",
                                        })}
                                    >
                                        {row.original.estado}
                                    </span>
                                    <div key={row.id}>{flexRender(row.getVisibleCells()[7].column.columnDef.cell, row.getVisibleCells()[7].getContext())}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="truncate mt-1 text-sm text-gray-900 font-medium">{row.original.nombreMateria}</p>
                                <p className="truncate mt-1 text-sm text-gray-900 font-medium">{row.original.nombreCurso}</p>
                            </div>

                            <p className="truncate mt-1 text-sm">Dias: {row.original.dias}</p>
                            <span className="truncate mt-1 text-sm">Horario: {row.original.horario}</span>

                            {row.original.suplenteDe?.length > 0 ? <p className="truncate mt-1 text-sm">Suplente de: {row.original.titular}</p> : null}
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
