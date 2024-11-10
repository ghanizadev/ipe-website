import React from "react"
import NextLink from "next/link"

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }

export default function Link({children, ...props}: LinkProps) {
    const classes = ["text-[--primary-lighter] underline"];

    if (props.className) {
        classes.push(props.className);
    }

    return <NextLink {...props} href={props.href ?? '#'} className={classes.join(" ").trim()}>{children}</NextLink>
}