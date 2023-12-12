"use client";

import React, { useState } from "react";

import DocItems from "./doc-items";
import CrudItems from "./crud-items";
import { usePathname } from "next/navigation";
import MainItems from "./main-items";
import User from "../auth/user";

export default function Sidebar({ session }: { session: Session }) {
    const [showMore, setShowMore] = useState(false);
    const handleShowMore = () => setShowMore(prevState => !prevState);
    const pathname = usePathname();

    const selectedItem = (path: string) => pathname.includes(path);

    return (
        <>
            <aside className="lg:min-w-[230px] z-20 lg:max-w-[230px] bg-white border-t-2 lg:border-r-2 [overflow-y:overlay] overflow-hidden scrollbar-main fixed bottom-0 w-full lg:relative lg:top-0 lg:h-[100dvh] flex flex-col">
                <nav className="flex flex-row lg:flex-col w-full h-full justify-between lg:justify-normal [&>div>ul>a>span]:text-sm">
                    <h1 className="text-[#0F172A] font-bold order-1 lg:order-none px-6 font-stalinist text-center my-auto lg:my-0 lg:text-2xl text-lg lg:py-4 py-0 block">
                        SSDSP
                    </h1>

                    <div className="order-0">
                        <span className="text-[#636363] text-sm font-telex hidden lg:block px-6">Administrador</span>
                        <MainItems toggleShowMore={handleShowMore} selectedItem={selectedItem} session={session} />
                    </div>
                    <div
                        className={` absolute bottom-0 h-full bg-white  z-50 w-full  lg:static lg:flex lg:h-auto lg:flex-col lg:bg-transparent ${
                            showMore ? "flex" : "hidden"
                        }`}
                    >
                        <CrudItems toggleShowMore={handleShowMore} selectedItem={selectedItem} session={session} />
                    </div>

                    <span className="lg:w-[80%] w-[2px] mb-3 lg:h-[1px] lg:mx-auto hidden lg:block bg-black opacity-25"></span>
                    <span className="text-[#636363] text-sm font-telex hidden lg:block px-6">Documentacion</span>

                    <div className="flex order-3 lg:flex-col lg:justify-between lg:h-full">
                        <div className="hidden lg:block">
                            <DocItems selectedItem={selectedItem} />
                        </div>
                        <div className="mt-auto order-3">{<User session={session} />}</div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
