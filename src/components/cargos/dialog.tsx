import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectDays } from "./selectDays";

import React from "react";

import { getMaterias } from "../materias/api/get-materias";

import { SelectMateria } from "../materias/select-materia";
import { SelectCurso } from "../cursos/select-curso";

import { updateCargos } from "../../../actions/update-cargo";
import { getCursos } from "../cursos/api/get-cursos";

import { useSearchParams } from "next/navigation";
import { getTeachers } from "../docentes/api/get-teachers";
import Search from "../search";
import TeachersList from "../teachers-list";

export function DialogDemo({ cargo }: { cargo: CargoResponse }) {
    const [docentes, setDocentes] = React.useState<Teacher[] | []>([]);
    const [materias, setMaterias] = React.useState<Materia[]>([]);
    const [cursos, setCursos] = React.useState<Curso[]>([]);
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? undefined;

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
                        updateCargos(data, cargo, searchParams);
                    }}
                    className="grid gap-3.5 py-4"
                >
                    <div className="flex flex-col items-center relative ">
                        <div className="flex items-center justify-start w-full gap-4  ">
                            <Label htmlFor="name" className="text-start  ">
                                Docente
                            </Label>

                            <div className="w-full">
                                <Search search="/cargos" />
                            </div>
                        </div>

                        <div className="mt-2 w-full">
                            <TeachersList teachers={docentes} />
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Label htmlFor="curso" className="text-right">
                            Curso
                        </Label>
                        <SelectCurso data={cursos} />
                    </div>

                    <div className="flex gap-4 items-center">
                        <Label htmlFor="materia" className="text-right">
                            Materia
                        </Label>
                        <SelectMateria data={materias} />
                    </div>

                    <div className="flex gap-4 items-center">
                        <Label htmlFor="turno" className="text-right">
                            Turno
                        </Label>

                        <SelectDays />
                    </div>

                    <div className="flex gap-4 items-center">
                        <Label htmlFor="horario" className="text-right">
                            Horario
                        </Label>
                        <Input id="horario" name="horario" defaultValue={cargo.horario} type="time" />
                    </div>

                    <DialogTrigger>
                        <Button type="submit">Save changes</Button>
                    </DialogTrigger>
                </form>
            </DialogContent>
        </Dialog>
    );
}
