"use server";

import React, {FC} from "react";
import Link from "next/link";

import styles from "./navbar.module.scss";


export const NavbarDropdown: FC<{ label: string, children: React.ReactNode[], path?: string }> = async ({
                                                                                                            label,
                                                                                                            path,
                                                                                                            children
                                                                                                        }) => {
    return (
        <span className={styles.dropdown}>
            <span>
                <Link href={path ?? '#'}>
                    {label}
                </Link>
            </span>
            <ul>
                {children.map((child, index) => (<li key={index}>{child}</li>))}
            </ul>
        </span>
    )
}