import type { InputProps } from '../types/input.ts';
import useInputInstance from '../hooks/input-instance.ts';

function FormTextarea(props: Props & InputProps<HTMLTextAreaElement>) {
  const { error, handleOnChange } = useInputInstance({
    onChange: props.onChange,
    rules: props.rules,
    value: props.value,
  });

  return (
    <div>
      <textarea
        {...props}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      {error ? <div>{error}</div> : null}
    </div>

  );
}

export default FormTextarea;

interface Props {
  onChange: (value: string) => void;
  value: string;
  rules: ((value: string) => (boolean | string))[];
}