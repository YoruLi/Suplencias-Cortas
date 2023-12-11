import React from "react";

export default function ErrorMessage({ error }: { error: any }) {
    return error && <p className="text-red-500 text-xs italic">{error.message?.toString()}</p>;
}
