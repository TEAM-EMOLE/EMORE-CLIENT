import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import api, { TokenService } from '../../../commons/api/axiosInstance';

interface SignupFormInputs {
  email: string;
  password: string;
  ageCheck: boolean;
}

interface ApiResponse {
  message?: string;
  code?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export const useSignupForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [serverErrors, setServerErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
  } = useForm<SignupFormInputs>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      ageCheck: false,
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) return '최소 8자 이상이어야 합니다.';

    let containsCount = 0;
    if (/[A-Za-z]/.test(value)) containsCount++; // 영문 포함
    if (/\d/.test(value)) containsCount++; // 숫자 포함
    if (/[@$!%*#?&]/.test(value)) containsCount++; // 특수문자 포함

    if (containsCount < 2) {
      return '영문, 숫자, 특수문자 중 2가지 이상 포함해야 합니다.';
    }

    return true;
  };

  const emailRegister = register('email', {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '입력하신 이메일이 형식에 맞지 않습니다. 다시 입력해 주세요.',
    },
    onChange: () => {
      if (serverErrors.email) {
        setServerErrors((prev) => ({ ...prev, email: undefined }));
      }
    },
  });
  const passwordRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    validate: validatePassword,
    onChange: () => {
      if (serverErrors.password) {
        setServerErrors((prev) => ({ ...prev, password: undefined }));
      }
    },
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await api.post<ApiResponse>('/api/users', data);

      if (response.status === 200 && response.data.data) {
        const { accessToken, refreshToken } = response.data.data;
        TokenService.setAccessToken(accessToken);
        TokenService.setRefreshToken(refreshToken);
      }
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      if (error.response) {
        const code = error.response.data?.code;

        switch (code) {
          case 'USER-005':
            setError('password', {
              type: 'server',
              message: '비밀번호 형식이 맞지 않습니다.',
            });
            break;
          case 'USER-012':
            setError('email', {
              type: 'server',
              message: '이미 사용 중인 이메일입니다.',
            });
            break;
          default:
            setError('root', {
              type: 'server',
              message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
            });
        }
      }
    }
  };

  const ageCheckRegister = register('ageCheck', {
    required: '만 14세 이상 동의가 필요합니다.',
  });

  return {
    register,
    emailRegister,
    passwordRegister,
    ageCheckRegister,
    handleSubmit: handleSubmit(onSubmit),
    errors: { ...errors, ...serverErrors },
    isPasswordVisible,
    togglePasswordVisibility,
    isValid,
    isDirty,
  };
};
