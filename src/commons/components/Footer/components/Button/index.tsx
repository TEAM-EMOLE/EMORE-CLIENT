interface ButtonProps {
  isDisabled?: boolean;
  text: string;
  onClick: () => void;
}

export default function Button({ isDisabled, text, onClick }: ButtonProps) {
  return (
    <button
      className={`flex flex-col justify-center items-center ${isDisabled ? "text-gray-400 cursor-not-allowed" : "text-black"} text-11`}
      onClick={() => !isDisabled && onClick()}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}