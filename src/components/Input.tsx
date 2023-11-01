import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = props => {
    return (
        <div className="relative group w-full">
            <input
                type="text"
                {...props}
                className="w-full p-3 text-sm appearance-none caret-white text-white outline-none border-slate-300 bg-transparent border-[0.2px] rounded-md border-opacity-50 focus:border-inherit placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
            />
            <span className="pointer-events-none text-sm capitalize text-slate-400  absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                {props.placeholder}
            </span>
        </div>
    );
};

export default Input;
