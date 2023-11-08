import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
const cursos = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo"];

const divisiones = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma", "8va", "9na", "10ma"];

export function SelectNameCourse() {
    return (
        <div className="flex mx-auto w-full items-center justify-evenly">
            <Select name="curso">
                <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-ellipsis overflow-hidden break-all whitespace-nowrap">
                    <SelectValue placeholder="Seleccionar curso" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Curso</SelectLabel>

                        {cursos.map(curso => (
                            <>
                                <SelectItem value={curso}>{curso}</SelectItem>
                            </>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select name="division">
                <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-ellipsis overflow-hidden break-all whitespace-nowrap">
                    <SelectValue placeholder="Seleccionar division" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Division</SelectLabel>

                        {divisiones.map(division => (
                            <>
                                <SelectItem value={division}>{division}</SelectItem>
                            </>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
