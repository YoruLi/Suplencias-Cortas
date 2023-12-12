"use client";
import React from "react";
import SubmitButton from "@/components/elements/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DeleteButton from "@/components/elements/delete-button";
import { SelectItems } from "@/components/ui/select-items";
import { SelectItem } from "@/components/ui/select";
import { edit } from "../../materias/actions/update-signature";
import { cursos as signatureDays } from "@/utils/utils";

function SchoolIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m4 6 8-4 8 4" />
            <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
            <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
            <path d="M18 5v17" />
            <path d="M6 5v17" />
            <circle cx="12" cy="9" r="2" />
        </svg>
    );
}

export default function SheetItem({ materia }: { materia: Materia }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
                    <div className="card-header p-4 flex items-center justify-between">
                        <p className="font-semibold text-lg text-center line-clamp-1 overflow-hidden text-ellipsis">{materia.nombre}</p>
                        <SchoolIcon className="w-6 h-6" />
                    </div>

                    <div className="card-content p-4">
                        <div className="rounded-t bg-[#0F172A]  ">
                            <Avatar className="w-20 h-20 mx-auto ">
                                <AvatarImage src="imgs/logo-alternative.svg" className="" />
                                <AvatarFallback className="bg-[#0F172A] text-white">TEC</AvatarFallback>
                            </Avatar>
                        </div>
                        <p className="mt-3 text-center">{materia.año} año</p>
                    </div>
                </div>
            </SheetTrigger>

            <SheetContent className="overflow-y-scroll bg-white ">
                <SheetHeader>
                    <SheetTitle>Editar materia</SheetTitle>
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
                                <SelectItem key={day} value={day} className="capitalize" defaultValue={materia.año}>
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
                                <SubmitButton>Guardar cambios</SubmitButton>
                            </div>
                        </SheetFooter>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
