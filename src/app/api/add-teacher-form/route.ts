import { NextResponse } from "next/server";

let GLOBAL_FORM_DATA = {};

export async function GET(req: Request) {
    const formData = req.json();
    return NextResponse.json({ formData: GLOBAL_FORM_DATA });
}

export async function POST(req: Request) {
    const formData = await req.json();

    const formKey = Object.keys(formData)[0];

    GLOBAL_FORM_DATA = {
        ...GLOBAL_FORM_DATA,
        [formKey]: formData[formKey],
    };
    return NextResponse.json({ formData: GLOBAL_FORM_DATA });
}
