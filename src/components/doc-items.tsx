import React from "react";

import { docIcon } from "@/data/svgs";
import MenuButton from "./menu-button";

export default function DocItems({ selectedItem }: { selectedItem: (href: string) => boolean }) {
    const DOC_ITEMS = [{ icon: docIcon, title: "Manual de usuario", href: "/manual", k: "manual" }];
    return (
        <>
            {DOC_ITEMS.map(item => {
                return <MenuButton {...item} selectedItem={selectedItem} />;
            })}
        </>
    );
}
