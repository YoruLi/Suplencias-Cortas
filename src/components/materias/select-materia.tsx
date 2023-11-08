import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectMateria({ data }: { data: Materia[] }) {
    return (
        <Select name="codigoMateria" disabled={data?.length === 0}>
            <SelectTrigger className="">
                <SelectValue placeholder="Seleccionar materia" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Materias</SelectLabel>
                    {data.length
                        ? data?.map(d => {
                              return (
                                  <SelectItem value={d.codigoMateria} key={d.codigoMateria}>
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
