import { Menu } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <Image
        src="/logo.svg"
        width={100}
        height={30}
        alt="Logo da Food App"
        unoptimized
      />
      <div>
        <Menu />
      </div>
    </header>
  );
};
