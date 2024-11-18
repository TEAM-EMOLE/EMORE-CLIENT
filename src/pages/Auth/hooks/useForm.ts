import { useState } from 'react';
import { AxiosError } from 'axios';
import { useBottomToastStore } from '../../../commons/components/BottomToastList/stores/useBottomToastStore';
import { useNavigate } from 'react-router-dom';
import api from '../../../commons/api/axiosInstance';
interface ErrorResponse {
  message?: string;
  code?: string;
  data?: {
    grantType?: string;
    accessToken?: string;
    refreshToken?: string;
  };
}

export function useLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const addToast = useBottomToastStore((state) => state.addToast);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async () => {
    // 이메일과 비밀번호 둘 다 비어 있는 경우
    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
      addToast({ children: '이메일과 비밀번호를 입력해주세요.' });
      return;
    }

    // 이메일만 비어 있는 경우
    if (!email) {
      setEmailError(true);
      addToast({ children: '이메일을 입력해주세요.' });
      return;
    }

    // 비밀번호만 비어 있는 경우
    if (!password) {
      setPasswordError(true);
      addToast({ children: '비밀번호를 입력해주세요.' });
      return;
    }

    try {
      const response = await api.post('/api/users/login', { email, password });

      if (response.status === 200) {
        addToast({ children: '로그인에 성공했습니다.' });
        navigate('/home');
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response) {
        const code = error.response.data?.code;
        const message = error.response.data?.message;
        // Case 1: 잘못된 이메일 또는 비밀번호를 입력하고 [로그인]_Btn 클릭
        if (code === 'USER-002') {
          if (message === '비밀번호가 올바르지 않습니다.') {
            // 비밀번호가 틀린 경우
            setPasswordError(true);
            addToast({ children: '잘못된 비밀번호입니다.' });
          } else {
            // 이메일 또는 비밀번호가 잘못된 경우
            setEmailError(true);
            setPasswordError(true);
            addToast({ children: '잘못된 이메일 또는 비밀번호입니다.' });
          }
        }
        // Case 4: 잘못된 이메일 형식 입력 후 [로그인]_Btn 클릭
        else if (code === 'VALUE-001') {
          setEmailError(true);
          setPasswordError(false);
          addToast({ children: '등록된 이메일이 아닙니다.' });
        }
        // Case 5: 잘못된 비밀번호 입력 후 [로그인]_Btn 클릭
        else if (code === 'USER-00') {
          setEmailError(false);
          setPasswordError(true);
          addToast({ children: '비밀번호가 올바르지 않습니다.' });
        } else {
          addToast({ children: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.' });
        }
      } else {
        addToast({ children: '서버에 연결할 수 없습니다. 인터넷 연결을 확인하세요.' });
      }
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    emailError,
    passwordError,
  };
}
