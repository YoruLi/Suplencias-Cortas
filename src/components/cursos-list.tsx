"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

interface CursoList {
    id: string;
    value: string;
    label: string;
}
export function CoursesList({ data }: { data: Curso[] }) {
    const router = useRouter();
    const location = window.location.href;

    const dataInfo = data.map((d: Curso): CursoList => {
        return {
            id: d.id,
            value: d.nombre,
            label: d.nombre,
        };
    });
    const searchParams = useSearchParams();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const isSelected = dataInfo.filter(d => d.id === searchParams.get("curso"));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={!searchParams.get("docente")} role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {searchParams.get("curso")
                        ? isSelected[0].value
                        : value
                        ? dataInfo.find(d => d.value.toLowerCase() === value.toLowerCase())?.label
                        : "Seleccionar curso..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar materia..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {dataInfo.map(d => (
                            <CommandItem
                                key={d.value}
                                value={d.value}
                                disabled={!searchParams.get("docente")}
                                onSelect={currentValue => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    const params = new URLSearchParams(searchParams);
                                    params.set("curso", d.id);

                                    router.replace(`?${params.toString()}`);

                                    setOpen(false);
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === d.value ? "opacity-100" : "opacity-0")} />
                                {d.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
