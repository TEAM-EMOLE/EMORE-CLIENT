
interface NavbarProps {
  title: string;
  isBack?: boolean;
  service?: string;
  isMenu?: boolean;
  serviceClick?: () => void;
}

const Footer = () => {
  return (
    <div className="w-full h-[48px] flex justify-center items-center relative border-b border-[rgba(249, 249, 249, 0.8)]">
      footer
    </div>
  );
}

export default Footer;