/** Button 컴포넌트
 * 생성 날짜: 2024-10-14
 * 생성자: 문다예
 * 설명: 공통적으로 사용할 수 있는 버튼 컴포넌트
 * 상황: 프로젝트에서 다양한 페이지에 재사용 가능한 버튼을 만들기 위해 개발
 */


interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  children: React.ReactNode; // 버튼의 내부 텍스트, 요소들
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-[50px] px-4 py-2 bg-Gray-800 text-white font-semibold rounded-[12px] disabled:bg-Gray-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
