'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightArrow from "./icons/RightArrow";

function NavLinks() {
  const pathname = usePathname();

  return (
    <header className="h-16 border border-b-gray-300 p-4">
      <ol className="flex items-center gap-1 fill-gray-500 text-lg font-bold text-gray-500">
        <li>
          <Link
            href="/"
            className={clsx({
              'hover:text-gray-700': pathname !== '/',
              'text-blue-700': pathname === '/',
            })}
          >
            Home
          </Link>
        </li>
        <li>
          <RightArrow className="fill-gray-500" />
        </li>
        <li>
          <Link
            href="/settings"
            className={clsx({
              'hover:text-gray-700': pathname !== '/settings',
              'text-blue-700': pathname === '/settings',
            })}
          >
            Settings
          </Link>
        </li>
      </ol>
    </header>
  );
}

export default NavLinks;