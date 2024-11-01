import React from "react"

import "./rich-text.scss"

type RichTextProps = {
    html?: string;
    className?: string;
}

export default function RichText({html, className}: RichTextProps) {
    const content = (html ?? '').replaceAll('src="/', `src="${process.env.NEXT_PUBLIC_CMS_URL}/`)
    return (
        <div
            className={[className].join(' ')}
            dangerouslySetInnerHTML={{__html: content}}
        ></div>
    )
}