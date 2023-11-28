"use server";
import { cookies } from "next/headers";
import * as jose from "jose";

export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret || secret?.length === 0) {
        throw new Error("The enviroment variable JWT_SECRET_KEY is not set");
    }

    return secret;
};

export const verifyToken = async (token: string) => {
    try {
        const verify = await jose.jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        return verify.payload;
    } catch (error) {
        throw new Error("Token has expired");
    }
};

export const getSession = async () => {
    const token = cookies().get("user-token")?.value;
    const verifiedToken =
        token &&
        (await verifyToken(token).catch(err => {
            console.log(err);
        }));

    return verifiedToken
        ? {
              success: true,
              user: verifiedToken.aud,
          }
        : {
              success: false,
          };
};
