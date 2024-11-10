import React from "react";

type CheckboxInputProps = {
    name: string;
    title?: string;
    inputClassName?: string;
    labelClassName?: string;
    children?: React.ReactNode;
}

export default function CheckboxInput(props: CheckboxInputProps) {
    const inputClasses = ["w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"];
    const labelClasses = ["ms-2 text-sm font-medium text-gray-900"];

    if (props.inputClassName) {
        inputClasses.push(props.inputClassName);
    }

    if (props.labelClassName) {
        labelClasses.push(props.labelClassName);
    }

    return (
        <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
                <input id={props.name + '-checkbox'}
                       type="checkbox"
                       value=""
                       className={inputClasses.join(' ').trim()}
                       required/>
            </div>
            <label
                htmlFor={props.name + "-checkbox"}
                className={labelClasses.join(" ").trim()}
            >
                {props.children}
            </label>
        </div>
    )
}