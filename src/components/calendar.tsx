"use client";

import * as React from "react";
import { Button } from "./ui/button";

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    const toggleDay = (day: string) => {
        const newSelection = selectedDays.includes(day) ? selectedDays.filter(selected => selected !== day) : [...selectedDays, day];
        setSelectedDays(newSelection);
    };

    // return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />;

    return (
        <>
            <div className="space-y-3">
                <label>Selecciona los días de la semana:</label>
                <div className="flex gap-2 ">
                    {daysOfWeek.map((day, index) => (
                        <Button className={`relative ${selectedDays.includes(day) ? "bg-main text-white" : "bg-white text-black hover:bg-[#0F172A] hover:text-white "}`}>
                            <input key={index} type="checkbox" name="day" value={day} onClick={() => toggleDay(day)} className="opacity-0 absolute inset-0" />
                            {day}
                        </Button>
                    ))}
                </div>
                <p>Días seleccionados: {selectedDays.join(", ")}</p>
                {selectedDays.map((selectedDay, index) => (
                    <div key={index}>
                        <label>{selectedDay}:</label>
                        <input type="time" name="hour" />
                    </div>
                ))}
            </div>
        </>
    );
}
//
