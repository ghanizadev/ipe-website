import React from "react";

import {useRouter} from "next/navigation";
import {ButtonProps} from "@/components/button/props";


export default function Button(props: ButtonProps) {
    const {onClick, path, children, type} = props;
    const router = useRouter()

    const handleOnClick = async () => {
        if (path) router.push(path)
        else if (onClick) await onClick();
    }

    const classNames = "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg focus:ring-4 " + props.className;

    return (
        <button
            type={type}
            onClick={handleOnClick}
            className={classNames.trim()}>
            {children}
        </button>
    )
}