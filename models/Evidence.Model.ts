import mongoose, { Document, Schema } from "mongoose";

export interface IEvidence extends Document {
  evidenceId: string; // Custom tracking ID (e.g., EV-2026-004)
  type: string; // "Social Media Post", "Crypto Transaction", "Data Breach Row", "IP Log"
  title: string;
  description?: string;
  mediaUrls: string[]; // Links to stored files/screenshots (S3 buckets, etc.)
  rawPayload?: string; // Raw JSON/Text data dumped from the OSINT tool
  sourceUrl?: string; // Original link where the intel was found
  capturedAt: Date;
  confidenceScore: number; // 1 to 5
}

const EvidenceSchema = new Schema<IEvidence>(
  {
    evidenceId: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    mediaUrls: { type: [String], default: [] },
    rawPayload: { type: String },
    sourceUrl: { type: String },
    capturedAt: { type: Date, default: Date.now, required: true },
    confidenceScore: { type: Number, min: 1, max: 5, default: 3 },
  },
  { timestamps: true },
);

export const Evidence = mongoose.model<IEvidence>("Evidence", EvidenceSchema);
