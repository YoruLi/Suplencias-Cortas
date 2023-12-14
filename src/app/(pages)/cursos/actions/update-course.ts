"use server";

import { editCourseWithId } from "../api/edit-course-with-id";

export const updateCourse = async (data: FormData, courseId) => {
    const { curso, division, ciclo } = data;
    console.log(courseId);
    const dataCourse = {
        id: courseId,
        nombre: `${curso} ${division}`,
        cicloLectivo: ciclo,
    };

    await editCourseWithId(dataCourse);
};
