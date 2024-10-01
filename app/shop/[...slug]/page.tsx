export default function Page({ params }: { params: { slug: string[] } }) {

  return (
    <ul>
      {params.slug.map((segment, index) => (
        <li key={segment}>{segment}</li>
      ))}
    </ul>
  )
}