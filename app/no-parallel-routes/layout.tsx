export default function NoParallelRoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-8">
      <h1 className="mb-4 text-3xl text-neutral-900">No Parallel Routes Example</h1>
      {children}
    </section>
  );
}