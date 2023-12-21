import React from "react";

import { docIcon } from "@/data/svgs";
import MenuButton from "./menu-button";

export default function DocItems({ selectedItem }: { selectedItem: (href: string) => boolean }) {
    const SITE_URL = process.env.NEXT_PUBLIC_URL_DOC;
    const DOC_ITEMS = [{ icon: docIcon, title: "Manual de usuario", href: SITE_URL, k: "manual", blank: true }];
    return (
        <>
            {DOC_ITEMS.map(item => {
                return <MenuButton key={item.k} {...item} selectedItem={selectedItem} />;
            })}
        </>
    );
}
