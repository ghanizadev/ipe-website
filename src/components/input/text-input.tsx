type TextInputProps = {
    name: string;
    label?: string;
    type?: string;
    error?: string | boolean;
    success?: string | boolean;
    readonly?: boolean;
    required?: boolean;
    className?: string;
    defaultValue?: string;
    pattern?: string;
    title?: string;
    hidden?: boolean;
}

export default function TextInput(props: TextInputProps) {
    const successClassNames = "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500";
    const errorClassNames = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500";
    const commonClassNames = ["border text-sm rounded-lg block w-full p-2.5"];

    const wrapperClassNames = [props.className ?? ''];

    if (props.error) {
        commonClassNames.push(errorClassNames)
    } else if (props.success) {
        commonClassNames.push(successClassNames)
    } else {
        commonClassNames.push("bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500")
    }

    if (props.hidden) {
        wrapperClassNames.push('hidden');
    }

    const getDefaultValue = (defaultValue?: string): string | undefined => {
        if (!defaultValue) return;
        const date = new Date(defaultValue)

        if (!Number.isNaN(date.valueOf()) && date.toISOString() === defaultValue) {
            return date.toISOString().split('T')[0];
        }

        return defaultValue;
    }

    return (
        <div className={wrapperClassNames.join(' ').trim()}>
            <label
                htmlFor={props.name}
                className={`block mb-2 text-sm font-medium${props.success ? ' text-green-700' : ''}${props.error ? ' text-red-700' : ''}`}>
                {props.label}{props.required ? <span className={"text-red-700"}> *</span> : ''}
            </label>
            <input
                required={props.required}
                type={props.type ?? 'text'}
                name={props.name}
                id={props.name}
                disabled={props.readonly}
                pattern={props.pattern}
                title={props.title}
                hidden={props.hidden}
                defaultValue={getDefaultValue(props.defaultValue)}
                className={commonClassNames.join(" ").trim()}
            />
            {typeof props.success === 'string' && (<p className="mt-2 text-sm text-green-600">{props.success}</p>)}
            {typeof props.error === 'string' && (<p className="mt-2 text-sm text-red-600">{props.error}</p>)}
        </div>
    )
}