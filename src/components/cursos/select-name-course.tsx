import * as React from "react";

import { SelectItem } from "@/components/ui/select";
import { SelectItems } from "../ui/select-items";
const cursos = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo"];

const divisiones = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma", "8va", "9na", "10ma"];

export function SelectNameCourse() {
    return (
        <div className="flex flex-wrap mx-auto w-full items-center justify-evenly">
            <SelectItems title="Cursos" formData="curso" placeholder="Cursos">
                {cursos.map(curso => (
                    <>
                        <SelectItem value={curso}>{curso}</SelectItem>
                    </>
                ))}
            </SelectItems>
            <SelectItems title="Divisiones" formData="division" placeholder="Divisiones">
                {divisiones.map(division => (
                    <>
                        <SelectItem value={division}>{division}</SelectItem>
                    </>
                ))}
            </SelectItems>
        </div>
    );
}
