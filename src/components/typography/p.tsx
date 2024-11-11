import React from "react";
import type {ParagraphProps} from "@/components/typography/type";


export default function P({children}: ParagraphProps) {
    const classes = ["mb-3 text-gray-500"];
    return <p className={classes.join(" ").trim()}>{children}</p>
}