export const editSignature = async (data: Curso) => {
    const url = `http://localhost:3000/api/materias`;
    try {
        const res = await fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return error;
    }
};
