import { useState, useCallback } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors((errors) => {
      if (name === 'email') {
        if (target.validity.valueMissing) {
          target.setCustomValidity('Пожалуйста, заполните это поле.')
        } else if (target.validity.patternMismatch) {
          target.setCustomValidity('Email должен соответствовать шаблону: someemail@maileprovider.ru.')
        } else {
          target.setCustomValidity('')
        }
      }
      return {...errors, [name]: target.validationMessage};
    });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}