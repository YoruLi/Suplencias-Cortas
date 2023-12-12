interface TeacherProps extends Omit<Teacher, "idDocentes" | "nombreCompleto"> {}

export const create = async (data: TeacherProps) => {
    const res = await fetch(`http://localhost:3000/api/docentes`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
};
