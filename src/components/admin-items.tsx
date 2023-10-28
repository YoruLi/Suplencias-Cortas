import React from "react";
import { dashBoardIcon, docentesIcon, more } from "@/data/svgs";
import MenuButton from "./menu-button";

const ADMIN_ITEMS = [
    {
        k: "dashboard",
        title: "Dashboard",
        href: "/dashboard",
        icon: dashBoardIcon,
    },
    { icon: more, title: "Mostrar mas", k: "view-more" },
];

export default function AdminItems({ toggleShowMore, selectedItem }: { toggleShowMore: () => void; selectedItem: (href: string) => boolean }) {
    return (
        <>
            {ADMIN_ITEMS.map(item => {
                const onClick = !item.href && (item.k === "view-more" ? toggleShowMore : null);

                const menuButtonProps = {
                    ...item,
                    ...(onClick && { onClick }),
                };

                return <MenuButton {...menuButtonProps} selectedItem={selectedItem} />;
            })}
        </>
    );
}
