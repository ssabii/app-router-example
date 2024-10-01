'use client';

import RightArrow from "@/components/icons/RightArrow";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks() {
  const pathname = usePathname();

  return (
    <header className="h-16 border border-b-gray-300 p-4">
      <ol className="flex items-center gap-1 fill-gray-500 text-lg font-bold text-gray-500">
        <li>
          <Link
            href="/dashboard"
            className={clsx({
              'hover:text-gray-700': pathname !== '/dashboard',
              'text-blue-700': pathname === '/dashboard',
            })}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <RightArrow className="fill-gray-500" />
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className={clsx({
              'hover:text-gray-700': pathname !== '/dashboard/settings',
              'text-blue-700': pathname === '/dashboard/settings',
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