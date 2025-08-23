import FormProvider from './store/FormProvider.tsx';
import FormInput from './components/FormInput.tsx';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { required } from './utils/rules.ts';
import type { FromRefType } from './types/input.ts';
import FormTextarea from './components/FormTextarea.tsx';

function App() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('ss');
  const formRef = useRef<null | FromRefType>(null);

  function handleOnSubmit(event: FormEvent) {
    console.log(event);
  }


  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      console.log(formRef.current.validate());
    }
  }, []);

  return (
    <FormProvider ref={formRef} onSubmit={handleOnSubmit}>
      <FormInput value={value} onChange={setValue} rules={[required()]}/>
      <FormInput value={value2} onChange={setValue2} rules={[required()]}/>
      <FormTextarea onChange={setValue} value={value} rules={[required()]}></FormTextarea>
    </FormProvider>
  );
}

export default App;
