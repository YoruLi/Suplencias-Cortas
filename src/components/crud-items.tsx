import { docentesIcon, backArrow } from "@/data/svgs";
import Link from "next/link";
import React from "react";
import Icon from "./icon";

export default function CrudItems({ toggleShowMore, selectedItem }: { toggleShowMore: () => void; selectedItem: (href: string) => boolean }) {
    const CRUD_ITEMS = [
        { icon: docentesIcon, title: "Docentes", href: "/docentes", k: "docentes" },
        { icon: docentesIcon, title: "Cursos", href: "/cursos", k: "cursos" },
        { icon: docentesIcon, title: "Materias", href: "/materias", k: "materias" },
        { icon: docentesIcon, title: "Cargos", href: "/cargos", k: "cargos" },
    ];

    return (
        <div className=" flex h-full overflow-x-auto bg-white w-full lg:flex-col justify-between md:gap-0 md:overflow-x-hidden md:bg-transparent md:px-0">
            {CRUD_ITEMS.map(item => (
                <>
                    <Link
                        prefetch={false}
                        href={item.href}
                        className={`flex px-6 py-4 lg:py-2 [&>svg]:fill-main hover:bg-[#d0cece] items-center 
                    ${item.k === "view-more" ? " order-2 md:hidden" : ""}
                    ${selectedItem(item.href) ? "bg-[#d0cece] text-main" : ""}
                    
                    `}
                    >
                        <Icon {...item.icon} />
                        <span className="hidden lg:block text-sm">{item.title}</span>
                    </Link>
                </>
            ))}
            <button
                aria-label="Volver al menu"
                className="group px-2 lg:hidden [&>svg]:w-5 grid place-content-center [&>svg]:h-5 [&>svg]:fill-slate-500"
                onClick={toggleShowMore}
            >
                <Icon {...backArrow} />
            </button>
        </div>
    );
}
