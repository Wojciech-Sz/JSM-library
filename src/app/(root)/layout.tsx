import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

import Header from "@/components/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { sessionId } = await auth();
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header sessionId={sessionId} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
