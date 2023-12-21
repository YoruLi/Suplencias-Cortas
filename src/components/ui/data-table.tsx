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
import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/utils/cn";
import Search from "../search/search";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
    toggleColumns?: boolean;
    searchBar?: boolean;
    currentPage: number;
    pagination?: boolean;
    totalPages?: number;
    ShowMobile: any;
    placeholder?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    className,
    toggleColumns = false,
    searchBar = false,
    currentPage,
    pagination = false,
    totalPages,
    placeholder,
    ShowMobile,
}: DataTableProps<TData, TValue>) {
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

    return (
        <div className={cn(className)}>
            <div className="flex justify-between items-center">
                {searchBar ? (
                    <div className="flex items-center py-4">
                        <Search placeholder={placeholder} />
                    </div>
                ) : null}

                {toggleColumns ? <DataTableViewOptions table={table} /> : null}
            </div>
            <div className="rounded-md border hidden md:block">
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
                                            <TableCell className=" overflow-hidden text-ellipsis whitespace-nowrap" key={cell.id}>
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

            {ShowMobile && <ShowMobile table={table} columns={columns} />}

            {pagination ? <DataTablePagination table={table} currentPage={currentPage} totalPages={totalPages} /> : null}
        </div>
    );
}
