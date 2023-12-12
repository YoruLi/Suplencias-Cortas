import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectDays() {
    return (
        <Select name="turno">
            <SelectTrigger>
                <SelectValue placeholder="Selecciona un dia" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Dias</SelectLabel>
                    <SelectItem value="Lunes" id="lunes">
                        Lunes
                    </SelectItem>
                    <SelectItem value="Martes" id="martes">
                        Martes
                    </SelectItem>
                    <SelectItem value="Miercoles" id="miercoles">
                        Miercoles
                    </SelectItem>
                    <SelectItem value="Jueves" id="jueves">
                        Jueves
                    </SelectItem>
                    <SelectItem value="Viernes" id="viernes">
                        Viernes
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
