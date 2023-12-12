import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { SelectDays } from "./selectDays";

import React from "react";

import { getMaterias, getMateriasDocente } from "../../materias/api/get-materias";
import { updateCargos } from "../actions/update-cargo";
import { getCursos } from "../../cursos/api/get-cursos";
import { useSearchParams } from "next/navigation";
import { getTeachers } from "../../docentes/api/get-teachers";

import { SelectItems } from "../../../../components/ui/select-items";
import { Select, SelectItem } from "../../../../components/ui/select";
import { AutoCompleteField } from "../../../../components/elements/auto-complete-field";
import { useForm } from "react-hook-form";

import { MenuItem } from "@mui/material";
import { stateAsignation } from "@/utils/utils";
import { CalendarDemo } from "@/components/elements/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export function EditTeacherPosition({ cargo }: { cargo: CargoResponse }) {
    const [docentes, setDocentes] = React.useState<Teacher[] | []>([]);
    const [materias, setMaterias] = React.useState<Materia[]>([]);
    const [cursos, setCursos] = React.useState<Curso[]>([]);
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? undefined;
    const {
        setValue,
        register,
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

    const fetchTeachers = React.useCallback(() => {
        getTeachers({ query: search }).then(docentes => {
            setDocentes(docentes);
        });
    }, [search]);

    React.useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const fields = [
        {
            label: "Docente",
            field: <AutoCompleteField name="docentes" placeholder="Buscar docente..." setValueForm={setValue} control={control} />,
        },
        {
            label: "Curso",
            field: (
                <SelectItems title={"Curso"} formData={"cursoId"} placeholder={"Seleccionar curso"}>
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
                <SelectItems title={"Materias"} formData={"codigoMateria"} placeholder={"Seleccionar materia"}>
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
                <SelectItems title={"Estado"} formData={"state"} placeholder={"Seleccionar estado"}>
                    {stateAsignation.map(state => (
                        <React.Fragment key={state}>
                            <SelectItem value={state}>{state}</SelectItem>
                        </React.Fragment>
                    ))}
                </SelectItems>
            ),
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <MenuItem className="!text-sm !px-2 text-start">Editar cargo</MenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Tabs className="max-w-lg space-y-4 p-2 " defaultValue={""}>
                    <Select name="modalidad">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger asChild value="informatica">
                                <Link href={"?modalidad=1"}>Informatica</Link>
                            </TabsTrigger>

                            <TabsTrigger asChild value="construccion">
                                <Link href={"?modalidad=3"}>Construccion</Link>
                            </TabsTrigger>
                        </TabsList>
                    </Select>

                    <DialogHeader>
                        <DialogTitle>Editar Cargo</DialogTitle>
                        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                </Tabs>
                <form
                    action={async data => {
                        updateCargos(data, cargo);
                    }}
                    className="grid gap-3.5 py-4"
                >
                    {fields.map(({ field, label }) => {
                        return (
                            <>
                                <div className="flex items-center justify-start w-full gap-4  ">
                                    <Label htmlFor="name" className="text-start  ">
                                        {label}
                                    </Label>

                                    <div className="w-full">{field}</div>
                                </div>
                            </>
                        );
                    })}

                    <DialogTrigger>
                        <Button type="submit">Save changes</Button>
                    </DialogTrigger>
                </form>
            </DialogContent>
        </Dialog>
    );
}
