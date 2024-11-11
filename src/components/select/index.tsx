type SelectProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  className?: string;
  required?: boolean;
};

export default function SelectInput(props: SelectProps) {
  const classes = [
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
  ];

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <>
      <label
        htmlFor={`${props.name}-input`}
        className='mb-1 block text-sm font-medium text-gray-900'
      >
        {props.label}
        {props.required ? <span className={'text-red-700'}> *</span> : ''}
      </label>
      <select
        id={`${props.name}-input`}
        className={classes.join(' ').trim()}
        name={props.name}
        required={props.required}
      >
        {!props.defaultValue && (
          <option selected hidden>
            Selecione
          </option>
        )}
        {props.options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            selected={props.defaultValue === opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
