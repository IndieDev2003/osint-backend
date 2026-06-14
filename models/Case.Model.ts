import mongoose, { Document, Schema } from "mongoose";

export interface ICase extends Document {
  caseNumber: string; // Unique Operation ID (e.g., CASE-ALPHA-99)
  title: string;
  description: string;
  status: "Open" | "Under Review" | "Closed" | "Archived";
  classification: "Unclassified" | "Confidential" | "Secret";
  assignedAnalysts: string[]; // Names or UserIDs of your team members
  targets: mongoose.Types.ObjectId[]; // References to the Person model
  evidence: mongoose.Types.ObjectId[]; // References to the Evidence model
}

const CaseSchema = new Schema<ICase>({
    caseNumber: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "Under Review", "Closed", "Archived"],
      default: "Open",
      index: true,
    },
    classification: {
      type: String,
      enum: ["Unclassified", "Confidential", "Secret"],
      default: "Confidential",
    },
    targets: [{ type: Schema.Types.ObjectId, ref: "Person", default: [] }],
    evidence: [{ type: Schema.Types.ObjectId, ref: "Evidence", default: [] }],
  },
  { timestamps: true },
);

export const Case = mongoose.model<ICase>("Case", CaseSchema);
