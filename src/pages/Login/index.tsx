import Header from '../../commons/components/Header';
import Container from '../../commons/components/layout/Container';
import AuthInputComponent from './components/AuthInputComponent/AuthInputComponent';
import { useLoginForm } from './hooks/useLoginForm';

export default function LoginPage() {
    const {
      email,
      password,
      handleEmailChange,
      handlePasswordChange,
    } = useLoginForm();
  
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
            />
            <AuthInputComponent
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </Container>
      </>
    );
  }