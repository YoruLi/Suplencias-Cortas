"use client";

import React, { useState } from "react";
import Image from "next/image";
import tecnicaLogo from "@/../public/imgs/logo.png";
import AdminItems from "./admin-items";
import DocItems from "./doc-items";
import CrudItems from "./crud-items";
import { usePathname } from "next/navigation";

export default function Sidebar({ session }: { session: Session | undefined }) {
    const [showMore, setShowMore] = useState(false);
    const handleShowMore = () => setShowMore(prevState => !prevState);
    const pathname = usePathname();

    const selectedItem = (path: string) => pathname.includes(path);

    return (
        <aside className="lg:w-[250px] z-[51] bg-white border-t-2 lg:border-r-2 [overflow-y:overlay] overflow-hidden scrollbar-main fixed bottom-0 w-full lg:sticky lg:top-0 lg:h-[100dvh] flex flex-col">
            <nav className="flex flex-row lg:flex-col w-full justify-between [&>div>ul>a>span]:text-sm">
                <h1 className="text-main font-bold order-1 lg:order-none px-6 font-stalinist text-center [font-size:_clamp(15px,1.5vw,2vw)] lg:py-4 my-auto py-0 block">
                    SSDSP
                </h1>
                <span className="text-[#636363] text-sm font-telex hidden lg:block px-6 ">Admin</span>
                <AdminItems toggleShowMore={handleShowMore} selectedItem={selectedItem} session={session} />

                <div className={` absolute bottom-0 h-full bg-white  w-full  lg:static lg:flex lg:h-auto lg:flex-col lg:bg-transparent ${showMore ? "flex" : "hidden"}`}>
                    <CrudItems toggleShowMore={handleShowMore} selectedItem={selectedItem} />
                </div>

                <span className="lg:w-[80%] w-[2px] my-3 h-8 lg:h-[1px] lg:mx-auto hidden lg:block bg-black opacity-25"></span>

                <span className="text-[#636363] text-sm font-telex hidden lg:block px-6">Documentacion</span>
                <DocItems selectedItem={selectedItem} />
            </nav>
            <div style={{ marginTop: "auto" }}>
                <picture className="lg:grid hidden">
                    <Image alt="logo de la escuela tecnica n2" src={tecnicaLogo.src} height={tecnicaLogo.height} width={tecnicaLogo.width} className="relative" />
                </picture>
            </div>
        </aside>
    );
}
