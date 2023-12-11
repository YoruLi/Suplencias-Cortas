import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Button } from "./button";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    currentPage: any;
}

export function DataTablePagination<TData>({ table, currentPage }: DataTablePaginationProps<TData>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const params = new URLSearchParams(searchParams);

    function createPageURL(pageNumber: number | string) {
        const params = new URLSearchParams(searchParams);
        params.set("pages", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    function createCurrentPage(pageNumber: number) {
        params.set("currentPage", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }
    return (
        <div className="flex items-center  justify-between px-2 whitespace-nowrap gap-2  ">
            <div className="text-sm text-muted-foreground  truncate  ">
                {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
            </div>
            <div className="flex items-center space-x-3 lg:space-x-8 ">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium  ">Total por paginas</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={value => {
                            table.setPageSize(Number(value));
                            router.replace(createPageURL(value), {
                                scroll: false,
                            });
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px] remove-ring">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top" className="flex flex-col">
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Pag. {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            router.replace(createCurrentPage(currentPage - 1), {
                                scroll: false,
                            });
                            table.previousPage();
                        }}
                        disabled={Number(currentPage) <= 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            const newPageNumber = currentPage + 1;
                            router.replace(createCurrentPage(newPageNumber), {
                                scroll: false,
                            });
                            table.nextPage();
                        }}
                        disabled={Number(currentPage) >= table.getFilteredRowModel().rows.length}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
