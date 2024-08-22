import Spinner from "@/components/icons/Spinner";

export default function ArticlesLoading() {
  return (
    <div className="rounded-lg bg-sky-300 p-4 text-2xl text-gray-900 shadow-md">
      <Spinner className="mr-3 inline-block size-7 animate-spin" />
      Loading Articles...
    </div>
  );
}