import FormProvider from './store/FormProvider.tsx';
import FormInput from './components/FormInput.tsx';
import { type FormEvent, useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('ss');
  function handleOnSubmit(event: FormEvent) {
    console.log(event);
  }

  return (
    <FormProvider onSubmit={handleOnSubmit}>
      <FormInput value={value} onChange={setValue} rules={[(val: string) => !!val || 'error']}/>
      <FormInput value={value2} onChange={setValue2} rules={[(val: string) => !!val || 'empty']}/>
    </FormProvider>
  );
}

export default App;
