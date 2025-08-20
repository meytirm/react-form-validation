import type { InputHTMLAttributes } from 'react';

export type InputInstanceType = {
  validate: () => boolean;
  reset: () => void;
}

export type RuleType = (value: string) => boolean | string

export type InputHTMLProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>