import Header from '../../commons/components/Header';
import Container from '../../commons/components/layout/Container';
import AuthInputComponent from './components/AuthInputComponent/AuthInputComponent';
import Button from '../../commons/components/Button/index';
import { useLoginForm } from './hooks/useLoginForm';
import { useState } from 'react';

const LoginButton = Button;

export default function LoginPage() {
    const {
      email,
      password,
      handleEmailChange,
      handlePasswordChange,
      handleSubmit, // 로그인 제출 핸들러
    } = useLoginForm();

    const [isFormClicked, setFormClicked] = useState(false); // 폼 클릭 상태

    // 폼이 클릭되었을 때 상태 업데이트
    const handleFocus = () => {
      setFormClicked(true); // 폼 중 하나라도 클릭되면 버튼 활성화
    };
  
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
              onFocus={handleFocus}
            />
            <AuthInputComponent
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handleFocus}
            />
          </div>

          <div className="mt-[30px] p-4 text-center">
            <p className="font-suit text-12 font-normal leading-[16.8px] tracking-[-0.01em]">
              비밀번호를 잊어 버리셨나요?
            </p>
          </div>

          <div className="mt-[30px] p-4">
          <LoginButton
            onClick={handleSubmit}
            disabled={!isFormClicked} // 폼이 클릭되었을 때만 활성화
            className={`h-[50px] p-[15px_120px] gap-[10px] rounded-[12px]
              ${!isFormClicked ? 'bg-[#E8E8E8] opacity-50' : 'bg-[#1E1E20] text-white'}`}
          >
            로그인
          </LoginButton>
          </div>
        </Container>
      </>
    );
  }