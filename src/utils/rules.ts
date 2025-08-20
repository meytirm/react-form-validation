import type { RuleType } from '../types/input.ts';

export const required = (message: string | undefined = 'field is required!'): RuleType => {
  return (value)  => !!value || message;
};