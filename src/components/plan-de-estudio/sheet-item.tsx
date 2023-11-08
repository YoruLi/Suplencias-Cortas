"use client";
import React from "react";
import SubmitButton from "@/components/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DeleteButton from "../delete-button";
import { SelectItems } from "../ui/select-items";
import { SelectItem } from "../ui/select";
import { edit } from "../../../actions/update-signature";

const signatureDays = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo"];

export default function SheetItem({ materia, index }: { materia: Materia; index: number }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="flex flex-col border-2 justify-center  group w-[190px] justify-self-center rounded hover:opacity-80" key={materia.codigoMateria}>
                    <div className="rounded-t bg-[#0F172A]  ">
                        <Avatar className="w-20 h-20 mx-auto ">
                            <AvatarImage src="imgs/logo-alternative.svg" className="" />
                            <AvatarFallback className="bg-[#0F172A] text-white">TEC</AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="font-normal font-sans text-center  p-1 tracking-widest line-clamp-1 overflow-hidden text-ellipsis">
                        {materia.nombre} {materia.año}
                    </span>
                </div>
            </SheetTrigger>

            <SheetContent className="overflow-y-scroll bg-white ">
                <SheetHeader>
                    <SheetTitle>Editar plan de estudio</SheetTitle>
                    <SheetDescription>Haz cambios a los cursos aquí. Guarda los cambios cuando termines.</SheetDescription>
                </SheetHeader>
                <form action={data => edit(materia.codigoMateria, data)} className=" space-y-4 py-4  [&>div>*]:bg-white w-full">
                    <div className="w-full">
                        <Label>Nombre de materia</Label>
                        <Input
                            name="name"
                            placeholder={"Nombre de materia"}
                            defaultValue={materia.nombre}
                            className="!outline-none !focus:outline-none !ring-0 !ring-offset-0"
                        />
                    </div>

                    <div className="w-full">
                        <Label>Año</Label>
                        <SelectItems placeholder="Selecciona el año" title="Años" formData="year">
                            {signatureDays.map(day => (
                                <SelectItem value={day} className="capitalize" defaultValue={materia.año}>
                                    {day}
                                </SelectItem>
                            ))}
                        </SelectItems>
                    </div>

                    <div>
                        <SheetFooter className="flex gap-2">
                            <DeleteButton entity="materias" id={materia.codigoMateria}>
                                Eliminar materia
                            </DeleteButton>
                            <div>
                                <SubmitButton content="Guardar cambios" />
                            </div>
                        </SheetFooter>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
