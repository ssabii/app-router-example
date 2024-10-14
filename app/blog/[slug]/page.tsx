export async function generateStaticParams() {
  const posts = [1, 2, 3]

  return posts.map((post) => ({
    slug: post,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>My Post: {params.slug}</div>
  );
}