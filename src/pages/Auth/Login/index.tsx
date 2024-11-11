import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../commons/components/Header';
import Container from '../../../commons/components/layout/Container';
import AuthInput from '../components/AuthInput';
import Button from '../../../commons/components/Button';
import PwdHide from '../components/icon/PwdHide';
import PwdOpen from '../components/icon/PwdOpen';
import Google from '../components/AuthSocial/Google';
import Kakao from '../components/AuthSocial/Kakao';
import { useLoginForm } from '../hooks/useForm';

const LoginButton = Button;
const SignupButton = Button;

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    emailError,
    passwordError,
  } = useLoginForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onLoginClick = async () => {
    await handleSubmit();
  };

  const onSignupClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <Header title="로그인" isBack />
      <Container>
        <div className="w-full mx-auto space-y-8 overflow-y-auto">
          {/* 이메일 및 비밀번호 입력 */}
          <div className="mt-16 space-y-6">
            <AuthInput
              label="이메일"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            <AuthInput
              label="비밀번호"
              placeholder="영문, 숫자, 특문 중 2개 조합 8자 이상"
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="text-sm placeholder:text-sm w-full"
              error={passwordError}
              icon={
                <div
                  role="button"
                  tabIndex={0}
                  onClick={togglePasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      togglePasswordVisibility();
                    }
                  }}
                  className="cursor-pointer"
                >
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
          <div className="space-y-4">
            <LoginButton
              onClick={onLoginClick}
              className="w-full h-12 bg-gray-800 text-white cursor-pointer"
            >
              로그인
            </LoginButton>

            <SignupButton
              onClick={onSignupClick}
              className="w-full h-12 bg-white !text-black cursor-pointer border border-gray-300"
            >
              이메일로 회원가입
            </SignupButton>
          </div>

          {/* 간편 로그인 구분선 */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-16 border-t border-gray-200" />
            <span className="px-4 text-xs text-gray-400">간편 로그인</span>
            <div className="w-16 border-t border-gray-200" />
          </div>

          {/* 간편 로그인 버튼 */}
          <div className="flex items-center justify-center mt-5 space-x-4">
            <Kakao />
            <Google />
          </div>
        </div>
      </Container>
    </>
  );
}