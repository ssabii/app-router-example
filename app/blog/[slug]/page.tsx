export async function generateStaticParams() {
  const posts = [{ slug: '1', }, { slug: '2', }, { slug: '3', }];

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}