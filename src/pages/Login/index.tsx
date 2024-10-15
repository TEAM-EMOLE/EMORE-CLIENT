import Header from '../../commons/components/Header';
import Container from '../../commons/components/layout/Container';
import AuthInputComponent from './components/AuthInputComponent/AuthInputComponent';
import Button from '../../commons/components/Button/index';
import { useLoginForm } from './hooks/useLoginForm';
import { useState, useEffect, useRef } from 'react';

const LoginButton = Button;

export default function LoginPage() {
    const {
      email,
      password,
      handleEmailChange,
      handlePasswordChange,
      handleSubmit, // 로그인 제출 핸들러
    } = useLoginForm();

    // 상태 변수와 set 함수 정의
    const [isFormValid, setFormValid] = useState(false); // 폼 유효성 상태
    const formRef = useRef<HTMLDivElement>(null);

    // 이메일 형식 유효성 검사
    const isEmailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // 패스워드 유효성 검사 (영문, 숫자, 특문 중 2개 조합 8자 이상)
    const isPasswordValid = (password: string) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]|.*[!@#$%^&*]).{8,}$/;
      return passwordRegex.test(password);
    };

    // 이메일 및 패스워드가 모두 유효한지 확인
    useEffect(() => {
      setFormValid(isEmailValid(email) && isPasswordValid(password));
    }, [email, password]);


    return (
      <>
        <Header title="로그인" isBack />
        <Container>
          <div className="mt-[60px] p-4 overflow-y-auto ">
            <AuthInputComponent
              label="이메일"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <AuthInputComponent
              label="비밀번호"
              placeholder="영문, 숫자, 특문 중 2개 조합 8자 이상"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mt-[30px] p-4 text-center">
            <p className="font-suit text-14 font-normal leading-[16.8px] tracking-[-0.01em] text-gray-600">
              비밀번호를 잊어 버리셨나요?
            </p>
          </div>

          <div className="mt-[30px] p-4" ref={formRef}>
          <LoginButton
            onClick={handleSubmit}
            disabled={!isFormValid} // 유효성 검사 통과 시에만 버튼 활성화
            className={`h-[50px] p-[15px_120px] gap-[10px] rounded-[12px] cursor 
              ${!isFormValid ? 'bg-gray-200 opacity-50 text-gray-500' : 'bg-gray-800 text-white'}`}
          >
            로그인
          </LoginButton>
          </div>
        </Container>
      </>
    );
  }