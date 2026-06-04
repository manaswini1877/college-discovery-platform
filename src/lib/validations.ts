import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const compareSchema = z.object({
  collegeIds: z
    .array(z.string().uuid("Invalid college ID format"))
    .min(2, "Select at least 2 colleges to compare")
    .max(3, "You can compare a maximum of 3 colleges"),
})

export const favoriteSchema = z.object({
  collegeId: z.string().uuid("Invalid college ID format"),
})

export const predictorSchema = z.object({
  exam: z.enum([
    "JEE Advanced",
    "JEE Main",
    "AP EAPCET",
    "TS EAPCET",
    "MHT CET",
    "KCET",
  ], {
    message: "Please select a valid exam",
  }),
  rank: z.coerce.number().positive("Rank must be a positive number"),
  category: z.enum([
    "General",
    "OBC",
    "SC",
    "ST",
    "EWS",
    "BC-A",
    "BC-B",
    "GM",
  ], {
    message: "Please select a valid category",
  }),
  state: z.string().optional().or(z.literal("")),
})
