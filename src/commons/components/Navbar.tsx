type NavbarProps = {
    title: string;
  };
  
 export default function Navbar({ title }: NavbarProps) {
    return (
      <div className="flex justify-center items-center w-full h-full">
          <div className="h-[48px]">
          {title}
          </div>
        </div>
    );
  }