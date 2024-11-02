"use client"

import React from "react";
import {ButtonProps} from "./props";
import Button from "./button";

export default function PrimaryButton(props: ButtonProps) {
    const classes = ["text-white bg-[--primary] hover:bg-[--primary-darker]"];

    if (props.className) classes.push(props.className)

    return (
        <Button
            {...props}
            className={classes.join(" ")}>
            {props.children}
        </Button>
    )
}