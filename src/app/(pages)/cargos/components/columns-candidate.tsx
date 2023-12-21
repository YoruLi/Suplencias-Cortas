"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendEmail } from "../../../../utils/actions/send-email";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/get-error-message";

export const columns: ColumnDef<CargoResponse>[] = [
    {
        id: "select",
        cell: ({ row }) => (
            <Checkbox
                name="candidate"
                checked={row.getIsSelected()}
                onCheckedChange={value => {
                    row.toggleSelected(!!value);
                }}
                value={row.original.candidatoId}
                aria-label="Select row"
                className="mx-auto grid place-content-center"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "nombreCompleto",
        header: "Docente",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "tel",
        header: "Telefono",
    },
    {
        accessorKey: "score",
        header: "Puntaje",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const candidates = row.original;
            const emailSent = candidates.emailSent === 1;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            disabled={emailSent}
                            className={`${emailSent ? "text-red-700 font-bold" : ""}`}
                            onClick={async () => {
                                try {
                                    const result = await sendEmail(candidates);

                                    toast.success(result.message, {
                                        className: "border border-main",
                                    });
                                } catch (error) {
                                    toast.error(getErrorMessage(error));
                                }
                            }}
                        >
                            {emailSent ? "Email ya enviado" : " Mandar email"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
