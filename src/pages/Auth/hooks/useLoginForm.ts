import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import api, { TokenService } from '../../../commons/api/axiosInstance';
import { useBottomToastStore } from '../../../commons/components/BottomToastList/stores/useBottomToastStore';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface ApiResponse {
  message?: string;
  code?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export const useLoginForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const addToast = useBottomToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleFocusError = (fieldError?: { message?: string }) => {
    if (fieldError?.message) {
      addToast({ children: fieldError.message });
    }
  };

  const emailRegister = register('email', {
    required: '이메일을 입력해 주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  });

  const passwordRegister = register('password', {
    required: '비밀번호를 입력해 주세요.',
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상이어야 합니다.',
    },
  });

  const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
    const { email, password } = data;

    if (!email || !password) {
      if (!email && !password) {
        addToast({ children: '이메일 및 비밀번호를 입력해 주세요.' });
      } else if (!email) {
        addToast({ children: '이메일을 입력해 주세요.' });
      } else {
        addToast({ children: '비밀번호를 입력해 주세요.' });
      }
      return;
    }

    try {
      const response = await api.post<ApiResponse>('/api/users/login', data);
      if (response.status === 200 && response.data.data) {
        const { accessToken, refreshToken } = response.data.data;
        TokenService.setAccessToken(accessToken);
        TokenService.setRefreshToken(refreshToken);
        addToast({ children: '로그인에 성공했습니다.' });
      }
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      if (error.response) {
        const code = error.response.data?.code;
        switch (code) {
          case 'USER-002':
          case 'USER-014':
          case 'VALUE-001':
            setError('email', { type: 'manual' });
            setError('password', { type: 'manual' });
            addToast({ children: '잘못된 이메일 또는 비밀번호입니다.' });
            break;
          default:
            addToast({ children: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.' });
        }
      }
    }
  });

  return {
    emailRegister,
    passwordRegister,
    handleSubmit: onSubmit,
    errors,
    isPasswordVisible,
    togglePasswordVisibility,
    handleFocusError,
  };
};
