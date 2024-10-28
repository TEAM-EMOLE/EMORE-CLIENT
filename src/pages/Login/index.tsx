import Header from '../../commons/components/Header';
import Container from '../../commons/components/layout/Container';
import AuthInputComponent from './components/AuthInputComponent/AuthInputComponent';
import Button from '../../commons/components/Button/index';
import PwdHide from './components/Icon/PwdHide';
import PwdOpen from './components/Icon/PwdOpen';
import KakaoLogin from './components/KakaoLogin';
import GoogleLogin from './components/GoogleLogin';
import { useLoginForm } from './hooks/useLoginForm';
import { useState, useRef } from 'react';

const LoginButton = Button;
const SignupButton = Button;

export default function LoginPage() {
  const { email, password, handleEmailChange, handlePasswordChange, handleSubmit } = useLoginForm();
  const formRef = useRef<HTMLDivElement>(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Header title="로그인" isBack />
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <Container>
          <div className="w-full mx-auto space-y-8 overflow-y-auto">
            {/* 이메일 및 비밀번호 입력 */}
            <div className="mt-16 space-y-6">
              <AuthInputComponent
                label="이메일"
                placeholder="example@gmail.com"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="text-sm placeholder:text-sm w-full"
              />
              <AuthInputComponent
                label="비밀번호"
                placeholder="영문, 숫자, 특문 중 2개 조합 8자 이상"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(value) => handlePasswordChange(value)}
                className="text-sm placeholder:text-sm w-full"
                icon={
                  <div onClick={togglePasswordVisibility} className="cursor-pointer">
                    {isPasswordVisible ? <PwdOpen /> : <PwdHide />}
                  </div>
                }
              />
            </div>

            {/* 비밀번호 찾기 */}
            <div className="text-center">
              <p className="font-suit text-base leading-5 tracking-tight text-gray-600">
                비밀번호를 잊어 버리셨나요?
              </p>
            </div>

            {/* 로그인 및 회원가입 버튼 */}
            <div className="space-y-4" ref={formRef}>
              <LoginButton
                onClick={handleSubmit}
                className="w-full h-12 rounded-lg bg-gray-800 text-white cursor-pointer"
              >
                로그인
              </LoginButton>
              <SignupButton
                onClick={handleSubmit}
                className="w-full h-12 rounded-lg bg-gray-800 text-white cursor-pointer"
              >
                이메일로 회원가입
              </SignupButton>
            </div>

            {/* 간편 로그인 구분선 */}
            <div className="flex items-center justify-center mt-8">
              <div className="w-16 border-t border-gray-200"></div>
              <span className="px-4 text-xs text-gray-400">간편 로그인</span>
              <div className="w-16 border-t border-gray-200"></div>
            </div>

            {/* 간편 로그인 버튼 */}
            <div className="flex items-center justify-center mt-5 space-x-4">
              <KakaoLogin />
              <GoogleLogin />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
