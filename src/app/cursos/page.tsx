import CoursesItem from "@/components/courses-item";
import React from "react";

export default function page() {
    return <div>
        <h3 className="ml-5 text-3xl mt-4">Cursos</h3>

        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-10 p-4 border border-black rounded-lg">
                <span>Todos</span>
                <span>Ciclo Básico</span>
                <span>Informática</span>
                <span>Química</span>
                <span>M.M.O</span>
            </div>
            <button className="w-18 p-2 bg-blue-700 text-white rounded-lg">AGREGAR CURSO</button>
        </div>
        <div className="flex flex-row flex-wrap w-98vw gap-4 mx-4 mt-10 items-center">
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
            {<CoursesItem/>}
        </div>
    </div>;
}
