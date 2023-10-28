import DashboardItem from "@/components/dasboard-item";
import React from "react";

export default function page() {
    return (
    <div className='h-screen '>
      <div className="w-full h-3/4 bg-blue-500 custom-polygon z-0">
        <h1 className="text-white mx-4 text-2xl">Dashboard</h1>
        <div className="flex gap-20 justify-center mx-4 mt-12">
            {<DashboardItem/>}
            {<DashboardItem/>}
            {<DashboardItem/>}
            {<DashboardItem/>}
        </div>
      </div>
    </div>
    );
}
