type TextAreaProps = {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
};

export default function TextArea({
  label,
  name,
  className,
  placeholder,
  required,
}: TextAreaProps) {
  const classes = [
    'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500',
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
      ></textarea>
    </>
  );
}
