"use client"

import React from "react";
import {ButtonProps} from "./props";
import Button from "./button";

export default function PrimaryButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            className={"text-white bg-[--primary] hover:bg-[--primary-darker] focus:ring-[--primary-lighter]"}>
            {props.children}
        </Button>
    )
}