import { cn } from "@/utils/cn";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
const Title = React.forwardRef<HTMLHeadingElement, Props>(({ children, className, ...props }, ref) => {
    return (
        <h2 className={cn("text-2xl font-telex tracking-widest py-4", className)} {...props} ref={ref}>
            {children}
        </h2>
    );
});

Title.displayName = "Title";

export default Title;
