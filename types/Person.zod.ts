import { z } from "zod";

// MongoDB ObjectId regex validator
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const PhoneNumberZodSchema = z.object({
  countryCode: z.number().optional(),
  number: z.number().optional(),
});

export const AddressZodSchema = z.object({
  streetAddress: z.string().optional(),
  cityName: z.string().optional(),
  districtName: z.string().optional(),
  pinCode: z.number().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const EducationZodSchema = z.object({
  degreeType: z.string().optional(),
  major: z.string().optional(),
  institution: z.string().optional(),
  graduationYear: z.number().optional(),
});

export const PersonNoteZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const VehicleZodSchema = z.object({
  company: z.string().optional(),
  model: z.string().optional(),
  description: z.string().optional(),
  registraionNumber: z.string().optional(), // Preserved your exact typo from the interface
});

export const AccountZodSchema = z.object({
  service: z.string().optional(),
  url: z.url().optional(), // Validates it's a proper URL format if provided
  active: z.boolean().optional(),
});

// --- Main Person Schema ---

export const PersonZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be 3 in length")
    .max(25, "Name must be less than 25 in length"),
  dob: z.number().optional(),
  age: z.number().optional(),
  email: z.email().optional(), // Validates email format if provided
  phone: z.array(PhoneNumberZodSchema),
  address: z.array(AddressZodSchema),
  study: z.array(EducationZodSchema),
  note: z.array(PersonNoteZodSchema),
  vehicle: z.array(VehicleZodSchema),
  account: z.array(AccountZodSchema),
  relatives: z.array(objectIdSchema),
  associatedEvidence: z.array(objectIdSchema),
});

// Infers the TypeScript type from the Zod schema (excluding Mongoose Document overhead)
export type TPersonInput = z.infer<typeof PersonZodSchema>;
