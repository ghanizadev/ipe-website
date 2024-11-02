import React from "react";

export type ButtonProps = {
    onClick?: () => void | Promise<void>;
    path?: string;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children?: React.ReactNode | React.ReactNode[];
}