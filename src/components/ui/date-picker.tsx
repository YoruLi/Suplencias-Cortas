"use client";

import * as React from "react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface Props {
    setValue: any;
    name: string;
}
export function DatePickerDemo(props: Props) {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Selecciona fecha</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    className="rdp [&>*]:text-sm "
                    {...props}
                    mode="single"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={e => {
                        setDate(e);
                        props.setValue(props.name, e);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
