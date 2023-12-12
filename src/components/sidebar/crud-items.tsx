import { docenteIcon, backArrow, dashBoardIcon, courseIcon, signatureIcon, cargosIcon } from "@/data/svgs";
import Link from "next/link";
import React from "react";
import Icon from "../ui/icon";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../ui/menubar";

type CrudItem = {
    icon?: Svg;
    title: string;
    href: string;
    k: string;
};
interface CrudItems extends CrudItem {
    subItem?: CrudItems[];
}
export default function CrudItems({
    toggleShowMore,
    selectedItem,
    session,
}: {
    toggleShowMore: () => void;
    selectedItem: (href: string) => boolean;
    session: Session | undefined;
}) {
    const CRUD_ITEMS: CrudItems[] = [
        { icon: dashBoardIcon, title: "Dashboard", href: "/dashboard", k: "dashboard", subItem: [] },
        {
            icon: docenteIcon,
            title: "Docentes",
            href: "/docentes",
            k: "docentes",
            subItem: [
                { title: "Agregar docente", href: "/docentes/agregar", k: "agregar-docente" },
                {
                    title: "Oblea",
                    href: "/oblea",
                    k: "oblea",
                    subItem: [
                        {
                            title: "Crear oblea",
                            href: "oblea/crear",
                            k: "create-oblea",
                        },
                    ],
                },
            ],
        },
        { icon: courseIcon, title: "Cursos", href: "/cursos", k: "cursos", subItem: [{ title: "Agregar curso", href: "/cursos/agregar", k: "agregar-curso" }] },
        {
            icon: signatureIcon,
            title: "Materias",
            href: "/materias",
            k: "materias",
            subItem: [
                {
                    title: "Plan de Estudio",
                    href: "/plan-de-estudio",
                    k: "plan-de-estudio",
                    subItem: [
                        {
                            title: "Agregar",
                            href: "/plan-de-estudio/agregar",
                            k: "agregar-plan",
                        },
                    ],
                },
                { title: "Agregar materia", href: "/materias/agregar", k: "agregar-materia" },
            ],
        },
        {
            icon: cargosIcon,
            title: "Cargos",
            href: "/cargos",
            k: "cargos",
            subItem: [
                { title: "Agregar cargos", href: "/cargos/agregar", k: "agregar-cargos" },
                {
                    title: "Cargos vacantes",
                    href: "cargos-vacantes",
                    k: "cargos-vacantes",
                },
            ],
        },
    ];

    return (
        <>
            <Menubar className="  border-none  flex h-full overflow-x-auto bg-white z-[9999999] w-full lg:flex-col justify-between md:gap-0 md:overflow-x-hidden md:bg-transparent md:px-0">
                {CRUD_ITEMS.map(item => (
                    <>
                        <MenubarMenu>
                            <MenubarTrigger asChild>
                                <Link
                                    prefetch={false}
                                    href={item.href}
                                    className={`flex px-6 w-full gap-2 lg:[&>svg]:mx-0 [&>svg]:mx-auto  py-0 h-full lg:py-2 [&>svg]:fill-[#0F172A] hover:bg-[#f3f3f3] items-center 
                    ${item.k === "view-more" ? " order-2 md:hidden" : ""}
                    ${selectedItem(item.href) ? "bg-[#f3f3f3] lg:text-[#0F172A]" : ""}
                    
                    `}
                                >
                                    <Icon {...item.icon} className="lg:hidden block" />
                                    <span className="hidden lg:block text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</span>
                                </Link>
                            </MenubarTrigger>

                            {session?.success ? (
                                item.subItem?.length && item?.subItem?.length > 0 ? (
                                    <MenubarContent className="bg-white z-[9999999] lg:absolute lg:-top-12 lg:left-[225px]">
                                        {item.subItem.map(subitem => (
                                            <>
                                                {subitem.subItem && subitem.subItem.length > 0 ? (
                                                    <>
                                                        <MenubarSub>
                                                            <MenubarSubTrigger>
                                                                <Link prefetch={false} href={subitem.href}>
                                                                    {subitem.title}
                                                                </Link>
                                                            </MenubarSubTrigger>
                                                            <MenubarSubContent>
                                                                {subitem.subItem.map(sub => (
                                                                    <MenubarItem asChild key={sub.k}>
                                                                        <Link prefetch={false} href={sub.href}>
                                                                            {sub.title}
                                                                        </Link>
                                                                    </MenubarItem>
                                                                ))}
                                                            </MenubarSubContent>
                                                        </MenubarSub>
                                                    </>
                                                ) : (
                                                    <>
                                                        <MenubarItem asChild>
                                                            <Link prefetch={false} href={subitem.href}>
                                                                {subitem.title}
                                                            </Link>
                                                        </MenubarItem>
                                                    </>
                                                )}
                                            </>
                                        ))}
                                    </MenubarContent>
                                ) : null
                            ) : null}
                        </MenubarMenu>
                    </>
                ))}
                <button
                    aria-label="Volver al menu"
                    className="group px-2 lg:hidden [&>svg]:w-5 grid place-content-center [&>svg]:h-5 [&>svg]:fill-slate-500"
                    onClick={toggleShowMore}
                >
                    <Icon {...backArrow} />
                </button>
            </Menubar>
        </>
    );
}
