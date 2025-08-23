import type { InputProps } from '../types/input.ts';
import useInputInstance from '../hooks/input-instance.ts';

function FormInput(props: Props & InputProps<HTMLInputElement>) {
  const { error, handleOnChange } = useInputInstance({
    onChange: props.onChange,
    rules: props.rules,
    value: props.value,
  });


  return (
    <div>
      <input
        {...props}
        onChange={(e) => {
          console.log(e.target.value);
          handleOnChange(e.target.value);
        }}
      />
      {error ? <div>{error}</div> : null}
    </div>
  );
}

export default FormInput;

interface Props {
  onChange: (value: string) => void;
  value: string;
  rules: ((value: string) => (boolean | string))[];
}