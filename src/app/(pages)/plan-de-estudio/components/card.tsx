import React from "react";

export default function Card({ plan }: { plan: any }) {
    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="card-header p-4 flex items-center justify-between">
                <p className="font-semibold text-lg">{plan.nombre}</p>
                <BookIcon className="w-6 h-6" />
            </div>
            <div className="card-content p-4">
                <p className="first-letter:capitalize line-clamp-3 overflow-hidden text-ellipsis ">{plan.resolucion}</p>
            </div>
        </div>
    );
}
function BookIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    );
}
