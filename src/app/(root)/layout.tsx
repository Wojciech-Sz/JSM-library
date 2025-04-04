import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

import Header from "@/components/Header";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  if (!userId) {
    redirectToSignIn();
  } else if (!sessionClaims?.metadata.onboardingComplete) {
    redirect("/onboarding");
  }
  const clerkUser = await currentUser();
  const id = clerkUser?.publicMetadata?.id;

  after(async () => {
    if (!id) return;

    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, id));
  });
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header userId={userId} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
