import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(30, { message: "Username must be less than or equal to 30 characters" })
  .regex(/^[a-zA-Z0-9._]+$/, {
    message: "Username can only contain letters, numbers, periods, and underscores",
  })
  .regex(/^(?!.*[.]{2,}).*$/, {
    message: "Username cannot contain consecutive periods",
  });

const birthDateSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: "Invalid date format",
  })
  .refine((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return date <= now; // Ensures the date is not in the future
  }, { message: "Birth date cannot be in the future" });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(20, { message: "Password must be less than or equal to 20 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/\d/, { message: "Password must contain at least one number" })

const firstNameSchema = z
  .string()
  .min(1, { message: "First name is required" })
  .max(30, { message: "First name must be less than or equal to 30 characters" });

const lastNameSchema = z
  .string()
  .min(1, { message: "Last name is required" })
  .max(30, { message: "Last name must be less than or equal to 30 characters" });


export const FormDataSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    userName: usernameSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    birthDate: birthDateSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
