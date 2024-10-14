export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <ul className="list-inside list-disc">
      {params.slug.map((value, index) => <li key={index}>{value}</li>)}
    </ul>
  );
}