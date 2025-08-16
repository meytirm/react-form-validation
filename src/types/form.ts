import type { InputInstanceType } from './input.ts';

export type FormContextType = {
  registerInput: (input: InputInstanceType) => void;
  unregisterInput: (input: InputInstanceType) => void;
}