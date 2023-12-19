"use client";
import Icon from "@/components/ui/icon";
import { TableCell, TableRow } from "@/components/ui/table";
import svgs from "@/data/svgs";
import { flexRender } from "@tanstack/react-table";
import React from "react";

export const MobileTable = ({ table, columns }: { table: any; columns: any }) => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:hidden mt-10">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => {
                    return (
                        <div className="flex items-center relative space-x-3 px-6 py-5 rounded-lg shadow ring-1  ring-opacity-5 ring-black" key={row.id}>
                            <div className="min-w-0 flex-1 ">
                                <div className="flex items-center justify-between space-x-3">
                                    <div className="flex items-center space-x-3">
                                        <p>{row.original.nombreCompleto}</p>
                                        <Icon path={svgs.docenteIcon.path} viewBox={svgs.docenteIcon.viewBox} className="w-4" />
                                    </div>

                                    <div className=" overflow-hidden text-ellipsis whitespace-nowrap " key={row.id}>
                                        {flexRender(row.getVisibleCells()[6].column.columnDef.cell, row.getVisibleCells()[6].getContext())}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="truncate mt-1 text-sm text-gray-900 font-medium">{row.original.localidad}</p>

                                    <p className="truncate mt-1 text-sm text-gray-900 font-medium">{row.original.dir}</p>
                                </div>
                                <p className="truncate mt-1 text-sm text-gray-700 first-letter:capitalize">{row.original.email}</p>
                                <div className="flex gap-2">
                                    <span className="truncate mt-1 text-sm">Dni: {row.original.dni}</span>
                                    <span className="truncate mt-1 text-sm">Tel: {row.original.tel}</span>
                                </div>
                            </div>
                        </div>
                    );
                })
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
