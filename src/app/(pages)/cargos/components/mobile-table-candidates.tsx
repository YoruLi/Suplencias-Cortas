"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { flexRender } from "@tanstack/react-table";
import React from "react";

export const MobileTable = ({ table, columns }: { table: any; columns: any }) => {
    return (
        <div className="rounded-md border md:hidden block">
            <Table>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="">
                                <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap " key={row.id}>
                                    {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
                                </TableCell>
                                <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap " key={row.id}>
                                    {flexRender(row.getVisibleCells()[1].column.columnDef.cell, row.getVisibleCells()[1].getContext())}
                                </TableCell>
                                <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap " key={row.id}>
                                    {flexRender(row.getVisibleCells()[2].column.columnDef.cell, row.getVisibleCells()[2].getContext())}
                                </TableCell>

                                <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap " key={row.id}>
                                    {flexRender(row.getVisibleCells()[4].column.columnDef.cell, row.getVisibleCells()[4].getContext())}
                                </TableCell>
                                <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap " key={row.id}>
                                    {flexRender(row.getVisibleCells()[5].column.columnDef.cell, row.getVisibleCells()[5].getContext())}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
