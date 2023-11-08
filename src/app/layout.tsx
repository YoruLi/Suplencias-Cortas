import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";

import Sidebar from "@/components/sidebar";
import AuthSessionButton from "@/components/auth-session.-button";

import User from "@/components/user";
import { getSession } from "../data/getSession";

export const metadata: Metadata = {
    title: "Sistema De Suplencias Cortas",
    description: "Sistema para gestionar las suplencias a corto plazo, de 2 a 12 días en la Institución Escuela Técnica N2,Rodolfo Walsh",
};

const stalanist = localFont({
    src: [
        {
            path: "../../public//fonts//StalinistOne-Regular.ttf",
            weight: "400",
            style: "normal",
        },
    ],
});

const telex = localFont({
    src: [
        {
            path: "../../public//fonts//Telex-Regular.ttf",
            weight: "400",
            style: "normal",
        },
    ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const session = getSession();

    return (
        <html lang="en">
            <body className={`${telex.className} `}>
                <div className="flex flex-col relative lg:flex-row ">
                    <Sidebar session={session} />
                    <main className="relative w-full lg:h-[calc(100dvh)] scrollbar-main h-[calc(100dvh-56px)] overflow-y-auto overflow-hidden   ">
                        {<User session={session} />}
                        <div className="lg:px-8 px-3 "> {children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
