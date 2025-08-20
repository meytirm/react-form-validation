import { useContext, useEffect, useRef, useState } from 'react';
import FormContext from '../store/FormContext.tsx';
import type { InputHTMLProps, InputInstanceType } from '../types/input.ts';

function FormInput(props: Props & InputHTMLProps) {
  const [error, setError] = useState('');
  const useFormContext = useContext(FormContext);
  const inputValueRef = useRef(props.value);
  if (!useFormContext) {
    throw new Error('FormInput must be used within a FormProvider');
  }
  const { registerInput, unregisterInput } = useFormContext;

  const inputInstance: InputInstanceType = {
    reset() {
      props.onChange('');
      inputValueRef.current = '';
      this.validate();
    },
    validate() {
      return props.rules.some((rule) => {
        const result = rule(inputValueRef.current);
        if (typeof result === 'string') {
          setError(result);
          return false;
        }
        setError('');
        return true;
      });
    },
  };

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