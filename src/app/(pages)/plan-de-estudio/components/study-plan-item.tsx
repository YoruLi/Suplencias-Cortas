import React from "react";
import CardPlan from "./card-plan";
import Title from "@/components/ui/title";

export default async function StudyPlanItem() {
    const getPlanesDeEstudio = async () => {
        const result = await fetch("http://localhost:3000/api/plan-de-estudio", {
            cache: "no-store",
            method: "GET",
        });

        return result.json();
    };
    const planes = await getPlanesDeEstudio();

    return (
        <div className="flex flex-col  min-h-screen ">
            <Title className="text-start text-4xl font-normal text-main">Planes de estudio</Title>

            <div className="grid gap-6 mb-8 flex-wrap md:grid-cols-2 lg:grid-cols-3">
                {planes.map(plan => {
                    return (
                        <>
                            <CardPlan studyPlan={plan} />
                        </>
                    );
                })}
            </div>
        </div>
    );
}
