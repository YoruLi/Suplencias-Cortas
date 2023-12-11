import { EmailTemplate } from "@/components/ui/email-template";
import { conn } from "@/libs/mysql/db";

import { HttpStatus } from "@/utils/errors";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailSchema = z.object({
    email: z.string().min(1, "Email is required"),
    days: z.string().min(1, "Days are  required"),
    firstName: z.string().min(1, "Firstname is required"),
    hours: z.string().min(1, "The hours are required"),
    signature: z.string().min(1, "Signature is required"),
});
export async function POST(req: Request) {
    const data = await req.json();
    const { id, ...restData } = data;
    try {
        const validatedData = emailSchema.safeParse(restData);
        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.message }, { status: HttpStatus.NOT_FOUND });
        }

        const { email, days, firstName, hours, signature } = validatedData.data;
        const res = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject: "Solicitud de suplencia de la Escuela de Educación Técnica N2",
            react: EmailTemplate({ days, firstName, hours, signature }),
            text: "",
        });

        if (id) {
            const updated = await conn.query(`UPDATE Candidatos SET emailSent = 1 WHERE candidatoId = ?`, [id]);

            await conn.end();
        }
        return NextResponse.json({
            message: `Se ha enviado el mensaje a ${email}`,
            status: HttpStatus.OK,
        });
    } catch (error: unknown) {
        return NextResponse.json({ error: error.message }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
    }
}
