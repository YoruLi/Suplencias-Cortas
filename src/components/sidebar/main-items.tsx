import React from "react";
import { more } from "@/data/svgs";
import MenuButton from "./menu-button";

export default function MainItems({
    toggleShowMore,
    selectedItem,
}: {
    toggleShowMore: () => void;
    selectedItem: (href: string) => boolean;
    session: Session | undefined;
}) {
    const ADMIN_ITEMS = [
        {
            k: "view-more",
            title: "Mostrar mas",
            icon: more,
        },
    ];
    return (
        <>
            {ADMIN_ITEMS.map(item => {
                const onClick = item.k === "view-more" ? toggleShowMore : null;

                const menuButtonProps = {
                    ...item,
                    ...(onClick && { onClick }),
                };

                return <MenuButton key={item.k} {...menuButtonProps} selectedItem={selectedItem} />;
            })}
        </>
    );
}
