import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CourseItem from "./course-item";
import Form from "./form/form";

export function SheetDemo({ cursoData }: { cursoData: Curso }) {
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

                <Form courseData={cursoData} />
            </SheetContent>
        </Sheet>
    );
}
