"use client"

import React from "react";
import Button from "./button";
import {CommonButtonProps} from "@/components/button/props";

export default function SecondaryButton(props: CommonButtonProps) {
    const classes = ["border-2 text-[--primary] border-[--primary] bg-transparent hover:border-[--primary-darker] focus:ring-[--primary-darker]"]

    if (props.className) classes.push(props.className)

    return (
        <Button
            {...props}
            className={classes.join(' ')}>
            {props.children}
        </Button>
    )
}