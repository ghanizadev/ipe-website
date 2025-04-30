type TextAreaProps = {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string | null;
  required?: boolean;
};

export default function TextArea({
  label,
  name,
  className,
  placeholder,
  defaultValue,
  required,
}: TextAreaProps) {
  const classes = [
    'block p-2.5 my-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300',
  ];

  if (className) {
    classes.push(className);
  }

  return (
    <>
      <label
        htmlFor={`${name}-textarea`}
        className='mb-2 block text-sm font-medium text-gray-900'
      >
        {label}
        {required ? <span className={'text-red-700'}> *</span> : ''}
      </label>
      <textarea
        id={`${name}-textarea`}
        rows={4}
        className={classes.join(' ').trim()}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue ?? undefined}
      ></textarea>
    </>
  );
}
