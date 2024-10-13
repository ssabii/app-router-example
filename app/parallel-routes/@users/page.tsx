import { wait } from "@/lib/wait";

export default async function UsersPage() {
  await wait(3000);

  return (
    <h2 className="rounded-lg bg-emerald-300 p-4 text-2xl text-gray-900 shadow-md">
      Users
    </h2>
  );
}