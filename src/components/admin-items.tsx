import React from "react";
import { dashBoardIcon, more } from "@/data/svgs";
import MenuButton from "./menu-button";

export default function AdminItems({
    toggleShowMore,
    selectedItem,
    session,
}: {
    toggleShowMore: () => void;
    selectedItem: (href: string) => boolean;
    session: Session | undefined;
}) {
    const ADMIN_ITEMS = session?.user?.username
        ? [
              {
                  k: "dashboard",
                  title: "Dashboard",
                  href: "/dashboard",
                  icon: dashBoardIcon,
              },
              {
                  k: "view-more",
                  title: "Mostrar mas",
                  icon: more,
              },
          ]
        : [
              {
                  k: "view-more",
                  title: "Mostrar mas",
                  icon: more,
              },
          ];
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
