import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import * as jose from "jose";
import { getJwtSecretKey } from "@/data/getSession";

export async function POST(req: Request, res: NextApiResponse) {
    const data = await req.json();
    const { username, password } = data;
    console.log(data);
    try {
        if (!username || !password) {
            return NextResponse.json({
                message: "Invalid credentials",
                status: 401,
            });
        }
        const user: User[] = await conn.query(`SELECT * from usuarios WHERE username = (?) `, username);

        const passwordCheck = user.length < 1 ? false : await bcrypt.compare(password, user[0].password);

        if (!(user.length && passwordCheck)) {
            return NextResponse.json({
                message: "Credenciales inválidas",
                status: 404,
            });
        } else {
            const token = await new jose.SignJWT({})
                .setProtectedHeader({ alg: "HS256" })
                .setJti(crypto.randomUUID())
                .setIssuedAt()
                .setAudience(username)
                .setExpirationTime("10d")
                .sign(new TextEncoder().encode(getJwtSecretKey()));

            // res.setHeader(
            //     "Set-Cookie",
            //     serialize("user-token", token, {
            //         httpOnly: true,
            //         path: "/",
            //         secure: process.env.NODE_ENV === "production",
            //     })
            // );
            return NextResponse.json({
                token,
                username: username,
            });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error interno en el servidor", status: 500 });
    }
}
