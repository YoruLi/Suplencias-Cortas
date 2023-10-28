"use client";
import Image from "next/image";
import React, { useState } from "react";
import userPicture from "@/../public/imgs/picture.svg";
import { deleteSession } from "../../actions/deleteUser";

export default function User({ session }: { session: any }) {
    const [showUserConfig, setShowUserConfig] = useState(false);

    console.log(session);
    return (
        <div className="absolute top-2 right-3 flex items-center gap-x-1">
            <span>{session.user}</span>
            <Image
                src={userPicture}
                alt="profile picture"
                className="hover:opacity-80 relative"
                onClick={() => setShowUserConfig(prev => !prev)}
                width={40}
                height={40}
            />

            {showUserConfig ? (
                <div className="bg-main" onClick={() => deleteSession()}>
                    Cerrar session
                </div>
            ) : null}
        </div>
    );
}
