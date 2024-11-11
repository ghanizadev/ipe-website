"use client"

import React from "react";

import {AnchorProps, ButtonProps} from "@/components/button/props";
import Anchor from "@/components/button/anchor";
import Button from "./button";

function SecondaryButton(props: AnchorProps): React.JSX.Element;

function SecondaryButton(props: ButtonProps): React.JSX.Element;

function SecondaryButton({tag, ...props}: ButtonProps | AnchorProps) {
    const classes = ["border-2 text-[--primary] border-[--primary] bg-transparent hover:border-[--primary-darker] focus:ring-[--primary-darker]"]

    if (props.className) classes.push(props.className)

    switch (tag) {
        case 'anchor':
            const anchorProps = props as AnchorProps;
            return (
                <Anchor
                    {...anchorProps}
                    className={classes.join(" ")}>
                    {props.children}
                </Anchor>
            )
        default:
            const buttonProps = props as ButtonProps;
            return (
                <Button
                    {...buttonProps}
                    className={classes.join(" ")}>
                    {props.children}
                </Button>
            )
    }
}

export default SecondaryButton;