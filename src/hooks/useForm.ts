import { useState, ChangeEvent, useEffect } from "react";

type FormValues = {
  [key: string]: any;
};

type ReturnTypes<T> = {
  [key: string]: any;
  formState: T;
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onResetForm: () => void;
};

export const useForm = <T extends FormValues>(initialForm: T): ReturnTypes<T> => {
  const [formState, setFormState] = useState<T>(initialForm);
  

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm])
  

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  };
};
