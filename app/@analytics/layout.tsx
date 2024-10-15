import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-96">
      <nav className="flex h-10 items-center gap-4">
        <Link
          href="/page-views"
          className="text-lg font-bold text-gray-500"
        >
          Page Views
        </Link>
        <Link
          href="/visitors"
          className="text-lg font-bold text-gray-500"
        >
          Visitors
        </Link>
      </nav>
      {children}
    </div>
  );
}