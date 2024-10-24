import useGoBack from '../../hooks/useGoBack';
import BackButton from './components/BackButton';
import ServiceButton from './components/ServiceButton';

interface NavbarProps {
  title: string;
  isBack?: boolean;
  service?: string;
  isMenu?: boolean;
  serviceClick?: () => void;
}

export default function Header({ title, isBack, service, isMenu, serviceClick }: NavbarProps) {
  const goBack = useGoBack();

  return (
    <div className="w-full h-headerHeigth flex justify-center items-center relative border-b border-[rgba(249, 249, 249, 0.8)]">
      {isBack && <BackButton onClick={goBack} />}
      {title}
      {(service || isMenu) && (
        <ServiceButton onClick={serviceClick} service={service} isMenu={isMenu} />
      )}
    </div>
  );
}
