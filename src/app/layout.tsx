import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import Sidebar from "@/components/sidebar";
import AuthSessionButton from "@/components/auth-session.-button";
import { cookies } from "next/headers";
import User from "@/components/user";

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
    const cookie = cookies().get("auth");
    const session = cookie?.value;

    return (
        <html lang="en">
            <body className={`${telex.className} h-[100dvh] w-full `}>
                <div className="flex flex-col lg:flex-row scrollbar-main [overflow-y:overlay] overflow-hidden w-full">
                    <Sidebar />

                    {!session ? <AuthSessionButton /> : <User session={session} />}
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
