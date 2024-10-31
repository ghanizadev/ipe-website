"use client"
import React from "react";
import {useRouter} from "next/navigation";
import Button from "./button";

type ButtonProps = {
    onClick?: () => void | Promise<void>;
    path?: string;
    children?: React.ReactNode | React.ReactNode[];
}

export default function SecondaryButton(props: ButtonProps) {
    const {onClick, path, children} = props;
    const router = useRouter()

    const handleOnClick = async () => {
        if (path) router.push(path)
        else if (onClick) await onClick();
    }

    return (
        <Button
            onClick={handleOnClick}
            className={"border-2 text-[--primary] border-[--primary] bg-transparent hover:border-[--primary-darker] focus:ring-[--primary-darker]"}>
            {children}
        </Button>
    )
}