import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "./user-profile";

export const Header = () => {
  return (
    <header className="mt-6 flex items-center justify-between px-5">
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
        <UserProfile />
      </div>
    </header>
  );
};
