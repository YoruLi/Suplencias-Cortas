import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import StudyPlanItem from "./study-plan-item";
import Card from "./card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/elements/submit-button";
import { planValidation } from "@/validation/zod";
import { editPlanDeEstudio } from "../api/edit";

export default function CardPlan({ studyPlan }: { studyPlan: any }) {
    const handleSubmit = async (data: FormData) => {
        "use server";
        const formData = Object.fromEntries(data);
        const { name, description, resolution } = formData;

        const planObject = {
            ...(studyPlan && { id: studyPlan.id }),
            ...(name && { nombre: name }),
            ...(description && { descripcion: description }),
            ...(resolution && { resolucion: resolution }),
        };
        const validatedData = planValidation.safeParse(planObject);
        if (!validatedData.success) {
            return;
        }

        await editPlanDeEstudio(planObject);
    };

    return (
        <Sheet>
            <SheetTrigger asChild className="w-full cursor-pointer">
                <Card plan={studyPlan} />
            </SheetTrigger>
            <SheetContent side={"bottom"} className="z-[99] overflow-y-scroll bg-white ">
                <SheetHeader>
                    <SheetTitle>Editar plan de estudio</SheetTitle>
                    <SheetDescription>Haz cambios a los cursos aquí. Guarda los cambios cuando termines.</SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className=" space-y-4 py-4  [&>div>*]:bg-white w-full">
                    <div className=" ">
                        <Label>Nombre del plan:</Label>
                        <Input
                            defaultValue={studyPlan.nombre}
                            name="name"
                            placeholder={"Nombre del plan"}
                            className="!outline-none !focus:outline-none !ring-0 !ring-offset-0"
                        />
                    </div>

                    <div
                        className="w-full flex flex-col [&>textarea]:border [&>*]:outline-none  [&>textarea]:border-slate-300
                     [&>textarea]:resize-none"
                    >
                        <Label>Descripcion:</Label>
                        <Textarea
                            rows={4}
                            defaultValue={studyPlan.descripcion}
                            name="description"
                            placeholder={"Descripcion"}
                            className="!outline-none !focus:outline-none !ring-0 !ring-offset-0"
                        />
                    </div>
                    <div
                        className="w-full flex flex-col [&>textarea]:border [&>textarea]:outline-none [&>textarea]:border-slate-300
                     [&>textarea]:resize-none"
                    >
                        <Label>Resolucion:</Label>
                        <Textarea
                            rows={4}
                            defaultValue={studyPlan.resolucion}
                            name="resolution"
                            placeholder={"Resolucion"}
                            className="!outline-none !focus:outline-none !ring-0 !ring-offset-0"
                        />
                    </div>

                    <div>
                        <SheetFooter className="flex gap-2">
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
