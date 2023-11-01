"use client";
import svgs from "@/data/svgs";
import { cn } from "@/utils/cn";
import React, { lazy, useState } from "react";
import Icon from "./icon";

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
        <>
            <div className="py-6">
                <h2 className="text-2xl text-black">Agregar docente</h2>
                <span className="text-sm font-thin font-sans text-slate-600">Sigue los 4 pasos para agregar un nuevo docente</span>
            </div>

            <div className="grid-add-docente min-h-screen flex flex-col lg:flex-row bg-transparent border-t  border-slate-400  relative">
                <div className="flex flex-col items-center  gap-3 lg:border-r lg:border-b-0 border-t-0 border-b px-2 pt-8 border-slate-400 step flex-[0.6]">
                    <ul className="lg:space-y-8 space-y-4 relative  ">
                        {STEPS.map((step, index) => {
                            return (
                                <li className="flex gap-3 place-items-center text-center mx-auto relative bg-current z-40 ">
                                    <span
                                        className={cn("capitalize font-normal lg:text-sm text-black  text-base font-sans w-full", {
                                            "text-main font-bold": form.step === index,
                                        })}
                                    >
                                        {step.title}
                                    </span>
                                    <div
                                        className={cn("relative ", {
                                            "before:h-full before:w-[1px] before:bg-slate-400 before:absolute before:top-full ": index !== STEPS.length - 1,
                                            "before:bg-main before:w-[1.5px]": form.step === index,
                                        })}
                                    >
                                        <Icon
                                            {...step.icon}
                                            className={cn("opacity-50 w-9 h-9 rounded-full ", {
                                                "fill-main opacity-100": form.step === index,
                                            })}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className=" px-4 lg:pt-20 pt-10 flex-[2]">
                    <div className="text-center">
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
                </div>
            </div>
        </>
    );
}
