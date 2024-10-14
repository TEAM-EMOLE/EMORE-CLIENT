import { useState } from 'react';

interface UseLoginFormReturn {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: () => void;
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

  const handleSubmit = () => {
    // 로그인 처리 로직
    console.log('로그인 시도:', { email, password });
    // API 요청 등을 추가하여 실제 로그인 처리
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};
