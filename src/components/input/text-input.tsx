type TextInputProps = {
    label: string;
    name: string;
    type?: string;
    error?: string | boolean;
    success?: string | boolean;
    className?: string;
}

export default function TextInput(props: TextInputProps) {
    const successClassNames = "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5";
    const errorClassNames = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5";
    const commonClassNames = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

    return (
        <div className={props.className}>
            <label htmlFor={props.name}
                   className={`block mb-2 text-sm font-medium${props.success ? ' text-green-700' : ''}${props.error ? ' text-red-700' : ''}`}>{props.label}</label>
            <input type={props.type ?? 'text'} name={props.name} id={props.name}
                   className={props.error ? errorClassNames : props.success ? successClassNames : commonClassNames}/>
            {typeof props.success === 'string' && (<p className="mt-2 text-sm text-green-600">{props.success}</p>)}
            {typeof props.error === 'string' && (<p className="mt-2 text-sm text-red-600">{props.error}</p>)}
        </div>
    )
}