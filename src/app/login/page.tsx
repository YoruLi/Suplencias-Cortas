import React from "react";
import Image from "next/image";
import tecnicaLogo from "../../../public/imgs/logo.svg";
import GoBack from "@/components/go-back";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

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
        <div className="grid min-h-[100dvh] w-full border place-items-center fixed inset-0 z-[9999999] drake bg-white ">
            <div className="w-full lg:h-[99%] h-full m-auto grid place-items-center max-w-lg relative border bg-white rounded">
                <GoBack />
                <div className="max-w-md w-full text-center flex items-center flex-col">
                    <picture>
                        <Image src={tecnicaLogo} width={300} height={300} alt="logo de la escuela tecnica n2 Rodolfo Walsh" />
                    </picture>
                    <span className="text-slate-600 text-xl">Inicia sesion para continuar</span>
                    <section className="flex flex-col gap-4 p-4 w-full">
                        <form action={handleLogin} className="flex flex-col items-center w-full gap-4">
                            <div className="relative group  w-full ">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Usuario"
                                    className="w-full p-3 text-sm appearance-none  outline-none border-slate-500 bg-transparent  border-[0.2px] rounded-md border-opacity-50 placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
                                />
                                <span className="pointer-events-none text-sm text-slate-500  absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                                    Nombre de usuario
                                </span>
                            </div>

                            <div className="relative group w-full">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="w-full p-3 text-sm appearance-none   outline-none border-slate-500 bg-transparent  border-[0.2px] rounded-md border-opacity-50 placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
                                />
                                <span className="pointer-events-none text-sm text-slate-500   absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                                    Contraseña
                                </span>
                            </div>

                            <button type="submit" className="p-3 w-full rounded-lg bg-black  text-white capitalize font-semibold transition-colors duration-500">
                                inicia session
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
