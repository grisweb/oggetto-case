import { FC, PropsWithChildren } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface RHFormProps extends PropsWithChildren {
  form: UseFormReturn<any>;
  onSubmit: VoidFunction;
}

const RHForm: FC<RHFormProps> = ({ form, onSubmit, children }) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default RHForm;
