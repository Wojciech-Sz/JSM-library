"use server";

import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
  const Auth = await auth();
  if (!Auth.userId) {
    return null;
  }
  return Auth;
};
