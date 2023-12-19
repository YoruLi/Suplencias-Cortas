import Image from "next/image";
import Link from "next/link";
import React from "react";
import hand from "../../../../public/imgs/hand.png";
import Title from "@/components/ui/title";
import LoginForm from "./form/login-form";

export default function page() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 h-screen fixed inset-0 z-[999]">
            <div className="w-full h-full bg-no-repeat bg-cover bg-center bg-white back-image">
                <Link href="/" className="inline-block">
                    <Title className="font-stalinist lg:text-[#0F172A] text-white font-bold px-6">SSDSP</Title>
                </Link>
            </div>
            <div className=" flex flex-col bg-white  items-center justify-start lg:justify-center mt-8  h-full mx-auto w-full lg:relative">
                <div className="lg:max-w-lg w-[90%]">
                    <div className="flex items-center gap-3 w-full">
                        <h3 className="text-2xl font-bold">Bienvenid@</h3>
                        <Image src={hand.src} blurDataURL={hand.blurDataURL} placeholder="blur" alt="hand" width={30} height={30} />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">Inicia sesión aquí</p>

                    <LoginForm />
                </div>
            </div>
        </section>
    );
}
