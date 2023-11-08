"use client";
import svgs from "@/data/svgs";
import { cn } from "@/utils/cn";
import React, { lazy, useState } from "react";
import Icon from "./icon";

import { Separator } from "./ui/separator";

const DinamycFormUserDetail = lazy(() => import("@/components/form-user-detail"));
const DinamycFormUserPersonalDetail = lazy(() => import("@/components/form-user-personal-detail"));
const DinamycFormUserMoreDetail = lazy(() => import("@/components/form-user-more-detail"));
const DinamycConfirm = lazy(() => import("@/components/confirm"));

const STEPS = [
    {
        title: "nombre completo",
        icon: svgs.userIcon,
    },
    {
        title: "email y telefono",
        icon: svgs.emailIcon,
    },
    {
        title: "mas informacion",
        icon: svgs.userDetail,
    },
    {
        title: "confirmar",
        icon: svgs.check,
    },
];

export default function AddTeacher() {
    const [form, setForm] = useState<FormTypes>({
        step: 0,
        totalSteps: 4,
        name: "",
        lastname: "",
        email: "",
        dni: "",
        tel: "",
        dir: "",
        score: "",
    });

    const handleChangeValue = (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [input]: event.target.value,
        });
    };

    const nextStep = (event: React.MouseEvent<HTMLButtonElement>, values: any) => {
        event.preventDefault();
        const allFieldsFilled = Object.values(values).every(value => value !== "");

        if (allFieldsFilled) {
            setForm(prev => ({
                ...prev,
                step: prev.step + 1,
            }));
        }
    };

    const prevStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setForm(prev => ({
            ...prev,
            step: prev.step - 1,
        }));
    };

    return (
        <div className="flex flex-col min-h-full text-white bg-transparent w-full  py-2">
            <div className="pb-4">
                <h2 className="text-2xl text-black">Agregar docente</h2>
                <span className="text-sm font-thin font-sans text-slate-600">Sigue los 4 pasos para agregar un nuevo docente</span>
            </div>
            <Separator orientation="horizontal" />
            <div className="grid place-content-center h-full w-full">
                <div className=" mx-auto  bg-transparent relative">
                    <ul className="relative flex gap-4 mt-4 ">
                        {STEPS.map((step, index) => {
                            return (
                                <li className="flex gap-1 place-items-center text-center relative bg-current z-40 ">
                                    <span
                                        className={cn("capitalize font-normal  text-slate-400  text-xs font-sans w-full hidden lg:block ", {
                                            "text-[#0F172A]  font-bold ": form.step === index,
                                        })}
                                    >
                                        {step.title}
                                    </span>

                                    <div className={cn("relative")}>
                                        <Icon
                                            {...step.icon}
                                            className={cn("opacity-50 w-9 h-9 rounded-full fill-slate-400 ", {
                                                "fill-[#0F172A]  opacity-100": form.step === index,
                                            })}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className=" h-full relative">
                    <form
                        action=""
                        className="max-w-2xl mx-auto w-full h-full  flex flex-col gap-10 form mt-12 text-main [&>div>input]:text-black  [&>*]:border-main [&>div>span]:bg-white"
                    >
                        <div className="text-center h-full">
                            <legend className="text-center text-sm text-slate-600">
                                Paso{" "}
                                <span>
                                    {form.step + 1}/{form.totalSteps}
                                </span>
                            </legend>
                            <h4 className="text-2xl text-black ">Completar los datos y continuar para avanzar</h4>
                        </div>
                        {form.step === 0 ? (
                            <DinamycFormUserDetail handleChange={handleChangeValue} values={form} nextStep={nextStep} />
                        ) : form.step === 1 ? (
                            <DinamycFormUserPersonalDetail handleChange={handleChangeValue} values={form} nextStep={nextStep} prevStep={prevStep} />
                        ) : form.step === 2 ? (
                            <DinamycFormUserMoreDetail handleChange={handleChangeValue} values={form} nextStep={nextStep} prevStep={prevStep} />
                        ) : (
                            <DinamycConfirm values={form} prevStep={prevStep} />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
