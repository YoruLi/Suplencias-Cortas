import Icon from "@/components/icon";
import svgs from "@/data/svgs";
import React from "react";

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
];
export default function page() {
    return (
        <div className=" w-full lg:h-full h-[calc(100dvh+40px)] px-8 bg-main text-white mx-auto ">
            <div className="py-6">
                <h2 className="text-2xl">Agregar docente</h2>
                <span className="text-sm font-thin font-sans">Sigue los 3 pasos para agregar un nuevo docente</span>
            </div>

            <div className="grid-add-docente flex flex-col lg:flex-row bg-transparent border-t border-slate-400 h-[570px] relative">
                <div className="flex flex-col items-center gap-3 lg:border-r lg:border-b-0 border-t-0 border-b px-2 py-8 border-slate-400 step flex-[0.6]">
                    <ul className="lg:space-y-8 space-y-4 relative ">
                        {STEPS.map(step => {
                            return (
                                <li className="flex gap-3 place-items-center text-center mx-auto relative bg-main z-40 ">
                                    <span className="capitalize font-normal lg:text-sm text-base font-sans w-full">{step.title}</span>
                                    <div className="relative before:h-full before:w-[1px] before:bg-white/20 before:absolute before:top-full  ">
                                        <Icon {...step.icon} className="opacity-50 w-9 h-9 rounded-full " />
                                    </div>
                                </li>
                            );
                        })}

                        <li className="flex gap-3 place-items-center text-center mx-auto relative  bg-main z-40 ">
                            <span className="capitalize font-normal lg:text-sm text-base font-sans w-full">Confirmar</span>
                            <div className="relative">
                                <Icon {...svgs.check} className="opacity-50 w-9 h-9" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className=" px-4 lg:pt-20 pt-10 flex-[2]  ">
                    <div className="text-center ">
                        <legend className="text-center text-sm text-slate-300">Paso 1/3</legend>
                        <h4 className="text-2xl">Completar los datos y continuar para avanzar</h4>
                    </div>
                    <form action="" className="flex flex-col gap-10 form mt-16">
                        <div className="relative group  w-full ">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="nombre"
                                className="w-full p-3 text-sm appearance-none  caret-white text-white outline-none border-slate-300 bg-transparent border-[0.2px] rounded-md border-opacity-50 focus:border-[#25CC87]  placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
                            />
                            <span className="pointer-events-none text-sm text-slate-400  bg-main absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                                Nombre
                            </span>
                        </div>

                        <div className="relative group w-full">
                            <input
                                type="text"
                                name="apellido"
                                placeholder="apellido"
                                className="w-full p-3 text-sm appearance-none  caret-white text-white outline-none border-slate-300 bg-transparent border-[0.2px] rounded-md border-opacity-50 focus:border-[#25CC87]  placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
                            />
                            <span className="pointer-events-none text-sm text-slate-400  bg-main absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                                Apellido
                            </span>
                        </div>
                        <button className="relative self-end place-self-end bg-[#25CC87] px-3 py-1.5 rounded-md">Continuar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
