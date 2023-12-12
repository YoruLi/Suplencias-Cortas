import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectTeacher({ data, cargo }: { data: Teacher[]; cargo: CargoResponse }) {
    console.log(data);
    return (
        <Select name="docenteId" defaultValue={cargo.docenteId} disabled={data?.length === 0}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar docente" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Docentes</SelectLabel>
                    {data.length
                        ? data?.map(d => {
                              return (
                                  <SelectItem value={d.idDocentes} key={d.idDocentes}>
                                      {d.nombreCompleto}
                                  </SelectItem>
                              );
                          })
                        : null}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
