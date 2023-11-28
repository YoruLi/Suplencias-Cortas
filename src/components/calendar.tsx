"use client";

import * as React from "react";
import { Button } from "./ui/button";

import DemoMultiList from "./ui/demo-multi-list";

export function CalendarDemo({ errors, setValueForm }: { register: any; errors: any; setValueForm: any }) {
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
    const [listData, setListData] = React.useState<{ [day: string]: string[] }>({});

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    const toggleDay = (day: string) => {
        const newSelection = selectedDays.includes(day) ? selectedDays.filter(selected => selected !== day) : [...selectedDays, day];
        setSelectedDays(newSelection);
        setValueForm("hours", { ...listData, [day]: [] });
    };

    const handleListDataChange = (day: string, data: string[]) => {
        setListData(prevListData => ({
            ...prevListData,
            [day]: data,
        }));

        // Utiliza directamente el valor actualizado de listData

        setValueForm("hours", { ...listData, [day]: data });
    };

    return (
        <>
            <div className="space-y-3">
                <div className="flex flex-col  w-full">
                    <label className="text-sm">Selecciona los días:</label>
                    <div className="flex items-center justify-center mx-auto  gap-1 overflow-hidden flex-wrap ">
                        {daysOfWeek.map((day, index) => (
                            <Button
                                key={index}
                                className={`relative ${
                                    selectedDays.includes(day) ? "bg-[#0F172A] text-white" : "bg-white text-black hover:bg-[#0F172A] hover:text-white "
                                }`}
                            >
                                <input type="checkbox" name="days" value={day} onClick={() => toggleDay(day)} className="opacity-0 absolute inset-0" />
                                {day}
                            </Button>
                        ))}
                    </div>
                    {errors.hours && <p className="text-red-500 text-xs italic">{errors.hours && errors.hours.message?.toString()}</p>}
                </div>
                <p className="text-sm">Días seleccionados: </p>
                {selectedDays.map((selectedDay, index) => (
                    <div key={selectedDay}>
                        <label>{selectedDay}:</label>
                        <DemoMultiList listData={data => handleListDataChange(selectedDay, data)} />
                    </div>
                ))}
                {errors.hours && <p className="text-red-500 text-xs italic">{errors.hours && Object.values(errors.hours)[0].message?.toString()}</p>}
            </div>
        </>
    );
}
//
