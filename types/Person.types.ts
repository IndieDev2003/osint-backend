import mongoose, { Document, Model } from "mongoose";

export interface IPhoneNumber {
  countryCode?: number;
  number?: number;
}

export interface IAddress {
  streetAddress?: string;
  cityName?: string;
  districtName?: string;
  pinCode?: number;
  state?: string;
  country?: string;
}

export interface IEducation {
  degreeType?: string;
  major?: string;
  institution?: string;
  graduationYear?: number;
}

export interface IPersonNote {
  title?: string;
  description?: string;
}

export interface IVehicle {
  company?: string;
  model?: string;
  description?: string;
  registraionNumber?: string; // Kept your schema's exact spelling typo ('registraionNumber')
}

export interface IAccount {
  service?: string;
  url?: string;
  active?: boolean;
}

// --- Main Document Interface ---

export interface IPerson extends Document {
  name: string; // Required in schema
  dob?: number;
  age?: number;
  email?: string;
  phone: IPhoneNumber[];
  address: IAddress[];
  study: IEducation[];
  note: IPersonNote[];
  vehicle: IVehicle[];
  account: IAccount[];
  relatives: mongoose.Types.ObjectId[];
  associatedEvidence: mongoose.Types.ObjectId[];
}
