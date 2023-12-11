"use server";
import { conn } from "@/libs/mysql/db";

export const getTotalTeachersPerMonth = async () => {
    const result = await conn.query(`
    SELECT 
            month,
            COUNT(Docentes.createdAt) as total
        FROM (
            SELECT 1 as month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
            UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
        ) AS Meses
        LEFT JOIN 
            Docentes ON MONTH(Docentes.createdAt) = Meses.month
        GROUP BY 
            Meses.month
        ORDER BY 
            Meses.month ASC;
       `);
    console.log(result);
    return result;
};
