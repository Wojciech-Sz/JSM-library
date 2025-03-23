import { z } from "zod";

export const profileFormSchema = z.object({
  universityId: z.coerce
    .number()
    .nonnegative("University ID must be a positive number"),
  universityCard: z.string().nonempty("University Card is required"),
});
