import svgs from "@/data/svgs";
import { conn } from "@/libs/mysql/db";
import React from "react";

import Icon from "../../../../components/ui/icon";
import { Card } from "../../../../components/ui/card";
import Link from "next/link";

type CardsData = {
    category: string;
    quantity: number;
};
export async function getTotalData() {
    const results = await conn.query(
        `
  SELECT 'docentes' AS category, COUNT(*) AS quantity FROM docentes
  UNION
  SELECT 'materias' AS category, COUNT(*) AS quantity FROM materias
  UNION
  SELECT 'cursos' AS category, COUNT(*) AS quantity FROM cursos
`
    );

    const iconMap = {
        docentes: svgs.docenteIcon.path,
        materias: svgs.signatureIcon.path,
        cursos: svgs.courseIcon.path,
    };
    const data = results as CardsData[];
    return data.map(data => ({
        table: data.category,
        cantidad: data.quantity,
        icon: iconMap[data.category as keyof typeof iconMap],
    }));
}

export default async function Cards() {
    const totalData = await getTotalData();

    return (
        <div className="flex  flex-wrap gap-4 items-center justify-evenly w-full  mb-8">
            {totalData.map(data => {
                return (
                    <Card key={data.table} className="max-w-[300px] w-full pb-2 ">
                        <Link href={`?dashboard=${data.table}`} scroll={false}>
                            <div className="flex flex-col justify-around  gap-3 p-6 capitalize font-bold text-xl">
                                <div className="flex justify-between">
                                    <span>{data.table}</span>
                                    <Icon className="bg-main rounded-full fill-white py-1" path={data.icon} viewBox={svgs.docenteIcon.viewBox} />
                                </div>
                                <span>+{data.cantidad}</span>
                            </div>
                        </Link>
                    </Card>
                );
            })}
        </div>
    );
}
