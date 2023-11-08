"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CalendarDemo() {
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    const toggleDay = (day: string) => {
        const newSelection = selectedDays.includes(day) ? selectedDays.filter(selected => selected !== day) : [...selectedDays, day];
        setSelectedDays(newSelection);
    };

    return (
        <>
            <div className="space-y-3">
                <label className="text-sm">Selecciona los días:</label>
                <div className="flex gap-1">
                    {daysOfWeek.map((day, index) => (
                        <Button
                            className={`relative ${selectedDays.includes(day) ? "bg-[#0F172A] text-white" : "bg-white text-black hover:bg-[#0F172A] hover:text-white "}`}
                        >
                            <input key={index} type="checkbox" name="day" value={day} onClick={() => toggleDay(day)} className="opacity-0 absolute inset-0" />
                            {day}
                        </Button>
                    ))}
                </div>
                <p className="text-sm">Días seleccionados: </p>
                {selectedDays.map((selectedDay, index) => (
                    <div key={index}>
                        <label>{selectedDay}:</label>
                        <Input type="time" name="hour" />
                    </div>
                ))}
            </div>
        </>
    );
}
//
