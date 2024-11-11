import React from "react";

export type CommonButtonProps = {
    className?: string;
    tag: "button" | "anchor";
    children?: React.ReactNode | React.ReactNode[];
}

export type AnchorProps = CommonButtonProps & {
    tag: 'anchor';
    href: string;
    target?: string;
    rel?: string;
}

export type ButtonProps = CommonButtonProps & {
    tag: 'button';
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void | Promise<void>;
}