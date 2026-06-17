export type CaseStatus = "Open" | "Under Review" | "Closed" | "Archived";
export type CaseClassification = "Unclassified" | "Confidential" | "Secret";

export interface ICaseInput {
  caseNumber: string;
  title: string;
  description: string;
  status: CaseStatus;
  classification: CaseClassification;
  assignedAnalysts: string[];
  targets: string[]; // Represented as hex strings before DB insertion
  evidence: string[]; // Represented as hex strings before DB insertion
}
