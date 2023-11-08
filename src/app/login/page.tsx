import React from "react";
import Image from "next/image";
import tecnicaLogo from "../../../public/imgs/logo.svg";
import GoBack from "@/components/go-back";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import Input from "@/components/Input";
import SubmitButton from "@/components/submit-button";

export default async function loginPage() {
    const host = headers().get("host");
    const handleLogin = async (data: FormData) => {
        "use server";
        const cookie = cookies();
        const username = data.get("username");
        const password = data.get("password");

        const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";

        const res = await fetch(`${protocol}${host}/api/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const json = await res.json();

        const authToken = {
            token: json.token,
            user: {
                username,
            },
        };

        if (json.status === 200) {
            if (!cookie.get("auth")) {
                cookie.set("auth", JSON.stringify(authToken));
            }
            return redirect("/dashboard");
        }
    };

    return (
        <div className="grid min-h-[100dvh] w-full border place-items-center fixed inset-0 z-[9999999] bg-white ">
            <div className="lg:w-full w-[90%] h-[40rem]  grid place-items-center max-w-lg relative border-2 border-slate-200  bg-white rounded-lg">
                <GoBack />
                <div className="max-w-md w-full text-center flex items-center flex-col">
                    <picture>
                        <Image src={tecnicaLogo} width={200} height={200} alt="logo de la escuela tecnica n2 Rodolfo Walsh" />
                    </picture>
                    <span className="text-slate-600 text-xl">Inicia sesion para continuar</span>
                    <section className="flex flex-col gap-4 p-4 w-full">
                        <form
                            action={handleLogin}
                            className="mx-auto w-full h-full rounded-md flex flex-col gap-3 form  text-main [&>div>input]:text-black  [&>*]:border-main [&>div>span]:bg-white"
                        >
                            <Input name="username" placeholder="Nombre de usuario" />

                            <Input name="password" type="password" placeholder="Contraseña" />

                            <SubmitButton content="Iniciar sesion" />
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
