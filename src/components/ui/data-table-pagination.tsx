import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Button } from "./button";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    currentPage: number;
    totalPages: number;
}

export function DataTablePagination<TData>({ table, currentPage, totalPages }: DataTablePaginationProps<TData>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const params = new URLSearchParams(searchParams);

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
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Pag. {currentPage} de {totalPages}
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
                        disabled={Number(currentPage) >= totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
