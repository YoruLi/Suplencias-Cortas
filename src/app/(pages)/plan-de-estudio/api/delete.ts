export const deletePlan = async (planId: string) => {
    const result = await fetch("http://localhost:3000/api/plan-de-estudio", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(planId),
    });

    const res = await result.json();
    return res;
};
