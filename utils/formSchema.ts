import { z } from "zod";

export const schema = z.object({
  name: z.string().trim().min(1, {
    message: " name is required.",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required.",
  }),
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
});
