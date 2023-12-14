import { CalendarDemo } from "@/components/elements/calendar";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

export default function Schedules({ register, errors, setValue }: { register: any; errors: any; setValue: any }) {
    const schedules = [
        {
            field: (
                <React.Fragment>
                    <CalendarDemo register={register} errors={errors} setValueForm={setValue} />
                </React.Fragment>
            ),
        },
    ];

    return (
        <TabsContent value={"horarios"}>
            {schedules.map(({ field, label }) => {
                return (
                    <>
                        <Label htmlFor={label} className="text-sm self-center ">
                            {label}
                        </Label>

                        {field}
                    </>
                );
            })}
        </TabsContent>
    );
}
