import Link from "next/link";

function NavLinks() {
  return (
    <header className="h-16 border border-b-gray-300 p-4">
      <ol className="flex items-center gap-1 fill-gray-500 text-lg font-bold text-gray-500">
        <li>
          <Link
            href="/dashboard"
            className='hover:text-gray-700'
          >
            dashboard
          </Link>
        </li>
      </ol>
    </header>
  );
}

export default NavLinks;