import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={100}
          height={30}
          alt="Logo da Food App"
          unoptimized
        />
      </Link>
      <div>
        <Menu />
      </div>
    </header>
  );
};
