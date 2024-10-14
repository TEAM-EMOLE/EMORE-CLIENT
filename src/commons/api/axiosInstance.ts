import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Axios 인스턴스 생성
const axiosIns = axios.create({
  baseURL: apiUrl, // 기본 API URL 설정
  timeout: 10000, // 요청 타임아웃 시간 설정 (10초)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
axiosIns.interceptors.request.use(
  (config) => {
    // 요청이 서버로 보내지기 전에 실행됩니다.
    const token = localStorage.getItem('token'); // 예: 토큰을 로컬 스토리지에서 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 발생했을 때 실행됩니다.
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosIns.interceptors.response.use(
  (response) => {
    // 응답 데이터를 변환하거나 그대로 반환합니다.
    return response;
  },
  (error) => {
    // 응답에서 오류가 발생했을 때 실행됩니다.
    if (error.response?.status === 401) {
      // 예: 인증 오류(401)가 발생한 경우 로그아웃 처리 등
      console.error('Authentication error. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default axiosIns;
