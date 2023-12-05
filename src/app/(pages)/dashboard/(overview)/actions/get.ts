"use server";
import { conn } from "@/libs/mysql/db";

export const getTotalTeachersPerMonth = async () => {
    const result = await conn.query(`
    SELECT 
    MONTH(createdAt) as month, 
    COUNT(*) as total
    FROM Docentes 
    GROUP BY MONTH(createdAt)
    ORDER BY MONTH(createdAt) ASC; 
       `);

    return result;
};
