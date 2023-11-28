import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request: Request) {
    const cookieStore = cookies();

    const token = cookieStore.get("myAuthToken");
    console.log({ token });

    if (!token) {
        return NextResponse.json({ error: "Not logged in" });
    }

    const data = jwt.verify(token.value, "123");

    return NextResponse.json({
        data,
    });
}
