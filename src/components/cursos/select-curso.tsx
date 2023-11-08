import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectCurso({ data }: { data: Curso[] }) {
    return (
        <Select name="cursoId" disabled={data?.length === 0}>
            <SelectTrigger>
                <SelectValue placeholder="Seleccionar curso" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cursos</SelectLabel>
                    {data.length
                        ? data?.map(d => {
                              return (
                                  <SelectItem value={d.id} key={d.id}>
                                      {d.nombre}
                                  </SelectItem>
                              );
                          })
                        : null}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
