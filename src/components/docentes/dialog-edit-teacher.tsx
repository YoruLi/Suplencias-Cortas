import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { editTeacher } from "../../../actions/update-teacher";

export default function EditTeacherPosition({ cargo }: { cargo: Cargo }) {
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
                <form action={async data => editTeacher(data, cargo)} className="grid gap-3.5 py-4">
                    <div className="flex flex-col gap-2.5 items-center relative remove-ring ">
                        <div className="flex items-center justify-start w-full gap-4  remove-ring">
                            <Label htmlFor="fullname" className="text-start ">
                                Nombre completo
                            </Label>

                            <Input placeholder="Nombre completo" name="fullname" defaultValue={cargo.nombreCompleto} className="remove-ring" />
                        </div>

                        <div className="flex items-center justify-start w-full gap-4  ">
                            <Label htmlFor="email" className="text-start ">
                                Correo electronico
                            </Label>

                            <Input placeholder="Correo electronico" name="email" defaultValue={teacher.email} className="remove-ring" />
                        </div>

                        <div className="flex items-center justify-start w-full gap-4  ">
                            <Label htmlFor="cuil" className="text-start ">
                                CUIL
                            </Label>

                            <Input placeholder="CUIL" name="dni" defaultValue={teacher.dni} className="remove-ring" />
                        </div>

                        <div className="flex items-center justify-start w-full gap-4  ">
                            <Label htmlFor="tel" className="text-start ">
                                Telefono
                            </Label>

                            <Input placeholder="Telefono" name="tel" defaultValue={teacher.tel} className="remove-ring" />
                        </div>

                        <div className="flex items-center justify-start w-full gap-4  ">
                            <Label htmlFor="dir" className="text-start ">
                                Direccion
                            </Label>

                            <Input placeholder="Direccion" name="dir" defaultValue={teacher.dir} className="remove-ring" />
                        </div>

                        <div className="flex items-center justify-start w-full gap-4  ">
                            <Label htmlFor="score" className="text-start ">
                                Puntaje
                            </Label>

                            <Input placeholder="Puntaje" name="score" defaultValue={teacher.score} className="remove-ring" />
                        </div>
                    </div>

                    <DialogTrigger>
                        <Button type="submit">Save changes</Button>
                    </DialogTrigger>
                </form>
            </DialogContent>
        </Dialog>
    );
}
