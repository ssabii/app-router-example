export default function Page({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) {
    return <div>slug undefined</div>
  }

  return (
    <ul className="list-inside list-disc">
      {params.slug.map((value, index) => <li key={index}>{value}</li>)}
    </ul>
  );
}