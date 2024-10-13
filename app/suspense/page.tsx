import { Suspense } from "react";
import PostFeed from "./PostFeed";
import Weather from "./Weather";

export default function Page() {
  return (
    <div className="flex gap-4">
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </div>
  );
}