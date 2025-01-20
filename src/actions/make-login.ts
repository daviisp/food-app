"use server";

import { signIn } from "@/lib/auth";

export const authByGoogle = async () => {
  await signIn("google");
};
