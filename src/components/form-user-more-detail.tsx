import React from "react";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type FormUserProps = {
    values: FormTeacherMoreDetail;
    handleTeacherMoreDetail: any;
    handleChange: any;
    prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const schema = z.object({
    score: z.number().optional(),
});
export type FormTeacherMoreDetail = z.infer<typeof schema>;
export default function FormUserMoreDetail({ values, prevStep, handleChange, handleTeacherMoreDetail }: FormUserProps) {
    const {
        handleSubmit,
        register,
        formState: { errors, isLoading },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues:
            {
                score: values?.score,
            } ?? {},
    });
    return (
        <form onSubmit={handleSubmit(handleTeacherMoreDetail)} className="w-full flex flex-col gap-4">
            <div>
                <Label htmlFor="score">Puntaje</Label>
                <Input
                    type="number"
                    {...register("score", {
                        valueAsNumber: true,
                    })}
                    value={values?.score}
                    min={0}
                    className="remove-ring"
                    onChange={handleChange("form3", "score")}
                />
                {errors.score && <p className="text-red-500 text-xs italic">{errors.score.message?.toString()}</p>}
            </div>
            <div className="flex gap-3 relative self-end place-self-end">
                <Button className=" bg-[#b1443c] hover:bg-[#a25650]" onClick={prevStep}>
                    Volver atras
                </Button>
                <Button type="submit">Continuar</Button>
            </div>
        </form>
    );
}
