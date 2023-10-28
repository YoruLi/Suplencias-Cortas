import React from 'react'

export default function DashboardItem(){
    return(
        <div className="bg-white w-1/5 flex justify-between h-28 p-2 rounded-2xl">
            <div className='flex flex-col items-center justify-between'>
                <span className="text-gray-500">Total Docentes</span>
                <h3 className="text-xl font-bold">45</h3>
                <div className='flex flex-row items-start w-full'>
                    <span className="text-blue-500 text-sm">Mostrar más</span>
                </div>
            </div>
            <div className="bg-teal-500 h-40 w-1/7 flex justify-center items-center rounded-full">
                <i className="bi bi-people-fill"></i>
            </div>
        </div>
    )
}