import { useState } from 'react';

interface UseLoginFormReturn {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
  };
};
