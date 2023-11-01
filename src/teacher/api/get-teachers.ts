export const getTeachers = async () => {
    const res = await fetch("http://localhost:3000/api/docentes", {
        method: "GET",
    });
    const teachers = await res.json();
    return teachers;
};
