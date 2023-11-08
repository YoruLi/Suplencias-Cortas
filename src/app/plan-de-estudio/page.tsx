import Title from "@/components/ui/title";
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import DeleteButton from "@/components/delete-button";

import { EditPlan } from "@/components/plan-de-estudio/edit-plan";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export default async function page() {
    const getPlanesDeEstudio = async () => {
        const result = await fetch("http://localhost:3000/api/plan-de-estudio", {
            method: "GET",
        });

        return result.json();
    };
    const planes = await getPlanesDeEstudio();

    return (
        <div className="h-full">
            <Title>Planes de estudio</Title>
            <ul>
                {planes?.length > 0 ? (
                    planes?.map(plan => (
                        <li key={plan.id}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link" className="font-bold">
                                        Nombre del Plan: {plan.nombre}
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="space-y-2 w-[22rem] max-h-[300px] z-30 overflow-hidden    ">
                                    <div className="flex flex-wrap max-h-[100px] w-[20rem]  overflow-hidden whitespace-normal">
                                        <h3 className="font-semibold">Descripcion: </h3>
                                        <p className="first-letter:capitalize line-clamp-3 overflow-hidden text-ellipsis whitespace-normal ">{plan.descripcion}</p>
                                    </div>
                                    <div className="flex flex-wrap max-h-[100px] w-[20rem]  overflow-hidden ">
                                        <h3 className="font-semibold">Resolución: </h3>
                                        <p className="first-letter:capitalize line-clamp-3 overflow-hidden text-ellipsis ">{plan.resolucion}</p>
                                    </div>

                                    <div className="space-x-3 mx-auto  ">
                                        <EditPlan planData={plan} />
                                        <DeleteButton id={plan.id} entity={"plan-de-estudio"}>
                                            Eliminar plan
                                        </DeleteButton>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </li>
                    ))
                ) : (
                    <code>No hay planes de estudios</code>
                )}
            </ul>
        </div>
    );
}
