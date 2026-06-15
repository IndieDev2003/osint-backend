import mongoose, { Schema } from "mongoose";
import type { IPerson } from "../types/Person.types";

const AddressSchema = new mongoose.Schema(
  {
    streetAddress: { type: String, trim: true },
    cityName: { type: String, trim: true },
    districtName: { type: String, trim: true },
    pinCode: { type: Number },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  { _id: false },
);

const EducationSchema = new mongoose.Schema(
  {
    degreeType: { type: String, trim: true },
    major: { type: String, trim: true },
    institution: { type: String, trim: true },
    graduationYear: { type: Number },
  },
  { _id: false },
);

const PersonNotes = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String },
  },
  { _id: false },
);

const Vehicles = new mongoose.Schema(
  {
    company: { type: String, lowercase: true, trim: true },
    model: { type: String, lowercase: true, trim: true },
    description: { type: String },
    registraionNumber: { type: String, uppercase: true, trim: true }, // License plates forced to uppercase
  },
  { _id: false },
);

const PhoneNumber = new mongoose.Schema(
  {
    countryCode: { type: Number },
    number: { type: Number },
  },
  { _id: false },
);

const Accounts = new mongoose.Schema(
  {
    service: { type: String, lowercase: true, trim: true }, // e.g. "telegram", "twitter"
    url: { type: String, trim: true },
    active: { type: Boolean, default: true },
  },
  { _id: false },
);

export const PersonSchema = new mongoose.Schema<IPerson>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    dob: { type: Number },
    age: { type: Number },
    email: { type: String, index: true, lowercase: true, trim: true },
    phone: { type: [PhoneNumber], default: [] },
    address: { type: [AddressSchema], default: [] },
    study: { type: [EducationSchema], default: [] },
    note: { type: [PersonNotes], default: [] },
    vehicle: { type: [Vehicles], default: [] },
    account: { type: [Accounts], default: [] },
    relatives: [{ type: Schema.Types.ObjectId, ref: "Person", default: [] }],
    associatedEvidence: [
      { type: Schema.Types.ObjectId, ref: "Evidence", default: [] },
    ],
  },
  {
    timestamps: true, // Added system metadata tracing
  },
);

// --- OSINT Query Optimization: Global Text Indexing ---
// This enables a singular, unified search bar across your entire target entity data tree.
PersonSchema.index(
  {
    name: "text",
    email: "text",
    "phone.number": "text",
    "vehicle.registraionNumber": "text",
    "account.url": "text",
    "note.description": "text",
  },
  {
    name: "GlobalOSINTSearchIndex",
    weights: {
      name: 10,
      email: 8,
      "phone.number": 8,
      "vehicle.registraionNumber": 5,
    },
  },
);

export const Person = mongoose.model<IPerson>("Person", PersonSchema);
