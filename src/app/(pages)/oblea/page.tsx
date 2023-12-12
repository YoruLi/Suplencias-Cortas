import Title from "@/components/ui/title";
import React from "react";
import { getObleas } from "./api/get-oblea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function page() {
    const obleas = await getObleas();

    return (
        <>
            <Title className="text-4xl font-normal text-main">Docentes / Oblea</Title>

            <div className="flex flex-col gap-3">
                {obleas.map(oblea => {
                    const { docente, ...data } = oblea;

                    return (
                        <Link href={`${oblea.docenteId}`} key={oblea.docenteId}>
                            <Card>
                                <h2 className="mb-2 p-4 font-semibold text-lg">{oblea.docente}</h2>
                                <Separator />
                                <ul className="p-4">
                                    {Object.entries(data).map(([key, value]) => (
                                        <li key={key}>
                                            <h3 className="text-sm first-letter:capitalize">
                                                {key}: {value}
                                            </h3>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
