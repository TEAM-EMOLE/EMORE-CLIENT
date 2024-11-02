import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        navigate('/home'); // 로그인 성공 시 홈 화면으로 이동
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      // 실패 시 에러 처리를 추가할 수 있습니다 (예: 에러 메시지 표시)
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
