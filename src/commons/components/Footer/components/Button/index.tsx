import { ReactNode } from 'react'; // 반드시 React를 import 하세요

interface ButtonProps {
  isDisabled?: boolean;
  text: string;
  onClick: () => void;
  icon?: ReactNode;
}

export default function Button({ isDisabled, text, onClick, icon }: ButtonProps) {
  return (
    <button
      className={`flex flex-col justify-center items-center ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-black'} text-11`}
      onClick={() => !isDisabled && onClick()}
      disabled={isDisabled}
    >
      {icon && <div>{icon}</div>}
      {text}
    </button>
  );
}
