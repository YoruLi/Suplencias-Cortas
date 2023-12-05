"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SelectNameCourse } from "./select-name-course";
import { Select } from "../ui/select";
import Link from "next/link";

import SubmitButton from "../submit-button";

import toast from "react-hot-toast";
import { createCourse } from "../../../actions/create-course";
import { ZodError } from "zod";

export function CreateCourse({ modalidad }: { modalidad: string }) {
    const isSelected = modalidad === "1" ? "informatica" : modalidad === "2" ? "quimica" : modalidad === "3" ? "construccion" : "ciclo-basico";

    return (
        <form
            action={data => {
                createCourse(data, modalidad)
                    .then(res => {
                        console.log(res);
                        if (res?.error === "ZodError") {
                            return res?.data.forEach((issue: ZodError) => {
                                toast.error(issue.message);
                            });
                        }
                        res?.error ? toast.error(res.message) : toast.success("Curso creado con éxito!!");
                    })
                    .catch(error => {
                        return toast.error(error.message);
                    });
            }}
            className="grid place-content-center h-full  min-h-[calc(100dvh-56px)] mx-auto"
        >
            <Tabs className="max-w-lg" defaultValue={isSelected}>
                <Select name="modalidad">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger asChild value="informatica">
                            <Link href={"?modalidad=1"}>Informatica</Link>
                        </TabsTrigger>
                        <TabsTrigger asChild value="quimica">
                            <Link href={"?modalidad=2"}>Quimica</Link>
                        </TabsTrigger>
                        <TabsTrigger asChild value="construccion">
                            <Link href={"?modalidad=3"}>Construccion</Link>
                        </TabsTrigger>
                    </TabsList>
                </Select>

                <Card>
                    <CardHeader>
                        <CardTitle>Curso</CardTitle>
                        <CardDescription>Crea un nuevo curso. Guarda los cambios cuando termines.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <SelectNameCourse />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="ciclo">Ciclo Lectivo</Label>
                            <Input
                                id="ciclo"
                                name="ciclo"
                                type="text"
                                className="pointer-events-none opacity-70"
                                value={new Date().getFullYear()}
                                defaultValue={new Date().getFullYear()}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton>Crear</SubmitButton>
                    </CardFooter>
                </Card>
            </Tabs>
        </form>
    );
}
