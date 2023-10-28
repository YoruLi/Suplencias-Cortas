import Link from "next/link";
import React from "react";
import Icon from "./icon";
import { docIcon } from "@/data/svgs";
export default function DocItems({ selectedItem }: { selectedItem: (href: string) => boolean }) {
    const DOC_ITEMS = [
        { icon: docIcon, title: "Manual de usuario", href: "/manual" },
        { icon: docIcon, title: "Manual de usuario", href: "/ayuda" },
    ];

    return (
        <>
            {DOC_ITEMS.map(item => (
                <Link
                    prefetch={false}
                    href={item.href}
                    className={`flex gap-2 px-4 py-4 lg:py-2 lg:px-6 [&>svg]:fill-main order-3 items-center hover:bg-[#d0cece] ${
                        selectedItem(item.href) ? "bg-[#d0cece] text-main" : ""
                    } `}
                >
                    <Icon path={item.icon.path} viewBox={item.icon.viewBox} />
                    <span className="hidden lg:block text-sm">{item.title}</span>
                </Link>
            ))}
        </>
    );
}
