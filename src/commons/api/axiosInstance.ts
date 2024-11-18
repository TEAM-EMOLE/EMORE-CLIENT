import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL;

interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
  code?: string;
}

const axiosIns = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 액세스 토큰 가져오기
const getAccessToken = () => localStorage.getItem('accessToken');

// 로그아웃 처리 함수
const handleLogout = () => {
  localStorage.removeItem('accessToken');
  Cookies.remove('refreshToken', { path: '/' });
  window.location.href = '/login';
};

// 리프레시 토큰으로 새 토큰 발급받기
const refreshTokens = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
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
      localStorage.setItem('accessToken', accessToken);
      Cookies.set('refreshToken', newRefreshToken, {
        expires: 30,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      return accessToken;
    }
    handleLogout();
    return null;
  } catch (error) {
    if (isAxiosError<TokenResponse>(error)) {
      if (error.response?.data?.message === 'refresh token expired') {
        handleLogout();
      }
    }
    throw error;
  }
};

// 요청 인터셉터
axiosIns.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosIns.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러이고 재시도하지 않은 요청인 경우
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

    // 기타 에러 처리
    if (isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.message || error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosIns;
