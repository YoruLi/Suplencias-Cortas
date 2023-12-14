"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "../../../../components/ui/label";

import React from "react";

import { getMateriasDocente } from "../../materias/api/get-materias";
import { updateCargos } from "../actions/update-cargo";
import { getCursos } from "../../cursos/api/get-cursos";

import { SelectItems } from "../../../../components/ui/select-items";
import { Select, SelectItem } from "../../../../components/ui/select";
import { AutoCompleteField } from "../../../../components/elements/auto-complete-field";
import { useForm } from "react-hook-form";
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
    React.useEffect(() => {
        const fetchData = async () => {
            const [materiasResult, cursosResult] = await Promise.allSettled([getMateriasDocente(cargo.docenteId), getCursos()]);
            const materias = materiasResult.status === "fulfilled" ? materiasResult.value : [];
            const cursos = cursosResult.status === "fulfilled" ? cursosResult.value : [];
            return {
                materias,
                cursos,
            };
        };

        fetchData().then(d => {
            const { materias, cursos } = d;
            setMaterias(materias);
            setCursos(cursos);
        });
    }, []);

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

    const submit = async data => {
        const { error } = await updateCargos(data, cargo);
        if (error) {
            toast.error(error);
        } else {
            toast.success("El cargo se modificó éxito!");
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MenuItem className="!text-sm !px-2 text-start">Editar cargo</MenuItem>
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
                        <TabsContent value={"informacion"} className="grid grid-cols-2 gap-4">
                            {fields.map(({ field, label }) => {
                                return (
                                    <>
                                        <Label htmlFor={label} className="text-sm self-center ">
                                            {label}
                                        </Label>
                                        {field}
                                    </>
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
