import BackIcon from '../../../icons/BackIcon';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button onClick={onClick} className="absolute -translate-y-1/2 top-1/2 left-5">
      <BackIcon />
    </button>
  );
}
