import { useNavigate } from 'react-router-dom';

const useGoBack = () => {
  const navigate = useNavigate();

  // 이전 페이지로 이동하는 함수
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return goBack;
};

export default useGoBack;
