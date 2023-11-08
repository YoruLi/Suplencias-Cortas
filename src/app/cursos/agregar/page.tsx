import { CreateCourse } from "@/components/cursos/create-course";
import React from "react";

type Props = {
    searchParams?: {
        modalidad?: string;
    };
};

export default function page({ searchParams }: Props) {
    return (
        <>
            <CreateCourse modalidad={searchParams?.modalidad} />
        </>
    );
}
