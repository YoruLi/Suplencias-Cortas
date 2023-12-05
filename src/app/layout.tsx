import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";

import Sidebar from "@/components/sidebar";

import { getSession } from "../data/getSession";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Sistema De Suplencias Cortas",
    description: "Sistema para gestionar las suplencias a corto plazo, de 2 a 12 días en la Institución Escuela Técnica N2,Rodolfo Walsh",
};

const telex = localFont({
    src: [
        {
            path: "../../public//fonts//Telex-Regular.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    return (
        <html lang="en">
            <body className={`${telex.className} `}>
                <div className="flex flex-col relative lg:flex-row">
                    <Sidebar session={session} />
                    <main className="relative w-full h-screen scrollbar-main overflow-y-auto overflow-hidden">
                        <div className="px-3">{children}</div>
                    </main>
                </div>
                <Toaster position="bottom-right" />
            </body>
        </html>
    );
}
