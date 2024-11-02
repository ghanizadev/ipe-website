import React from "react";
import Link from "next/link";

type LinkProps = {
    href: string;
    target?: string;
    current?: string;
    children?: React.ReactNode | React.ReactNode[]
}

export default function LinkButton(props: LinkProps) {
    return (
        <Link href={props.href}
              data-current={props.current}
              className="block py-2 px-3 rounded hover:bg-[--primary-lighter] md:hover:bg-transparent md:border-0 md:hover:text-[--primary-lighter] md:p-0">{props.children}</Link>
    )
}