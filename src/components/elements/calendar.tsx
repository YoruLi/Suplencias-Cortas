"use client";

import * as React from "react";
import { Button } from "../ui/button";

import DemoMultiList from "../ui/demo-multi-list";
import { daysOfWeek } from "@/utils/utils";

const hours = [
    {
        label: "1ra-4ta",
        value: "1ra y 4ta",
    },
    {
        label: "1ra-2da",
        value: "1ra y 2da",
    },
    {
        label: "1ra-3ra",
        value: "1ra y 3ra",
    },
    {
        label: "3ra-4ta",
        value: "3ra y 4ta",
    },
    {
        label: "5ta",
        value: "5ta",
    },
];

export function CalendarDemo({ errors, setValueForm, register }: { register: any; errors: any; setValueForm: any }) {
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
    const [listData, setListData] = React.useState<{ [day: string]: string[] }>({});

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
        console.log({ ...listData, [day]: data });
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
                                <input
                                    type="checkbox"
                                    name="days"
                                    {...register("days")}
                                    value={day}
                                    onClick={() => toggleDay(day)}
                                    className="opacity-0 absolute inset-0"
                                />
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
                        <DemoMultiList listData={data => handleListDataChange(selectedDay, data)} options={hours} placeholder="Seleccionar horario" />
                    </div>
                ))}
                {errors.hours && <p className="text-red-500 text-xs italic">{errors.hours && Object.values(errors.hours)[0].message?.toString()}</p>}
            </div>
        </>
    );
}
//
