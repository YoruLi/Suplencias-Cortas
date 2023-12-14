import * as React from "react";

import { SelectItem } from "@/components/ui/select";
import { SelectItems } from "@/components/ui/select-items";
import { cursos, divisiones } from "@/utils/utils";

export function SelectNameCourse({ register, setValueForm }: { register?: any; setValueForm?: any }) {
    return (
        <div className="flex lg:flex-row flex-col   mx-auto w-full items-center justify-evenly">
            <SelectItems title="Cursos" formData="curso" setValueForm={setValueForm} placeholder="Cursos">
                {cursos.map(curso => (
                    <>
                        <SelectItem value={curso}>{curso}</SelectItem>
                    </>
                ))}
            </SelectItems>
            <SelectItems title="Divisiones" formData="division" setValueForm={setValueForm} placeholder="Divisiones">
                {divisiones.map(division => (
                    <>
                        <SelectItem value={division}>{division}</SelectItem>
                    </>
                ))}
            </SelectItems>
        </div>
    );
}
