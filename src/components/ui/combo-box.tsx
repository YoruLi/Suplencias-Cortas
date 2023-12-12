"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";

interface MateriaList {
    id: string;
    value: string;
    label: string;
}

interface MateriaListProps {
    setValueForm: any;
    register: any;
    name: string;
    placeholder: string;
    label: string;
    dataInfo: any[];
}
export function MateriaList(props: MateriaListProps) {
    const { setValueForm, dataInfo, label, placeholder, name } = props;
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const searchParams = useSearchParams();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value ? dataInfo.find(d => d.value.toLowerCase() === value.toLowerCase())?.label : label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No se encontraron resultados...</CommandEmpty>
                    <CommandGroup>
                        {dataInfo.map(d => {
                            return (
                                <CommandItem
                                    key={d.id}
                                    value={d.value}
                                    {...props.register(name)}
                                    onSelect={currentValue => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        const params = new URLSearchParams(searchParams);
                                        params.set(name, d.id);
                                        router.replace(`?${params.toString()}`);
                                        setOpen(false);
                                        setValueForm(name, d.id);
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
