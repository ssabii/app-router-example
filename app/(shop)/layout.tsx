import Link from "next/link";
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header className="flex gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-500"
          >
            home
          </Link>
          <Link
            href="/blog"
            className="text-2xl font-bold text-blue-500"
          >
            blog
          </Link>
          <Link
            href="/about"
            className="text-2xl font-bold text-blue-500"
          >
            about
          </Link>
          <Link
            href="/account"
            className="text-2xl font-bold text-purple-500"
          >
            account
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}