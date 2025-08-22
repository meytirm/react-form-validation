import type { InputInstanceType } from '../types/input.ts';
import { type RefObject, useState } from 'react';

function useInputInstance({ onChange, inputValueRef, rules }: ParametersType) {
  const [error, setError] = useState('');
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

  return { inputInstance, error };
}

export default useInputInstance;

interface ParametersType {
  onChange: (value: string) => void;
  inputValueRef: RefObject<string>;
  rules: ((value: string) => (boolean | string))[];
}