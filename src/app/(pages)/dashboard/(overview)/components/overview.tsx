"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getTotalTeachersPerMonth } from "../actions/get";

function getMonthName(monthNumber: number) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[monthNumber - 1];
}
export function Overview() {
    const [totalTeachersPerMonth, setTotalTeachersPerMonth] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTotalTeachersPerMonth();
                return data;
            } catch (error) {
                return [];
            }
        };

        fetchData().then(res => {
            const data = res.map(result => ({
                month: getMonthName(result.month),
                total: result.total,
            }));
            console.log(data);
            setTotalTeachersPerMonth(data);
        });
    }, []);

    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={totalTeachersPerMonth}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} tickFormatter={value => `${value}`} />
                <Bar dataKey="total" fill="#0F172A" />
            </BarChart>
        </ResponsiveContainer>
    );
}
