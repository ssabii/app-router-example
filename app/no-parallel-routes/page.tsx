import Spinner from "@/components/icons/Spinner";
import { wait } from "@/lib/wait";
import { Suspense } from "react";

export default function NoParallelRoutePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Suspense fallback={<UsersLoading />}>
        <Users />
      </Suspense>
      <Suspense fallback={<ArticlesLoading />}>
        <Articles />
      </Suspense>
    </div>
  );
}

const usersStyles = 'rounded-lg bg-pink-300 p-4 text-2xl text-gray-900 shadow-md';

async function Users() {
  await wait(3000);
  return <h2 className={usersStyles}>
    Users
  </h2>
}

function UsersLoading() {
  return <div className={usersStyles}>
    <Spinner className="mr-3 inline-block size-7 animate-spin" />
    Loading Users...
  </div>
}

const articlesStyles = 'rounded-lg bg-sky-300 p-4 text-2xl text-gray-900 shadow-md';

async function Articles() {
  await wait(5000);
  return <h2 className={articlesStyles}>
    Articles
  </h2>
}

function ArticlesLoading() {
  return <div className={articlesStyles}>
    <Spinner className="mr-3 inline-block size-7 animate-spin" />
    Loading Articles...
  </div>
}