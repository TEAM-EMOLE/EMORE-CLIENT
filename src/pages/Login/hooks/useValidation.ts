import { useState, useEffect } from 'react';

export const useValidation = (email: string, password: string) => {
  const [isFormValid, setFormValid] = useState(false);

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

  // 이메일 및 패스워드가 모두 유효한지 확인
  useEffect(() => {
    setFormValid(isEmailValid(email) && isPasswordValid(password));
  }, [email, password]);

  return isFormValid;
};
