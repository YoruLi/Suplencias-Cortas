export const cursos = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo"];

export const divisiones = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma", "8va", "9na", "10ma"];
export const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export const stateAsignation = ["Asignado", "Sin asignar"];

export const plainObject = (data: any[]) =>
    JSON.parse(
        JSON.stringify(
            data,
            //I had a problem with a bigint value - and heres the solution for it too
            (key, value) => (typeof value === "bigint" ? value.toString() : value)
        )
    );
