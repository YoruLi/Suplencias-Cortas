import { getSession } from "@/data/getSession";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const session = getSession();
    const { origin, pathname } = new URL(req.url);

    if (session?.user && (pathname === "/" || ["/login"].includes(pathname))) {
        return NextResponse.redirect(new URL("/dashboard", origin));
    }
    console.log(session);
    if (!session?.user) {
        if (
            req.nextUrl.pathname.startsWith("/dashboard") ||
            req.nextUrl.pathname.startsWith("/docentes/agregar") ||
            req.nextUrl.pathname.startsWith("/cursos/agregar") ||
            req.nextUrl.pathname.startsWith("/cargos/agregar") ||
            req.nextUrl.pathname.startsWith("/materias/agregar")
        ) {
            return NextResponse.redirect(new URL("/login", origin));
        }
    }

    return res;
}

export const config = {
    matcher: ["/", "/login", "/dashboard", "/cursos/:path*", "/docentes/:path*", "/materias/:path*", "/cargos/:path*"],
};
