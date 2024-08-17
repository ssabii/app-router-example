import { wait } from "@/lib/wait";

export default async function ArticlesPage() {
  await wait(5000);

  return (
    <h2 className='rounded-lg bg-sky-300 p-4 text-2xl text-gray-900 shadow-md'>
      Articles
    </h2>
  )
}