import React from "react";
import Image from "next/image";
import tecnicaLogo from "../../../public/imgs/logo.jpeg";
import GoBack from "@/components/go-back";

import Input from "@/components/Input";
import SubmitButton from "@/components/submit-button";
import { handleLogin } from "../../../actions/handle-login";

export default async function loginPage() {
    return (
        <div className="grid min-h-[100dvh] w-full border place-items-center fixed inset-0 z-[9999999] bg-white ">
            <div className="lg:w-full w-[90%] py-10 grid place-items-center max-w-lg relative border-2 border-slate-200  bg-white rounded-lg">
                <GoBack />
                <div className="max-w-md w-full text-center flex items-center flex-col">
                    <picture>
                        <Image
                            src={tecnicaLogo.src}
                            width={200}
                            height={200}
                            placeholder="blur"
                            blurDataURL={tecnicaLogo.blurDataURL}
                            alt="logo de la escuela tecnica n2 Rodolfo Walsh"
                        />
                    </picture>
                    <h2 className="text-[#0F172A] text-2xl font-bold">Iniciar sesion</h2>

                    <section className="flex flex-col gap-4 p-4 w-full">
                        <form
                            action={handleLogin}
                            className="mx-auto w-full h-full rounded-md flex flex-col gap-3 form  text-main [&>div>input]:text-black  [&>*]:border-main [&>div>span]:bg-white"
                        >
                            <Input name="username" placeholder="Nombre de usuario" />

                            <Input name="password" type="password" placeholder="Contraseña" />

                            <SubmitButton type="submit">Iniciar sesion</SubmitButton>

                            <span className="text-slate-600 text-sm font-sans">Ingresar usuario y contraseña para acceder a tu cuenta</span>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
