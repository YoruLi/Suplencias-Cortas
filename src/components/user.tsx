"use client";
import Image from "next/image";
import React, { useState } from "react";
import userPicture from "@/../public/imgs/picture.svg";
import { deleteSession } from "../../actions/deleteUser";

export default function User({ session }: { session: Session }) {
    const [showUserConfig, setShowUserConfig] = useState(false);

    return (
        <div className="absolute top-2 right-3 flex items-center gap-x-1" onMouseLeave={() => setShowUserConfig(false)}>
            <span>{session.user.username}</span>
            <Image
                src={userPicture}
                alt="profile picture"
                className="hover:opacity-80 relative"
                onClick={() => setShowUserConfig(prev => !prev)}
                width={40}
                height={40}
            />

            {showUserConfig ? (
                <div className="bg-white border-slate-300 absolute right-4 top-6 border py-1.5 px-1 hover:bg-[#d0cece] cursor-pointer " onClick={() => deleteSession()}>
                    <span className="text-center text-sm font-medium">Cerrar session</span>
                </div>
            ) : null}
        </div>
    );
}
