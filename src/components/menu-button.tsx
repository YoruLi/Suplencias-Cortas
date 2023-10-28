import Link from "next/link";
import React from "react";
import Icon from "./icon";

interface MenuButtonProps {
    k: string;
    selectedItem: (href: string) => boolean;
    href?: string;
    title: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    icon: {
        path: string;
        viewBox: string;
    };
}

interface TagProps extends Omit<MenuButtonProps, "k"> {}

export default function MenuButton(props: MenuButtonProps) {
    const Tag = (tagProps: TagProps) => {
        return tagProps.href ? <Link {...tagProps} href={tagProps.href} prefetch={false} /> : <button {...tagProps} />;
    };

    return (
        <Tag
            {...props}
            className={`flex  px-4 py-4 lg:py-2 hover:bg-[#d4d9ee]  [&>svg]:fill-main lg:px-6 items-center  ${
                props.href && props.selectedItem(props.href) ? "bg-[#d4d9ee]  text-main " : ""
            }
                    ${props.k === "view-more" ? "lg:hidden" : ""}
                    
                    `}
        >
            <Icon {...props.icon} />
            <span className="hidden lg:block text-sm whitespace-nowrap overflow-hidden text-ellipsis">{props.title}</span>
        </Tag>
    );
}
