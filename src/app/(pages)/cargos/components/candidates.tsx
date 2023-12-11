import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MenuItem } from "@mui/material";

import React, { useEffect } from "react";
import { columns } from "./columns";

import { Button } from "@/components/ui/button";
import { z } from "zod";

import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/get-error-message";
import { updateCargos, updateCargoToCandidate } from "../../../../../actions/update-cargo";

type CandidatesSchema = {
    candidates: boolean;
};

const TrueBooleanSchema = z.boolean().refine(data => data === true, {
    message: "Debes seleccionar un candidato",
});
const candidateSchema = TrueBooleanSchema;
export default function Candidates({ cargoId }: { cargoId: string }) {
    const [candidates, setCandidates] = React.useState<[]>([]);

    useEffect(() => {
        const getCandidatos = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/candidates?cargoId=${cargoId}`, {
                    cache: "no-store",
                    method: "GET",
                });

                const result = await res.json();

                return result;
            } catch (error) {
                return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
            }
        };

        getCandidatos().then(data => {
            setCandidates(data);
        });
    }, []);

    const submit = async e => {
        e.preventDefault();
        const checkbox = e.target.candidate;
        const checkedCheckbox = checkbox.length > 1 ? Array.from(checkbox).find(input => input.type === "checkbox" && input?.checked) : checkbox;
        const validated = candidateSchema.safeParse(checkedCheckbox?.checked);
        if (!validated.success) {
            return toast.error(getErrorMessage(validated.error.issues[0].message));
        }
        await updateCargoToCandidate({ candidatoId: checkedCheckbox?.value, cargoId });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MenuItem className="!text-sm !px-2 text-start">Candidatos</MenuItem>
            </DialogTrigger>
            <DialogContent className="min-w-[50%]">
                <DialogHeader>
                    <DialogTitle>Candidatos</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>

                <form onSubmit={e => submit(e)} className="w-full overflow-hidden flex flex-col justify-between">
                    <div className="h-[300px] overflow-hidden overflow-y-auto">
                        <DataTable columns={columns} data={candidates} pagination={false} />
                    </div>
                    <Button className="self-end">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
