import MenuIcon from '../../../icons/MenuIcon';

interface ServiceButtonProps {
  onClick?: () => void;
  service?: string;
  isMenu?: boolean;
}
export default function ServiceButton({ onClick, service, isMenu }: ServiceButtonProps) {
  return (
    <button onClick={onClick} className="absolute -translate-y-1/2 top-1/2 right-5">
      {isMenu ? <MenuIcon /> : <span className="font-semibold text-16 text-Accent">{service}</span>}
    </button>
  );
}
