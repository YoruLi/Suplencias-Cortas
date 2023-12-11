import * as React from "react";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

export type OptionType = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: OptionType[];
    selected: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
    listData: any;
    placeholder?: string;
}

function MultiSelect({ options, selected, onChange, className, ...props }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: string) => {
        console.log(item);
        onChange(selected.filter(i => i !== item));
        props.listData(selected.filter(i => i !== item));
    };

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${selected.length > 1 ? "h-full" : "h-10"}`}
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex gap-1 flex-wrap">
                        {selected?.length && selected.length > 0
                            ? selected.map(item => {
                                  const selectedItem = options.find(option => option.value === item);
                                  return (
                                      <Badge variant="secondary" key={item} className="mr-1 mb-1" onClick={() => handleUnselect(item)}>
                                          {selectedItem?.label} {/* Mostrar el label de la opción */}
                                      </Badge>
                                  );
                              })
                            : props.placeholder ?? "Seleccionar.."}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {options.map(option => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    const newSelected = selected.includes(option.value) ? selected.filter(item => item !== option.value) : [...selected, option.value];
                                    onChange(newSelected);

                                    const updatedSelected = [...newSelected];
                                    props.listData(updatedSelected);
                                    setOpen(true);
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")} />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export { MultiSelect };
