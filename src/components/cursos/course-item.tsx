import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CourseItem({ curso }: { curso: Curso }) {
    return (
        <Card className="w-[22rem]">
            <CardHeader>
                <CardTitle>{curso.nombre}</CardTitle>
                <CardDescription>{curso.cicloLectivo}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{curso.modalidad}</p>
            </CardContent>
            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
        </Card>
    );
}
