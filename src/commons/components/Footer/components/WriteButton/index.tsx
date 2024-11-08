interface BackButtonProps {
  onClick: () => void;
}
export default function WriteButton({ onClick }: BackButtonProps) {
  return (
    <button onClick={onClick} className="bg-black flex justify-center items-center rounded-full w-10 h-10">
    </button>
  );
}
