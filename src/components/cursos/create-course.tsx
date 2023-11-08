import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SelectNameCourse } from "./select-name-course";
import { Select } from "../ui/select";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "../submit-button";

export function CreateCourse({ modalidad }: { modalidad: string | undefined }) {
    const handleSubmit = async (data: FormData) => {
        "use server";
        const form = Object.fromEntries(data);

        const courseData = {
            ...form,
            modalidad,
        };

        const result = await fetch("http://localhost:3000/api/cursos", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        });

        revalidatePath("/cursos");
        redirect("/cursos");
    };

    return (
        <form action={handleSubmit} className="grid place-content-center h-full lg:min-h-[calc(100dvh-56px)] min-h-[calc(100dvh-56px-56px)] mx-auto ">
            <Tabs className="max-w-lg">
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
                        <SubmitButton content="Crear" />
                    </CardFooter>
                </Card>
            </Tabs>
        </form>
    );
}
