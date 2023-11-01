import Spinner from "@/components/spinner";
import React from "react";

export default function loading() {
    return (
        <div className="grid place-content-center w-screen h-[calc(100dvh-40px)] bg-white ">
            <h1 className="text-main font-stalinist text-4xl">SSDSP</h1>
            <Spinner />
        </div>
    );
}
