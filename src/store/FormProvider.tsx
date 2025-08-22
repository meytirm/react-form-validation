import { type FormEvent, type ReactNode, type Ref, useImperativeHandle, useRef } from 'react';
import FormContext from './FormContext.tsx';
import type { FromRefType, InputInstanceType } from '../types/input.ts';

function FormProvider({ children, preventDefault, onSubmit, ref }: Props) {
  const inputs = useRef<InputInstanceType[]>([]);

  function registerInput(input: InputInstanceType) {
    inputs.current.push(input);
  }

  function unregisterInput(input: InputInstanceType) {
    inputs.current = inputs.current.filter(i => i !== input);
  }

  function handleOnSubmit(event: FormEvent) {
    if (preventDefault) {
      event.preventDefault();
    }
    const isValid = inputs.current.every(input => input.validate());
    if (isValid) {
      onSubmit(event);
    }
  }

  useImperativeHandle(ref, () => ({
    validate() {
      return inputs.current.every(input => input.validate());
    },
    reset() {
      inputs.current.forEach(input => input.reset());
    },
  }));

  return (
    <FormContext value={{ registerInput, unregisterInput }}>
      <form onSubmit={handleOnSubmit} >
        {children}
      </form>
    </FormContext>
  );
}

export default FormProvider;

interface Props {
  children: ReactNode
  onSubmit: (event: FormEvent) => void
  preventDefault?: boolean
  ref?: Ref<FromRefType>
}