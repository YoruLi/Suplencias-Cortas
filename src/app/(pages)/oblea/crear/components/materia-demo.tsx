"use client";

import DemoMultiList from "@/components/ui/demo-multi-list";
import * as React from "react";

export function MateriaDemo({ errors, setValueForm, signature }: { register: any; errors: any; setValueForm: any; signature: any }) {
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
    const [listData, setListData] = React.useState<{ [key: string]: string[] }>({});

    // const toggleDay = (day: string) => {
    //     const newSelection = selectedDays.includes(day) ? selectedDays.filter(selected => selected !== day) : [...selectedDays, day];
    //     setSelectedDays(newSelection);
    //     setValueForm("signature", { ...listData, [day]: [] });
    // };

    const handleListDataChange = React.useCallback(
        (key: string, data: string[]) => {
            setListData(prevListData => ({
                ...prevListData,
                [key]: data,
            }));

            console.log(data);
            console.log({ ...listData, [key]: data });
            setValueForm("signature", { ...listData, [key]: data });
        },
        [listData, setValueForm]
    );

    return (
        <>
            <div className="space-y-3">
                {signature.length > 0
                    ? (() => {
                          const data = signature.map(course => ({
                              label: course.nombre,
                              value: course.codigoMateria,
                          }));

                          return (
                              <>
                                  <DemoMultiList
                                      placeholder="Seleccionar materias"
                                      options={data}
                                      listData={data => {
                                          handleListDataChange("name", data);
                                      }}
                                  />
                              </>
                          );
                      })()
                    : null}

                {/* {errors.hours && <p className="text-red-500 text-xs italic">{errors.hours && Object.values(errors.hours)[0].message?.toString()}</p>} */}
            </div>
        </>
    );
}
//
