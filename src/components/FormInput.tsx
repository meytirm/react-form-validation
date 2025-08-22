import { useContext, useEffect, useRef } from 'react';
import FormContext from '../store/FormContext.tsx';
import type { InputHTMLProps } from '../types/input.ts';
import useInputInstance from '../hooks/input-instance.ts';

function FormInput(props: Props & InputHTMLProps) {
  const useFormContext = useContext(FormContext);
  const inputValueRef = useRef(props.value);
  const { inputInstance, error } = useInputInstance({
    onChange: props.onChange,
    inputValueRef,
    rules: props.rules,
  });
  if (!useFormContext) {
    throw new Error('FormInput must be used within a FormProvider');
  }
  const { registerInput, unregisterInput } = useFormContext;



  function handleOnChange(inputValue: string) {
    props.onChange(inputValue);
    inputValueRef.current = inputValue;
    inputInstance.validate();
  }

  useEffect(() => {
    registerInput(inputInstance);

    return () => {
      unregisterInput(inputInstance);
    };
  }, []);

  return (
    <div>
      <input
        {...props}
        onChange={(e) => handleOnChange(e.target.value)}
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