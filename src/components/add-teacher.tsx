"use client";
import svgs from "@/data/svgs";
import { cn } from "@/utils/cn";
import React, { lazy } from "react";
import Icon from "./icon";

import { Separator } from "./ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    const [form, setForm] = React.useState<any>({
        form1: {
            name: "",
            lastname: "",
        },
        form2: {
            email: "",
            dni: "",
            tel: "",
            dir: "",
        },
        form3: {
            score: 0,
        },
    });
    const router = useRouter();

    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const formStep = parseInt((searchParams.get("step") as string) ?? 0);
    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleChangeValue = (formName: string, fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [formName]: {
                ...form[formName],
                [fieldName]: event.target.value,
            },
        });
    };
    const prevStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        return router.back();
    };

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:3000/api/add-teacher-form", {
                    method: "GET",
                });
                const data = await response.json();
                console.log({ data });
                setForm(data.formData);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleTeacherDetail = async (values: unknown) => {
        try {
            const response = await (
                await fetch("http://localhost:3000/api/add-teacher-form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        form1: values,
                    }),
                })
            ).json();

            setForm(response.formData);
        } catch (error) {
            return {};
        } finally {
            return router.push(`${pathname}?${createQueryString("step", "1")}`);
        }
    };

    const handleTeacherPersonalDetail = async (values: unknown) => {
        try {
            const response = await (
                await fetch("http://localhost:3000/api/add-teacher-form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        form2: values,
                    }),
                })
            ).json();

            setForm(response.formData);
        } catch (error) {
            return {};
        } finally {
            return router.push(`${pathname}?${createQueryString("step", "2")}`);
        }
    };

    const handleTeacherMoreDetail = async (values: unknown) => {
        try {
            const response = await (
                await fetch("http://localhost:3000/api/add-teacher-form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        form3: values,
                    }),
                })
            ).json();

            console.log("response", response);

            setForm(response.formData);
        } catch (error) {
            return {};
        } finally {
            return router.push(`${pathname}?${createQueryString("step", "3")}`);
        }
    };

    return (
        <div className="flex flex-col min-h-full text-white bg-transparent w-full ">
            <div className="pb-4">
                <h2 className="text-2xl text-black">Agregar docente</h2>
                <span className="text-sm font-thin font-sans text-slate-600">Sigue los 4 pasos para agregar un nuevo docente</span>
            </div>
            <Separator orientation="horizontal" />
            <div className="grid max-w-2xl mx-auto h-full w-full">
                <div className=" mx-auto  bg-transparent relative">
                    <ul className="relative flex gap-4 mt-4 ">
                        {STEPS.map((step, index) => {
                            return (
                                <li className="flex gap-1 place-items-center text-center relative bg-current z-40 ">
                                    <span
                                        className={cn("capitalize font-normal  text-slate-400  text-xs font-sans w-full hidden lg:block ", {
                                            "text-[#0F172A]  font-bold ": formStep === index,
                                        })}
                                    >
                                        {step.title}
                                    </span>

                                    <div className={cn("relative")}>
                                        <Icon
                                            {...step.icon}
                                            className={cn("opacity-50 w-9 h-9 rounded-full fill-slate-400 ", {
                                                "fill-[#0F172A]  opacity-100": formStep === index,
                                            })}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className=" h-full relative">
                    <div className="max-w-2xl mx-auto w-full h-full flex flex-col form mt-12 text-main [&>div>input]:text-black [&>*]:border-main [&>div>span]:bg-white">
                        <div className="text-center h-full">
                            <legend className="text-center text-sm text-slate-600">
                                Paso <span>{formStep + 1}/ 4</span>
                            </legend>
                            <h4 className="text-2xl text-black ">Completar los datos y continuar para avanzar</h4>
                        </div>
                        {formStep === 0 ? (
                            <DinamycFormUserDetail handleTeacherDetail={handleTeacherDetail} handleChange={handleChangeValue} values={form?.form1} />
                        ) : formStep === 1 ? (
                            <DinamycFormUserPersonalDetail
                                handleTeacherPersonalDetail={handleTeacherPersonalDetail}
                                handleChange={handleChangeValue}
                                values={form?.form2}
                                prevStep={prevStep}
                            />
                        ) : formStep === 2 ? (
                            <DinamycFormUserMoreDetail
                                handleTeacherMoreDetail={handleTeacherMoreDetail}
                                handleChange={handleChangeValue}
                                values={form?.form3}
                                prevStep={prevStep}
                            />
                        ) : (
                            <DinamycConfirm values={form} prevStep={prevStep} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
