import z from "zod";

export const formTeacherSchema = z
    .object({
        name: z.string(),
        lastname: z.string(),
        email: z
            .string()

            .min(1, "Email es requerido")
            .email("Email invalido"),
    })
    .superRefine((values, ctx) => {
        if (!values.email) {
            ctx.addIssue({
                message: "Todos los campos son obligatorios",
                code: z.ZodIssueCode.custom,
                path: ["email"],
            });
        }
    });

export const teacherValidation = z
    .object({
        name: z.string(),
        lastname: z.string(),
        email: z
            .string()

            .min(1, "Email es requerido")
            .email("Email invalido"),
        tel: z.string(),
        dni: z.string(),
        dir: z.string(),
        score: z.number(),
    })
    .superRefine((values, ctx) => {
        if (!values.email) {
            ctx.addIssue({
                message: "Todos los campos son obligatorios",
                code: z.ZodIssueCode.custom,
                path: ["email"],
            });
        }
    });

export const formCourseValidation = z.object({
    modalidad: z.string().min(1, "La modalidad es requerida"),
    curso: z.string().min(1, "El curso es requerido"),
    division: z.string().min(1, "La division es requerida"),
    ciclo: z.string({ required_error: "El ciclo lectivo es obligatorio" }),
});
export const courseValidation = z.object({
    id: z.string(),
    modalidadId: z.number(),
    nombre: z.string().min(1, "El nombre es requerido"),
    cicloLectivo: z.string().min(1, "El ciclo lectivo es obligatorio"),
});

export const signatureValidation = z.object({
    codigoMateria: z.string(),
    nombre: z.string().min(1, "El nombre de materia es requerido"),
    año: z.string().min(1, "El nombre es requerido"),
    planDeEstudioId: z.string().min(1, "El plan de estudio es requerido"),
});

export const planValidation = z.object({
    id: z.string().optional(),
    nombre: z.string().min(1, "El nombre es obligatoria"),
    descripcion: z.string().min(1, "La descripcion es obligatoria"),
    resolucion: z.string().min(1, "La resolucion es obligatoria"),
});

// export type FormData = z.infer<typeof formTeacherSchema>;
