import { useState } from 'react';

export const useResponseError = () => {
  const [ responseError, setResponseError ] = useState('');
  return { responseError, setResponseError };
};