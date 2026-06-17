import { z } from "zod";
import mongoose from "mongoose";

// Helper to validate Mongoose ObjectIds
const ObjectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Mongoose ObjectId",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const CaseSchema = z.object({
  caseNumber: z.string().min(1, "Case number is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z
    .enum(["Open", "Under Review", "Closed", "Archived"])
    .default("Open"),
  classification: z
    .enum(["Unclassified", "Confidential", "Secret"])
    .default("Confidential"),
  assignedAnalysts: z.array(z.string()).default([]),
  targets: z.array(ObjectIdSchema).default([]),
  evidence: z.array(ObjectIdSchema).default([]),
});

// TypeScript type inferred from the Zod schema
export type TCase = z.infer<typeof CaseSchema>;
