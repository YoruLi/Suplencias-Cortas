import React from "react";
import Card from "./components/card";
import { getCargosT } from "./api/get-cargos-t";
import Title from "@/components/ui/title";

export default async function page() {
    const cargosT = await getCargosT();
    return (
        <>
            <header className="w-full text-main">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <Title className=" text-4xl font-normal text-main">Cargos Vacantes</Title>
                    <p className="mt-2 text-gray-700 capitalize">Cargos vacantes en la escuela de educación secundaria técnica n&deg;2 Rodolfo Walsh.</p>
                </div>
            </header>
            <main className="container mx-auto px-4 md:px-6 lg:px-8 my-12">
                <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    {cargosT.map(data => (
                        <Card key={data.id} data={data} />
                    ))}
                </div>
            </main>
        </>
    );
}
