"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { getUserByUniversityId } from "./user.action";
import config from "../config";
import { profileFormSchema } from "../validations";
import { workflowClient } from "../workflow";

export const completeOnboarding = async (
  formData: z.infer<typeof profileFormSchema>
) => {
  const { userId } = await auth();
  if (!userId) return { message: "No Logged In User" };

  const client = await clerkClient();

  try {
    const existingUser = await getUserByUniversityId(formData.universityId);
    let user = null;
    if (!existingUser) {
      user = await db
        .insert(users)
        .values({
          universityId: Number(formData.universityId),
          universityCard: String(formData.universityCard),
        })
        .returning({ id: users.id });
      if (!user) {
        return { error: "Failed to create user" };
      }
    }
    const { id } = user?.[0] || existingUser!;
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        id,
      },
    });
    await workflowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
      body: {
        email: res.primaryEmailAddress?.emailAddress,
        firstName: res.firstName,
        lastName: res.lastName,
        universityId: formData.universityId,
      },
    });
    return { message: res.publicMetadata };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { error: "Failed to complete onboarding" };
  }
};
