import Spinner from "@/components/icons/Spinner";
import { wait } from "@/lib/wait";
import { Suspense } from "react";

export default async function NoParallelRoutePage() {
  await wait(1000);

  return (
    <h2 className="rounded-lg bg-pink-300 p-4 text-2xl text-gray-900 shadow-md">
      Dashboard
    </h2>
  );
}
