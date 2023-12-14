import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register?: any;
}

const Input: React.FC<InputProps> = props => {
    return (
        <div className="relative group w-full">
            <input
                type="text"
                {...props}
                {...(props?.register && props?.register(props?.name ?? null))}
                className="w-full p-3 text-sm appearance-none caret-white outline-none border-slate-400 bg-transparent border-[0.2px] rounded-md border-opacity-50 focus:border-inherit placeholder-gray-300 placeholder-opacity-0 font-light  transition-transform duration-200"
            />
            <span className="pointer-events-none text-sm capitalize text-gray-400 bg-white  absolute left-3 top-3 px-1 transition-transform duration-200 input-text">
                {props.placeholder}
            </span>
        </div>
    );
};

export default Input;
