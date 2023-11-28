import { getSession } from "@/data/getSession";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const session = await getSession();

    const { origin, pathname } = new URL(req.url);

    if (session.success && (pathname === "/" || ["/login"].includes(pathname))) {
        return NextResponse.redirect(new URL("/dashboard", origin));
    }
    if (!session.success) {
        if (
            req.nextUrl.pathname.startsWith("/dashboard") ||
            req.nextUrl.pathname.startsWith("/docentes") ||
            req.nextUrl.pathname.startsWith("/cursos") ||
            req.nextUrl.pathname.startsWith("/cargos") ||
            req.nextUrl.pathname.startsWith("/materias")
        ) {
            return NextResponse.redirect(new URL("/login", origin));
        }
    }

    return res;
}

export const config = {
    matcher: ["/", "/login", "/dashboard", "/cursos/:path*", "/docentes/:path*", "/materias/:path*", "/cargos/:path*"],
};
