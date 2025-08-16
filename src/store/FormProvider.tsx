import { type FormEvent, type ReactNode, useRef } from 'react';
import FormContext from './FormContext.tsx';
import type { InputInstanceType } from '../types/input.ts';

function FormProvider({ children, preventDefault, onSubmit }: Props) {
  const inputs = useRef<InputInstanceType[]>([]);

  function registerInput(input: InputInstanceType) {
    inputs.current.push(input);
  }

  function unregisterInput(input: InputInstanceType) {
    inputs.current = inputs.current.filter(i => i !== input);
    console.log(inputs.current.length);
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

  return (
    <FormContext value={{ registerInput, unregisterInput }} >
      <form onSubmit={handleOnSubmit}>
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
}