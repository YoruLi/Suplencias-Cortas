import createHttpError from "http-errors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZAED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500,
    ER_DUP_ENTRY = 409,
}

export class HttpResponse {
    OK(data?: any) {
        return NextResponse.json({
            status: HttpStatus.OK,
            data: data,
            error: "Success",
        });
    }

    NotFound(data?: any) {
        return NextResponse.json({
            status: HttpStatus.NOT_FOUND,
            data: data,
            error: "Not found",
        });
    }

    InternalServerError(data?: any) {
        return NextResponse.json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            data: data,
            error: "Internal server error",
        });
    }

    ER_DUP_ENTRY(data?: any) {
        return NextResponse.json(
            {
                data: data,
                error: "Registro duplicado",
            },
            {
                status: HttpStatus.ER_DUP_ENTRY,
            }
        );
    }
}

export const createError = function (name: string) {
    return class ErrorHandler extends Error {
        constructor(message = "Ha ocurrido un error inesperado!") {
            super(message);

            this.message = message;
            this.name = name;
        }
    };
};

export class ErrorHandler extends Error {
    constructor(message = "Ha ocurrido un error inesperado!", statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

interface ErrorResponse {
    error: {
        message: string;
        err?: any; // Sent for unhandled errors reulting in 500
    };
    status?: number; // Sent for unhandled errors reulting in 500
}

function errorHandler(err: unknown, res: NextApiResponse<ErrorResponse>) {
    // Errors with statusCode >= 500 are should not be exposed
    if (createHttpError.isHttpError(err) && err.expose) {
        // Handle all errors thrown by http-errors module

        return NextResponse.json({ error: { message: err.message }, status: err.statusCode });
    } else if (err instanceof ZodError) {
        return NextResponse.json({ error: { message: err.errors.join(", ") }, status: 400 });
    } else {
        // default to 500 server error
        return NextResponse.json({
            error: { message: "Internal Server Error", err: err },
            status: createHttpError.isHttpError(err) ? err.statusCode : 500,
        });
    }
}
export type Method = "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "PURGE" | "LINK" | "UNLINK";

type ApiMethodHandlers = {
    [key in Uppercase<Method>]?: NextApiHandler;
};

export function apiHandler(handler: ApiMethodHandlers) {
    return async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
        try {
            const method = req.method ? (req.method.toUpperCase() as keyof ApiMethodHandlers) : undefined;

            // check if handler supports current HTTP method
            if (!method) throw new createHttpError.MethodNotAllowed(`No method specified on path ${req.url}!`);

            const methodHandler = handler[method];
            if (!methodHandler) throw new createHttpError.MethodNotAllowed(`Method ${req.method} Not Allowed on path ${req.url}!`);

            // call method handler
            await methodHandler(req, res);
        } catch (err) {
            // global error handler

            errorHandler(err, res);
        }
    };
}
