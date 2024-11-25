import Header from '../../../commons/components/Header';
import Container from '../../../commons/components/layout/Container';
import AuthInput from '../components/AuthInput';
import Button from '../../../commons/components/Button';
import PwdHide from '../components/icon/PwdHide';
import PwdOpen from '../components/icon/PwdOpen';
import { useSignupForm } from '../hooks/useSignupForm';

const SignUpButton = Button;

export default function SignupPage() {
  const {
    emailRegister,
    passwordRegister,
    ageCheckRegister,
    handleSubmit,
    errors,
    isPasswordVisible,
    togglePasswordVisibility,
    isValid,
    isDirty,
  } = useSignupForm();

  return (
    <>
      <Header title="회원가입" isBack />
      <Container>
        <div className="flex flex-col h-[calc(100vh-80px)]">
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col font-SUIT text-left">
              <div>
                <div className="text-24 font-extrabold leading-[31.2px] tracking-[-0.02em] mt-[30px] mb-[8px]">
                  반가워요!
                </div>
                <div className="text-12 font-medium leading-[18px] tracking-[-0.015em] text-gray-600">
                  가입을 위해 필요한 정보를 입력해 주세요
                </div>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="mt-16 space-y-6">
                  <div className="space-y-1">
                    <AuthInput
                      label="이메일"
                      placeholder="example@gmail.com"
                      error={!!errors.email}
                      {...emailRegister}
                    />
                    {errors.email && (
                      <p className="text-error text-12 font-medium mt-1 ml-2">
                        {typeof errors.email === 'string' ? errors.email : errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <AuthInput
                      label="비밀번호"
                      placeholder="영문, 숫자, 특문 중 2개 조합 8자 이상"
                      type={isPasswordVisible ? 'text' : 'password'}
                      error={!!errors.password}
                      {...passwordRegister}
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
                    {errors.password && (
                      <p className="text-error text-12 font-medium mt-1 ml-2">
                        {typeof errors.password === 'string'
                          ? errors.password
                          : errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="ageCheck"
                      className="w-4 h-4 accent-gray-800 cursor-pointer"
                      {...ageCheckRegister}
                    />
                    <label htmlFor="ageCheck" className="text-12 font-medium cursor-pointer">
                      <span className="text-error">(필수)</span>
                      <span> 만 14세 이상입니다.</span>
                    </label>
                  </div>
                  <div className="text-12 font-medium">
                    가입과 동시에 Emole의 이용약관과 개인정보 정책에 동의하는 것으로 간주됩니다.
                  </div>
                  {errors.ageCheck && (
                    <p className="text-error text-12 font-medium mt-1 ml-2">
                      {errors.ageCheck.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <SignUpButton
            type="submit"
            disabled={!isValid || !isDirty}
            className={`w-full h-12 mb-[30px] cursor-pointer ${
              isValid && isDirty ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            확인
          </SignUpButton>
        </div>
      </Container>
    </>
  );
}
