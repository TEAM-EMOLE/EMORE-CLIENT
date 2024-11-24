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
  } = useForm<LoginFormInputs>({
    mode: 'onSubmit',
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

  const onSubmit = async (data: LoginFormInputs) => {
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
            addToast({
              children:
                error.response.data?.message === '비밀번호가 올바르지 않습니다.'
                  ? '잘못된 비밀번호입니다.'
                  : '잘못된 이메일 또는 비밀번호입니다.',
            });
            break;
          case 'VALUE-001':
            addToast({ children: '등록된 이메일이 아닙니다.' });
            break;
          default:
            addToast({ children: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.' });
        }
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPasswordVisible,
    togglePasswordVisibility,
    handleFocusError,
  };
};
