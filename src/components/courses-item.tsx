import React from 'react'

export default function CoursesItem(){
    return <>
        <div className="w-60 h-28 flex justify-between border border-gray-400 rounded-lg p-4">
            <div className=" flex flex-col justify-between">
                <h4 className='font-bold'>INFORMATICA</h4>
                <span className="text-xs text-gray-700">Preceptor: Pepe Soto</span>
            </div>            
            <div className="flex flex-col justify-between">
                <h4 className='font-bold text-xl'>7°2°</h4>
                <span className="font-bold">T.M</span>
            </div>
        </div>
    </>    
}