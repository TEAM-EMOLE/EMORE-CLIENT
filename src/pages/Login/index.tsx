import Header from '../../commons/components/Header';
import Container from '../../commons/components/layout/Container';
import AuthInputComponent from './components/AuthInputComponent/AuthInputComponent';
import Button from '../../commons/components/Button/index';
import PwdHide from './components/Icon/PwdHide';
import PwdOpen from './components/Icon/PwdOpen';
import KakaoLogin from './components/KakaoLogin';
import GoogleLogin from './components/GoogleLogin';
import { useLoginForm } from './hooks/useLoginForm';
import { useValidation } from './hooks/useValidation';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = Button;

export default function LoginPage() {
    const {
      email,
      password,
      handleEmailChange,
      handlePasswordChange,
      handleSubmit, // 로그인 제출 핸들러
    } = useLoginForm();

    const isFormValid = useValidation(email, password); // 유효성 검사 훅 사용
    const formRef = useRef<HTMLDivElement>(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();


    // 비밀번호 표시/숨기기 토글 함수
    const togglePasswordVisibility = () => {
      if (password) setPasswordVisible((prev) => !prev);
    };

    const handleLoginSubmit = async () => {
      setErrorMessage(null); // 이전 오류 메시지 초기화
      try {
        await handleSubmit(); // 로그인 처리
        navigate('/dashboard'); // 로그인 성공 시 대시보드로 리다이렉트
      } catch (error) {
        setErrorMessage('로그인 실패. 이메일과 비밀번호를 확인하세요.'); // 오류 메시지 설정
      }
    };

    return (
      <>
        <Header title="로그인" isBack />
        <Container>
          <div className="mt-[60px] p-4 overflow-y-auto">
            <AuthInputComponent
              label="이메일"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="text-sm placeholder:text-sm"
            />
          <AuthInputComponent
            label="비밀번호"
            placeholder="영문, 숫자, 특문 중 2개 조합 8자 이상"
            type={isPasswordVisible ? 'text' : 'password'} // 비밀번호 표시/숨기기
            value={password}
            onChange={(value) => {
              handlePasswordChange(value);
              if (!value) setPasswordVisible(false); // 입력 값이 없으면 hide로 변경
            }}
            className="text-sm placeholder:text-sm"
            icon={
              <div
                onClick={password ? togglePasswordVisibility : undefined} // 입력 시에만 클릭 가능
                className={password ? 'cursor-pointer' : 'cursor-default'}
              >
                {password ? <PwdOpen /> : <PwdHide />}
              </div>
            }
            />
          </div>
  

          {/* 비밀번호 찾기 버튼 */}
          <div className="mt-[30px] p-4 text-center">
            <div className="font-suit text-14 font-normal leading-[16.8px] tracking-[-0.01em] text-gray-600">
              비밀번호를 잊어 버리셨나요? 
              <span>비밀번호 찾기</span>
            </div>
          </div>

            
          <div className="mt-[30px] p-4 space-y-[10px]" ref={formRef}>
          {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div> // 에러 메시지 표시
            )}
            
          <LoginButton
            onClick={handleLoginSubmit}
            disabled={!isFormValid} // 유효성 검사 통과 시에만 버튼 활성화
            className={`h-[50px] p-[15px_120px] gap-[10px] rounded-[12px] cursor 
              ${!isFormValid ? 'bg-gray-200 opacity-50 text-gray-500' : 'bg-gray-800 text-white'}`}
          >
            로그인
          </LoginButton>

            <LoginButton 
              onClick={() => navigate('/signup')} // 회원가입 페이지로 이동
              className={"h-[50px] p-[15px_120px] gap-[10px] rounded-[12px] cursor bg-gray-800 text-white"}
            >

            이메일로 회원가입
            </LoginButton> 
          </div>

          {/* 간편 로그인 */}
          <div className="flex items-center justify-center mt-[30px]">
              <div className="w-[68px] border-t border-gray-200"></div>
                <span className="px-4 text-10 text-gray-400">간편 로그인</span>
              <div className="w-[68px] border-t border-gray-200"></div>
          </div>

          <div className="flex items-center justify-center mt-[20px] space-x-[10px]">
          <KakaoLogin />
          <GoogleLogin />
          </div>
          
        </Container>
      </>
    );
  }