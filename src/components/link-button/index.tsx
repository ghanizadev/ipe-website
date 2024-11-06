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
              className="block py-2 px-3 rounded md:border-0 hover:text-[--primary-lighter] hover:underline md:p-0">{props.children}</Link>
    )
}