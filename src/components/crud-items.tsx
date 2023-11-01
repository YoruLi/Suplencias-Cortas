import { docenteIcon, backArrow, dashBoardIcon } from "@/data/svgs";
import Link from "next/link";
import React from "react";
import Icon from "./icon";

export default function CrudItems({ toggleShowMore, selectedItem }: { toggleShowMore: () => void; selectedItem: (href: string) => boolean }) {
    const CRUD_ITEMS = [
        { icon: dashBoardIcon, title: "Dashboard", href: "/dashboard", k: "dashboard" },
        { icon: docenteIcon, title: "Docentes", href: "/docentes", k: "docentes" },
        { icon: docenteIcon, title: "Cursos", href: "/cursos", k: "cursos" },
        { icon: docenteIcon, title: "Materias", href: "/materias", k: "materias" },
        { icon: docenteIcon, title: "Cargos", href: "/cargos", k: "cargos" },
    ];

    return (
        <div className=" flex h-full overflow-x-auto bg-white w-full lg:flex-col justify-between md:gap-0 md:overflow-x-hidden md:bg-transparent md:px-0">
            {CRUD_ITEMS.map(item => (
                <>
                    <Link
                        prefetch={false}
                        href={item.href}
                        className={`flex px-6 w-full  lg:[&>svg]:mx-0 [&>svg]:mx-auto  py-4 lg:py-2 [&>svg]:fill-main hover:bg-[#f3f3f3] items-center 
                    ${item.k === "view-more" ? " order-2 md:hidden" : ""}
                    ${selectedItem(item.href) ? "bg-[#f3f3f3] lg:text-main" : ""}
                    
                    `}
                    >
                        <Icon {...item.icon} />
                        <span className="hidden lg:block text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</span>
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
