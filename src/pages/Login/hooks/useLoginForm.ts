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

  // 이메일 형식 유효성 검사
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 패스워드 유효성 검사 (영문, 숫자, 특문 중 2개 조합 8자 이상)
  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]|.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    // 로그인 처리 전에 이메일 및 패스워드 유효성 검사
    if (!isEmailValid(email)) {
      console.log('유효하지 않은 이메일 형식입니다.');
      return;
    }

    if (!isPasswordValid(password)) {
      console.log('유효하지 않은 패스워드입니다.');
      return;
    }

    // 유효성 검사를 통과하면 로그인 처리
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
