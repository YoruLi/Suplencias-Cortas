import Title from "@/components/ui/title";
import React from "react";

import StudyPlanItem from "./components/study-plan-item";

export const revalidate = 0;

export default async function page() {
    return (
        <div className="h-full">
            <StudyPlanItem />
        </div>
    );
}
