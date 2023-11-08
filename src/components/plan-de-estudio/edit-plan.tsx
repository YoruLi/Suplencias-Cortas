import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import SubmitButton from "../submit-button";
import { editPlanDeEstudio } from "./api/edit";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export function EditPlan({ planData }: { planData: any }) {
    const handleSubmit = async (data: FormData) => {
        "use server";
        const formData = Object.fromEntries(data);
        const { name, description, resolution } = formData;

        const planObject = {
            id: planData.id,
            nombre: name,
            descripcion: description,
            resolucion: resolution,
        };

        await editPlanDeEstudio(planObject);
    };
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="select-none">Editar</Button>
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
                            defaultValue={planData.nombre}
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
                            defaultValue={planData.descripcion}
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
                            defaultValue={planData.resolucion}
                            name="resolution"
                            placeholder={"Resolucion"}
                            className="!outline-none !focus:outline-none !ring-0 !ring-offset-0"
                        />
                    </div>

                    <div>
                        <SheetFooter className="flex gap-2">
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
