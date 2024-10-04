import BackIcon from '../../../icons/BackIcon';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button onClick={onClick} className="absolute top-1/2 left-[28px] -translate-y-1/2">
      <BackIcon />
    </button>
  );
}
