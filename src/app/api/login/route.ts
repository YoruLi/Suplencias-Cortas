import { conn } from "@/libs/mysql/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export async function GET(req: NextRequest) {
    const { cookies } = req;

    const result = await conn.query("SELECT * FROM usuarios");
    return NextResponse.json(result);
}

export async function POST(req: Request, res: NextApiResponse) {
    const secret = "123";
    const data = await req.json();

    const { username, password } = data;

    try {
        if (!username || !password) {
            return NextResponse.json({
                message: "Invalid credentials",
                status: 400,
            });
        }
        const user: User[] = await conn.query(`SELECT * from usuarios WHERE username = (?) `, username);

        const passwordCheck = user.length < 1 ? false : await bcrypt.compare(password, user[0].password);

        if (!(user.length && passwordCheck)) {
            return NextResponse.json({
                message: "Usuario no encontrado",
                status: 404,
            });
        } else {
            const userObject = { username: username };
            const token = jwt.sign(userObject, secret, {
                expiresIn: "1d",
            });

            const serialized = cookie.serialize("AuthJWT", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            NextResponse.next().headers.set("Set-Cookie", serialized);

            return NextResponse.json({ message: "Bienvenido", status: 200, token });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error interno en el servidor", status: 500 });
    }
}
