type NavbarProps = {
    title: string;
  };
  
  export default function Navbar({ title }: NavbarProps) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="w-[600px] h-[48px] flex justify-center items-center">
          {title}
        </div>
      </div>
    );
  }