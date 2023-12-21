import Image from "next/image";
import React from "react";
import Logo from "@/../public/imgs/logo.svg";
export default function Card({ plan }: { plan: PlanDeEstudio }) {
    return (
        <div className="card bg-white shadow ring-1 ring-black ring-opacity-30 rounded-lg overflow-hidden py-3 relative z-10">
            <div className="card-header p-4 flex items-center justify-between">
                <p className="font-semibold text-lg">{plan.nombre}</p>
                <picture className=" absolute inset-0 -mt-14 -z-10 opacity-30">
                    <Image src={Logo.src} height={Logo.height} width={Logo.width} alt="Logo de la escuela tecnica n2 Rodolfo Walsh" />
                </picture>
            </div>
            <div className="card-content px-4">
                <p className="first-letter:capitalize line-clamp-3 overflow-hidden text-ellipsis  font-medium">{plan.resolucion}</p>
            </div>
        </div>
    );
}
