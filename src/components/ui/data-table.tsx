"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./tabla-faceted-filter";
import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/utils/cn";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
}
export const statuses = [
    {
        value: "backlog",
        label: "Backlog",
    },
    {
        value: "todo",
        label: "Todo",
    },
    {
        value: "in progress",
        label: "In Progress",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "canceled",
        label: "Canceled",
    },
];

export const priorities = [
    {
        label: "Low",
        value: "low",
    },
    {
        label: "Medium",
        value: "medium",
    },
    {
        label: "High",
        value: "high",
    },
];
export function DataTable<TData, TValue>({ columns, data, className }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,

        getPaginationRowModel: getPaginationRowModel(),

        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            sorting,
            columnVisibility,
            columnFilters,
        },
    });
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className={cn(className)}>
            {/* <div className="flex justify-between items-center">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filtrado por nombre..."
                        value={(table.getColumn("nombreCompleto")?.getFilterValue() as string) ?? ""}
                        onChange={event => table.getColumn("nombreCompleto")?.setFilterValue(event.target.value)}
                        className="max-w-sm !outline-none !focus:outline-none !ring-0 !ring-offset-0"
                    />

                    {table.getColumn("nombreCompleto") && <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />}
                    {table.getColumn("email") && <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />}
                    {isFiltered && (
                        <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                            Reset
                        </Button>
                    )}
                </div>

                <DataTableViewOptions table={table} />
            </div> */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="">
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap " key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
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
            {/* <DataTablePagination table={table} /> */}
        </div>
    );
}
