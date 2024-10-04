import useGoBack from '../../hooks/useGoBack';
import BackButton from './components/BackButton';

interface NavbarProps {
  title: string;
  isBack?: boolean;
}

export default function Header({ title, isBack }: NavbarProps) {
  return (
    <div className="w-full h-[48px] flex justify-center items-center relative border-b border-[rgba(249, 249, 249, 0.8)]">
      {isBack && <BackButton onClick={useGoBack} />}
      {title}
    </div>
  );
}
