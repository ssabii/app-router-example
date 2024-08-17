import { Suspense } from "react";

export default function ParallelRoutesLayout({
  children,
  articles,
  users,
}: {
  children: React.ReactNode;
  articles: React.ReactNode
  users: React.ReactNode;
}) {
  return (
    <section className="p-8">
      <h1 className="mb-4 text-3xl font-bold text-neutral-900">Parallel Routes Example</h1>
      <div className="flex flex-col gap-4">
        {children}
        {users}
        {articles}
      </div>
    </section>
  );
}