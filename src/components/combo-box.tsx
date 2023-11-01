"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

interface MateriaList {
    value: string;
    label: string;
}
export function MateriaList({ data }: { data: Materia[] }) {
    const router = useRouter();
    const location = window.location.href;

    const dataInfo = data.map((d: Materia): MateriaList => {
        return {
            value: d.nombre,
            label: d.nombre,
        };
    });

    console.log(dataInfo);
    const params = useSearchParams();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const searchParams = useSearchParams();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={!searchParams.get("docente")} role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {searchParams.get("materias")
                        ? searchParams.get("materias")
                        : value
                        ? dataInfo.find(d => d.value.toLowerCase() === value.toLowerCase())?.label
                        : "Seleccionar materia..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar materia..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {dataInfo.map(d => {
                            return (
                                <CommandItem
                                    key={d.value}
                                    value={d.value}
                                    disabled={!searchParams.get("docente")}
                                    onSelect={currentValue => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        const params = new URLSearchParams(searchParams);
                                        params.set("materias", d.value);

                                        router.replace(`?${params.toString()}`);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", value === d.value ? "opacity-100" : "opacity-0")} />
                                    {d.label}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
