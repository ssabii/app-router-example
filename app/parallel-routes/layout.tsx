export default function ParallelRoutesLayout({
  children,
  articles,
  users,
  login,
}: {
  children: React.ReactNode;
  articles: React.ReactNode
  users: React.ReactNode;
  login: React.ReactNode;
}) {
  const isLoggedIn = false

  if (!isLoggedIn) {
    return login;
  }

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