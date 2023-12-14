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
    NO_CONTENT = 204,
}

export class HttpResponse extends Error {
    OK(data?: any) {
        return NextResponse.json(
            {
                data: data,
                error: "Success",
            },
            {
                status: HttpStatus.OK,
            }
        );
    }

    NotFound(data?: any, error?: string) {
        return NextResponse.json(
            {
                ...(data && { data: data }),
                error: error ?? "Not found",
            },
            {
                status: HttpStatus.NOT_FOUND,
            }
        );
    }

    InternalServerError(data?: any) {
        return NextResponse.json(
            {
                data: data,
                error: "Internal server error",
            },
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            }
        );
    }

    NoContent(data?: any) {
        return NextResponse.json(
            {
                data: {},
            },
            {
                status: HttpStatus.NO_CONTENT,
            }
        );
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

    ER_PARSE_ERROR(data?: any, error?: string) {
        return NextResponse.json(
            {
                ...(data && { data: data }),
                error: error ?? "Verifica la información ingresada",
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

    static NotFound() {}
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

export class HttpError extends Error {
    constructor({ message, name, statusCode }) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, HttpError);
    }
}

export class HttpBadRequest extends HttpError {
    constructor(message = "Bad request") {
        super({
            message,
            name: "HttpBadRequest",
            statusCode: htt.BAD_REQUEST,
        });
    }
}

export class HttpNotFound extends HttpError {
    constructor(message = "Not Found") {
        super({
            message,
            name: "HttpNotFound",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }
}

export class HttpInternalServerError extends HttpError {
    constructor(message = "Internal server error") {
        super({
            message,
            name: "HttpInternalServerError",
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}

export class ER_PARSE_ERROR extends HttpError {
    constructor(message = "Verificar información") {
        super({
            message,
            name: "Er_Parse_Error",
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
