"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { getTotalTeachersPerMonth } from "../actions/get";

function getMonthName(monthNumber: number) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[monthNumber - 1];
}
export function Overview() {
    const [totalTeachersPerMonth, setTotalTeachersPerMonth] = React.useState([]);
    const fetchData = React.useCallback(async () => {
        try {
            const data = await getTotalTeachersPerMonth();
            return data;
        } catch (error) {
            return [];
        }
    }, []);
    React.useEffect(() => {
        fetchData().then(res => {
            const data = res.map(result => ({
                month: getMonthName(result.month),
                Total: result.total,
            }));

            setTotalTeachersPerMonth(data);
        });
    }, [fetchData]);

    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={totalTeachersPerMonth}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey={"Total"} fill="#0F172A" />
            </BarChart>
        </ResponsiveContainer>
    );
}
