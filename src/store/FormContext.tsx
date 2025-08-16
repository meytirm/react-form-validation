import { createContext } from 'react';
import type { FormContextType } from '../types/form.ts';

const FormContext = createContext<FormContextType | null>(null);

export default FormContext;