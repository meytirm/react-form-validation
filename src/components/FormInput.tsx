import { useContext, useEffect, useRef, useState } from 'react';
import FormContext from '../store/FormContext.tsx';
import type { InputInstanceType } from '../types/input.ts';

function FormInput({ value, onChange, rules }: Props) {
  const [error, setError] = useState('');
  const useFormContext = useContext(FormContext);
  const inputValueRef = useRef(value);
  if (!useFormContext) {
    throw new Error('FormInput must be used within a FormProvider');
  }
  const { registerInput, unregisterInput } = useFormContext;

  const inputInstance: InputInstanceType = {
    reset() {
      onChange('');
      inputValueRef.current = '';
      this.validate();
    },
    validate() {
      return rules.some((rule) => {
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
    onChange(inputValue);
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
      <input value={value} onChange={(e) => handleOnChange(e.target.value)}/>
      {error ? <div>{error}</div> : null}
    </div>

  );
}

export default FormInput;

interface Props {
  value: string;
  onChange: (value: string) => void;
  rules: ((value: string) => (boolean | string))[];
}