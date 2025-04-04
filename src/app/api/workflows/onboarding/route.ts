import { serve } from "@upstash/workflow/nextjs";

import { getUserByUniversityId } from "@/lib/actions/user.action";
import { sendEmail } from "@/lib/workflow";

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (universityId: number): Promise<UserState> => {
  const user = await getUserByUniversityId(universityId);

  if (!user) return "non-active";

  const lastActive = new Date(user.lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActive.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, firstName, lastName, universityId } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to the platform",
      message: `Welcome ${firstName} ${lastName}`,
    });
  });

  await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(universityId);
    });
    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you still there",
          message: `hey ${firstName} ${lastName} We miss you`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back!",
          message: `Welcome back ${firstName} ${lastName}`,
        });
      });
    }

    await context.sleep("wait-for-1-month", THIRTY_DAYS_IN_MS);
  }
});
