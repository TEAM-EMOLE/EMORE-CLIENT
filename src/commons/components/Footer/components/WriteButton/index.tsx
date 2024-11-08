import PlusIcon from "./PlusIcon";

interface BackButtonProps {
  onClick: () => void;
}
export default function WriteButton({ onClick }: BackButtonProps) {
  return (
    <button onClick={onClick} className="bg-black flex justify-center items-center rounded-full w-8 h-8">
    <PlusIcon />
    </button>
  );
}
