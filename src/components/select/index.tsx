import { twMerge } from 'tailwind-merge';

type SelectProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  defaultValue?: string | null;
  className?: string;
  required?: boolean;
  error?: string | boolean;
};

export default function SelectInput(props: SelectProps) {
  const classes = [
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
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
        className={twMerge(
          ...classes,
          props.error
            ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
            : ''
        )}
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
      {typeof props.error === 'string' && (
        <p className='mt-2 text-sm text-red-600'>{props.error}</p>
      )}
    </>
  );
}
