import { NextResponse } from "next/server";

import { NextApiResponse } from "next";
import * as jose from "jose";
import { getJwtSecretKey } from "@/data/getSession";

export async function POST(req: Request, res: NextApiResponse) {
    const data = await req.json();
    const { refresh_token, username } = data;
    console.log(data);

    try {
        if (!refresh_token) {
            return NextResponse.json({
                message: "Invalid refresh token",
                status: 400,
            });
        }

        const newAccessToken = await generateAccessToken(username);

        return NextResponse.json({
            token: newAccessToken,
            username: username,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error", status: 500 });
    }
}

const generateAccessToken = async (username: string) => {
    try {
        // Generar un nuevo access_token
        const token = await new jose.SignJWT({})
            .setProtectedHeader({ alg: "HS256" })
            .setJti(crypto.randomUUID())
            .setIssuedAt()
            .setAudience(username)
            .setExpirationTime("10m")
            .sign(new TextEncoder().encode(getJwtSecretKey()));

        return token;
    } catch (error) {
        console.error(error);
        throw new Error("Error generating access token");
    }
};
