import { useState } from 'react';
import axiosIns from '../../../commons/api/axiosInstance';

interface UseLoginFormReturn {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: () => Promise<void>; // 비동기 함수로 수정
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

  const handleSubmit = async () => {
    console.log('로그인 시도:', { email, password });
    try {
      const response = await axiosIns.post('/login', {
        email,
        password,
      });

      const token = response.data.token; // 응답에서 JWT 토큰을 가져옴
      localStorage.setItem('token', token); // 로컬 스토리지에 토큰 저장
      console.log('로그인 성공:', token); // 디버그용 로그인 로그
      
      // 로그인 성공 후 추가 작업 (예: 리다이렉트 등)
    } catch (error) {
      console.error('로그인 실패:', error); // 디버그용 로그인 에러 로그
      throw error; // 에러를 상위 컴포넌트로 전달
    }
  };
  
  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};
