import type { InputInstanceType, InputValueType } from '../types/input.ts';
import { useContext, useEffect, useRef, useState } from 'react';
import FormContext from '../store/FormContext.tsx';

function useInputInstance({ onChange , rules, value }: ParametersType) {
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

  return { error, handleOnChange };
}

export default useInputInstance;

interface ParametersType {
  onChange: (value: InputValueType) => void;
  rules: ((value: InputValueType) => (boolean | string))[];
  value: InputValueType;
}