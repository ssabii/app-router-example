import { wait } from "@/lib/wait";

async function PostFeed() {
  await wait(3000);

  return (
    <div className='text-lg font-bold'>
      PostFeed
    </div>
  );
}

export default PostFeed;