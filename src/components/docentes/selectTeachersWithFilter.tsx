"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

interface TeacherList {
    id: string;
    value: string;
    label: string;
}
export function SelectTeacherWithFilter({ data }: { data: Teacher[] }) {
    const router = useRouter();

    const dataInfo = data.map((d: Teacher): TeacherList => {
        return {
            id: d.idDocentes,
            value: d.nombreCompleto,
            label: d.nombreCompleto,
        };
    });
    const searchParams = useSearchParams();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const isSelected = dataInfo.filter(d => d.id === searchParams.get("docente"));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {searchParams.get("docente")
                        ? isSelected[0].value
                        : value
                        ? dataInfo.find(d => d.value.toLowerCase() === value.toLowerCase())?.label
                        : "Seleccionar docente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] h-[200px] overflow-hidden ">
                <Command>
                    <CommandInput placeholder="Buscar materia..." />
                    <CommandEmpty>No se encontró docente...</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll h-full ">
                        {dataInfo.map(d => (
                            <CommandItem
                                key={d.value}
                                value={d.value}
                                onSelect={currentValue => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    const params = new URLSearchParams(searchParams);
                                    params.set("docente", d.id);

                                    router.replace(`?${params.toString()}`);

                                    setOpen(false);
                                }}
                            >
                                <Check className={cn("h-4 w-4", value === d.value ? "opacity-100" : "opacity-0")} />
                                {d.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
