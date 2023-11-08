import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl font-telex tracking-widest py-4">{children}</h2>;
}
