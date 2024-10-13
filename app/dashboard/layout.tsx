import Link from "next/link";
import NavLinks from "./NavLinks";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavLinks />
      <section className="h-[calc(100vh-128px)] p-4">
        {children}
      </section>
      <Footer />
    </>
  );
}