import React from "react";

export type ButtonProps = {
    onClick?: () => void | Promise<void>;
    path?: string;
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
}