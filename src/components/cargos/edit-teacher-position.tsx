import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectDays } from "./selectDays";

import React from "react";

import { getMaterias } from "../materias/api/get-materias";
import { updateCargos } from "../../../actions/update-cargo";
import { getCursos } from "../cursos/api/get-cursos";
import { useSearchParams } from "next/navigation";
import { getTeachers } from "../docentes/api/get-teachers";

import { SelectItems } from "../ui/select-items";
import { SelectItem } from "../ui/select";
import { AutoCompleteField } from "../auto-complete-field";
import { useForm } from "react-hook-form";

const stateAsignation = ["Asignado", "Sin asignar"];
export function EditTeacherPosition({ cargo }: { cargo: CargoResponse }) {
    const [docentes, setDocentes] = React.useState<Teacher[] | []>([]);
    const [materias, setMaterias] = React.useState<Materia[]>([]);
    const [cursos, setCursos] = React.useState<Curso[]>([]);
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? undefined;
    const { setValue, control } = useForm();
    React.useEffect(() => {
        const fetchData = async () => {
            const [materiasResult, cursosResult] = await Promise.allSettled([getMaterias(), getCursos()]);

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
            label: "Turno",
            field: <SelectDays />,
        },
        {
            label: "Horario",
            field: <Input id="horario" name="horario" defaultValue={cargo.horario} type="time" />,
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
                <Button variant="outline">Editar Cargo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Cargo</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
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
