import { useState, useCallback } from 'react';

export default function useForm(initialValues = {}) {
  const [formValues, setFormValues] = useState(initialValues);

  const createSetter = useCallback((name) => {
    return (value) => {
      let newValue;
      if (typeof value === 'string') {
        newValue = value.trim();
        newValue = newValue.replace(/\s+/ig, ' ');
      }

      setFormValues({
        ...formValues,
        [name]: newValue
      });
    };
  }, [formValues, setFormValues]);

  return {
    formValues,
    createSetter
  };
}
