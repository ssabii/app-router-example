import Footer from "./Footer";
import Header from "./Header";
import Todos from "./Todos";
import { Suspense } from "react";
import Spinner from "@/components/icons/Spinner";

function Page() {

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-64px)]">
        <Suspense fallback={<Spinner className="size-8 animate-spin" />}>
          <Todos />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Page;