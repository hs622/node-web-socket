import z, { string } from "zod";

export const getUserObj = z.object({
  id: z.string(),
});

export const userCreateObj = z.object({
  firstName: z.string().trim().nonempty("First name is required."),
  lastName: z.string().trim().optional(),
  email: z.string().trim().nonempty("Email is required."),
  username: z.string().trim().nonempty("Username is required."),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>\/?\\|`~]).{8,}$/,
      "Password must include upper, lower, number and special character"
    ).nonempty("Password is required."),
  gender: z.literal(["Male", "Female", "Other"]).optional(),
});

export const userProfileObj = z.object({
  firstName: z.string().trim().nonempty("first name is required."),
  lastName: z.string().trim().optional(),
  dob: z.date().optional(),
  gender: z.literal(["Male", "Female", "Other"]).optional(),
  avatar: z.url().optional()
});

export type GetUserObj = z.infer<typeof getUserObj>;
export type UserCreateObj = z.infer<typeof userCreateObj>;
export type UserProfileObj = z.infer<typeof userProfileObj>;
