type SelectProps = {
    name: string;
    label: string;
    options: { label: string, value: string }[];
    defaultValue?: string;
}

export default function SelectInput(props: SelectProps) {
    return (
        <>
            <label htmlFor={`${props.name}-input`}
                   className="block mb-1 text-sm font-medium text-gray-900">{props.label}</label>
            <select
                id={`${props.name}-input`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name={props.name}
            >
                {!props.defaultValue && <option selected hidden>Selecione</option>}
                {props.options.map(opt => (
                    <option key={opt.value} value={opt.value}
                            selected={props.defaultValue === opt.value}>{opt.label}</option>
                ))}
            </select>
        </>
    )
}