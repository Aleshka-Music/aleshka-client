import { z } from "zod";

// PASSWORD
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(20, { message: "Password must be less than or equal to 20 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" });

// USERNAME
const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(30, { message: "Username must be less than or equal to 30 characters" })
  .regex(/^[a-zA-Z0-9._]+$/, {
    message:
      "Username can only contain letters, numbers, periods, and underscores",
  })
  .regex(/^(?!.*[.]{2,}).*$/, {
    message: "Username cannot contain consecutive periods",
  });

// NAME
const firstNameSchema = z
  .string()
  .min(1, { message: "Name is required" })
  .max(50, { message: "Name is too long" })
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
    message:
      "The name can only contain letters, spaces, hyphens and apostrophes.",
  });

// LAST NAME
const lastNameSchema = z
  .string()
  .min(1, { message: "Name is required" })
  .max(50, { message: "Name is too long" })
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
    message:
      "The name can only contain letters, spaces, hyphens and apostrophes.",
  });

// BIRTHDATE
const birthDateSchema = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), "Must be a valid date")
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate <= today;
    },
    { message: "Birth date cannot be in the future" }
  )
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age > 16;
      }
      return age >= 16;
    },
    { message: "You must be at least 16 years old" }
  );

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
