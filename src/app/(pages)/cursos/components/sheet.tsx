import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CourseItem from "./course-item";
import { SelectNameCourse } from "./select-name-course";
import { editCourseWithId } from "../api/edit-course-with-id";
import DeleteButton from "../../../../components/elements/delete-button";

export function SheetDemo({ cursoData }: { cursoData: Curso }) {
    const handleSubmit = async (data: FormData) => {
        "use server";
        const formData = Object.fromEntries(data);
        const { curso, division, ciclo } = formData;

        const dataCourse = {
            id: cursoData.id,
            nombre: `${curso} ${division}`,
            cicloLectivo: ciclo,
        };

        await editCourseWithId(dataCourse);
    };
    return (
        <Sheet>
            <SheetTrigger asChild className="w-full">
                <CourseItem curso={cursoData} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar curso</SheetTitle>
                    <SheetDescription>Haz cambios a los cursos aquí. Guarda los cambios cuando termines.</SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className=" space-y-4 py-4">
                    <SelectNameCourse />
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

                    <div>
                        <SheetFooter className="flex gap-2">
                            <SheetClose asChild>
                                <DeleteButton id={cursoData.id} entity="cursos">
                                    Eliminar curso
                                </DeleteButton>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button type="submit">Guardar cambios</Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
