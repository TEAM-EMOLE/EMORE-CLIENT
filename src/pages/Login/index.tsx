import Header from '../../commons/components/Header';
import Container from '../../commons/components/layout/Container';
import AuthInputComponent from './components/AuthInputComponent/AuthInputComponent';
import Button from '../../commons/components/Button/index';
import KakaoLogin from './components/KakaoLogin';
import GoogleLogin from './components/GoogleLogin';
import { useLoginForm } from './hooks/useLoginForm';
import { useValidation } from './hooks/useValidation';
import { useRef } from 'react';

const LoginButton = Button;
const SinupButton = Button;

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
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="text-sm placeholder:text-sm"
            />
          </div>

          <div className="mt-[30px] p-4 text-center">
            <p className="font-suit text-14 font-normal leading-[16.8px] tracking-[-0.01em] text-gray-600">
              비밀번호를 잊어 버리셨나요?
            </p>
          </div>

          {/* 로그인 버튼 */}
          <div className="mt-[30px] p-4 space-y-[10px]" ref={formRef}>
          <LoginButton
            onClick={handleSubmit}
            disabled={!isFormValid} // 유효성 검사 통과 시에만 버튼 활성화
            className={`h-[50px] p-[15px_120px] gap-[10px] rounded-[12px] cursor 
              ${!isFormValid ? 'bg-gray-200 opacity-50 text-gray-500' : 'bg-gray-800 text-white'}`}
          >
            로그인
          </LoginButton>

          {/* 회원가입 버튼 */}
            <SinupButton 
              onClick={handleSubmit}
              className={"h-[50px] p-[15px_120px] gap-[10px] rounded-[12px] cursor bg-gray-800 text-white"}
            
            >
            이메일로 회원가입
            </SinupButton> 
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