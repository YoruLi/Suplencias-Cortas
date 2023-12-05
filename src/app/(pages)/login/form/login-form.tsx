"use client";
import Input from "@/components/Input";
import SubmitButton from "@/components/submit-button";
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../../../../../actions/handle-login";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/get-error-message";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(1, "El usuario es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria"),
});
type FormSchema = {
    username: string;
    password: string;
};
export default function LoginForm() {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormSchema) => {
        try {
            await login(data);
            router.push("/dashboard");
            window.location.href = "/dashboard";
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full mt-10 flex flex-col gap-8 self-start text-main [&>div>div>input]:text-black  [&>*]:border-main [&>div>div>span]:bg-white"
        >
            <div>
                <Input register={register} {...register("username")} name="username" placeholder="Nombre de usuario" />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message?.toString()}</p>}
            </div>
            <div>
                <Input register={register} name="password" type="password" placeholder="Contraseña" />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message?.toString()}</p>}
            </div>
            <Button type="submit" aria-label={isSubmitting ? "Cargando" : "Login"} disabled={isSubmitting}>
                {isSubmitting ? "Cargando.." : "Iniciar sesion"}
            </Button>
            <span className="text-slate-600 text-sm font-sans text-center">Ingresar usuario y contraseña para acceder a tu cuenta</span>
        </form>
    );
}
