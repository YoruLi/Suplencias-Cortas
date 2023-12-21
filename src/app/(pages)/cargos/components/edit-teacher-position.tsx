"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "../../../../components/ui/label";

import React from "react";

import { getMateriasDocente } from "../../materias/api/get-materias";
import { updateCargos } from "../actions/update-cargo";
import { getCursos } from "../../cursos/api/get-cursos";

import { SelectItems } from "../../../../components/ui/select-items";
import { Select, SelectItem } from "../../../../components/ui/select";
import { AutoCompleteField } from "../../../../components/elements/auto-complete-field";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MenuItem } from "@mui/material";
import { stateAsignation } from "@/utils/utils";
import { CalendarDemo } from "@/components/elements/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { z } from "zod";
import Schedules from "./form/schedules";

export function EditTeacherPosition({ cargo }: { cargo: CargoResponse }) {
    const [materias, setMaterias] = React.useState<Materia[]>([]);
    const [cursos, setCursos] = React.useState<Curso[]>([]);
    const schema = z.object({
        docentes: z.string().optional(),
        cursoId: z.string().optional(),
        codigoMateria: z.string().optional(),
        hours: z.any().optional(),
        days: z.any().optional(),
        state: z.string().optional(),
    });
    const {
        setValue,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const fetchData = React.useCallback(async () => {
        const [signaturesResult, coursessResult] = await Promise.allSettled([getMateriasDocente(cargo.docenteId), getCursos()]);
        const signatures = signaturesResult.status === "fulfilled" ? signaturesResult.value : [];
        const courses = coursessResult.status === "fulfilled" ? coursessResult.value : [];

        return { signatures, courses };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        fetchData().then(d => {
            const { signatures, courses } = d;
            setMaterias(signatures);
            setCursos(courses);
        });
    }, [fetchData]);

    const fields = [
        {
            label: "Docente",
            field: <AutoCompleteField name="docentes" placeholder="Buscar docente..." setValueForm={setValue} control={control} />,
        },
        {
            label: "Curso",
            field: (
                <SelectItems title={"Curso"} formData={"cursoId"} setValueForm={setValue} placeholder={"Seleccionar curso"}>
                    {cursos.map(curso => (
                        <React.Fragment key={curso.id}>
                            <SelectItem value={curso.id}>{curso.nombre}</SelectItem>
                        </React.Fragment>
                    ))}
                </SelectItems>
            ),
        },
        {
            label: "Materia",
            field: (
                <SelectItems title={"Materias"} formData={"codigoMateria"} setValueForm={setValue} placeholder={"Seleccionar materia"}>
                    {materias.map(materia => (
                        <React.Fragment key={materia.codigoMateria}>
                            <SelectItem value={materia.codigoMateria}>{materia.nombre}</SelectItem>
                        </React.Fragment>
                    ))}
                </SelectItems>
            ),
        },

        {
            label: "Estado",
            field: (
                <SelectItems title={"Estado"} formData={"state"} setValueForm={setValue} placeholder={"Seleccionar estado"}>
                    {stateAsignation.map(state => (
                        <React.Fragment key={state}>
                            <SelectItem value={state}>{state}</SelectItem>
                        </React.Fragment>
                    ))}
                </SelectItems>
            ),
        },
    ];

    const schedules = [
        {
            field: (
                <React.Fragment>
                    <CalendarDemo register={register} errors={errors} setValueForm={setValue} />
                </React.Fragment>
            ),
        },
    ];

    const submit: SubmitHandler<FieldValues> = async data => {
        const { error } = await updateCargos(data, cargo);
        if (error) {
            toast.error(JSON.parse(error).error);
        } else {
            toast.success("El cargo se modificó con éxito!");
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MenuItem className="!text-sm !px-2 ">Editar cargo</MenuItem>
            </DialogTrigger>
            <DialogContent className="h-auto">
                <Tabs className="max-w-lg space-y-4 p-2" defaultValue="informacion">
                    <Select name="modalidad">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="informacion">Información</TabsTrigger>
                            <TabsTrigger value="horarios">Horarios</TabsTrigger>
                        </TabsList>
                    </Select>

                    <DialogHeader>
                        <DialogTitle>Editar Cargo</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(submit)}>
                        <TabsContent value={"informacion"} className="flex flex-col gap-3">
                            {fields.map(({ field, label }) => {
                                return (
                                    <div key={label} className="flex  gap-3 justify-between w-full">
                                        <Label htmlFor={label} className="text-sm self-center flex-0 shrink-0 ">
                                            {label}
                                        </Label>
                                        <div className="w-full flex-1 flex-grow">{field}</div>
                                    </div>
                                );
                            })}
                        </TabsContent>
                        <Schedules errors={errors} register={register} setValue={setValue} />
                        <DialogFooter>
                            <Button type="submit" className="mt-4">
                                Guardar cambios
                            </Button>
                        </DialogFooter>
                    </form>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
