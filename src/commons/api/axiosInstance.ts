import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import Cookies from 'js-cookie';

// 타입 정의
interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
  code?: string;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// CookieAttributes 타입 정의
interface CookieAttributes {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

// 상수 정의
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

const COOKIE_CONFIG: CookieAttributes = {
  expires: 30,
  secure: true,
  sameSite: 'strict',
  path: '/',
} as const;

// 토큰 관리 유틸리티
const TokenService = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },
  getRefreshToken: () => Cookies.get('refreshToken'),
  setRefreshToken: (token: string) => {
    Cookies.set('refreshToken', token, COOKIE_CONFIG);
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    Cookies.remove('refreshToken', { path: '/' });
  },
};

// axios 인스턴스 생성
const axiosIns = axios.create(API_CONFIG);

// 로그아웃 처리
const handleLogout = () => {
  TokenService.clearTokens();
  window.location.href = '/login';
};

// 토큰 갱신
const refreshTokens = async (): Promise<string | null> => {
  try {
    const refreshToken = TokenService.getRefreshToken();
    if (!refreshToken) {
      handleLogout();
      throw new Error('No refresh token');
    }

    const response = await axiosIns.post<TokenResponse>(
      '/api/users/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (response.status === 200 && response.data.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      TokenService.setAccessToken(accessToken);
      TokenService.setRefreshToken(newRefreshToken);
      return accessToken;
    }
    handleLogout();
    return null;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as { message?: string };
      if (errorData.message === 'refresh token expired') {
        handleLogout();
      }
    }
    throw error;
  }
};

// 요청 인터셉터
axiosIns.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = TokenService.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터
axiosIns.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshTokens();
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosIns(originalRequest);
        }
        handleLogout();
        return Promise.reject(error);
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    if (isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as { message?: string };
      console.error('API Error:', errorData.message || error.message);
    }

    return Promise.reject(error);
  }
);

export { TokenService, axiosIns as default };
