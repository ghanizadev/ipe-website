import React from "react";
import Link from "next/link";

type DropdownItemProps = {
    href: string;
    children?: React.ReactNode | React.ReactNode[];
}

function DropdownItem(props: DropdownItemProps) {
    return (
        <Link href={props.href}
              className="block px-4 py-2 hover:bg-[--primary-clear] hover:text-[--primary]">{props.children}</Link>
    )
}

type DropdownProps = {
    label: string;
    options: { label: string; path: string; }[]
}

export default function Dropdown(props: DropdownProps) {
    const {options, label} = props;

    return (
        <>
            <button id="dropdownNavbarLink" data-dropdown-toggle={"dropdown" + label}
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[--primary-lighter] md:p-0 md:w-auto">{label}
                <svg
                    className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id={"dropdown" + label}
                 className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownLargeButton">
                    {options.map(({path, label}) => (<DropdownItem key={path} href={path}>{label}</DropdownItem>))}
                </ul>
            </div>
        </>
    )
}