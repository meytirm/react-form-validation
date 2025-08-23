import type { InputProps, InputValueType } from '../types/input.ts';
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
          handleOnChange(e.target.value);
        }}
      />
      {error ? <div>{error}</div> : null}
    </div>
  );
}

export default FormInput;

interface Props {
  onChange: (value: InputValueType) => void;
  value: string;
  rules: ((value: InputValueType) => (boolean | string))[];
}