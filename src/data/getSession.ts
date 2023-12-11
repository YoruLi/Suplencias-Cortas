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
    if (!token) {
        return {
            succes: false,
        };
    }

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

// export const refreshAccessToken = async (refreshToken: any) => {
//     "use server";
//     try {
//         const response = await fetch("http://localhost:3000/api/refresh-token", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 refresh_token: refreshToken,
//                 username: refreshToken.aud,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(`Error al renovar el token. Código de estado: ${response.status}`);
//         }

//         const refreshedToken = await response.json();

//         return refreshedToken;
//     } catch (error) {
//         console.error("Error al refrescar el token:", error);
//         throw new Error("Error al renovar el access token");
//     }
// };
