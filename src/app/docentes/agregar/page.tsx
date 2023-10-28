import React from "react";

export default function page() {
    return (
        <div className=" h-full w-full px-8  bg-main text-white  mx-auto">
            <div className="py-6">
                <h2 className="text-2xl">Agregar docente</h2>
                <span className="text-sm font-thin font-sans">Sigue los 3 pasos para agregar un nuevo docente</span>
            </div>

            <div className="grid-add-docente flex bg-transparent border-t h-[600px] relative">
                <div className="flex flex-col items-center gap-3 border-r p-4 step flex-[0.6]">
                    <span>Nombre completo</span>
                    <span>email y telefono</span>
                    <span>Informacion</span>
                </div>
                <div className=" px-4 pt-20 flex-[2] ">
                    <div className="text-center">
                        <legend className="text-center text-sm">Paso 1/3</legend>
                        <h4 className="text-2xl">Completar los datos y continuar para avanzar</h4>
                    </div>
                    <form action="" className="flex flex-col gap-10 form mt-16">
                        <div>
                            <label htmlFor="" className="block">
                                Ingresar nombre
                            </label>
                            <input type="text" placeholder="nombre del docente..." className="w-full" />
                        </div>
                        <div>
                            <label htmlFor="" className="block">
                                Ingresar nombre
                            </label>
                            <input type="text" placeholder="nombre del docente..." className="w-full" />
                        </div>

                        <button className="absolute right-8 bg-[#25CC87] px-3 py-1.5 rounded-md bottom-8    ">Continuar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
