import type { Request, Response } from "express";
import { PersonZodSchema } from "../types/Person.zod";
import { Person } from "../models/Person.Model"; // Adjust this path to your actual Mongoose model

export const addPerson = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Validate request body using Zod
    const result = PersonZodSchema.safeParse(data);

    if (!result.success) {
      // .flatten() format makes the validation errors much cleaner for client consumption
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    // Save validated data to MongoDB
    const newPerson = new Person(result.data);
    await newPerson.save();

    return res.status(201).json({
      success: true,
      message: "Person created successfully",
      data: newPerson,
    });
  } catch (error) {
    console.error("Error adding person:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Expecting /person/:id route structure

    // Simple check to ensure we aren't passing a malformed ID string to Mongoose
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const deletedPerson = await Person.findByIdAndDelete(id);

    if (!deletedPerson) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Person deleted successfully",
      data: deletedPerson,
    });
  } catch (error) {
    console.error("Error deleting person:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Expecting /person/:id
    const data = req.body;

    // 1. Basic ID length check before querying database
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // 2. Use .partial() so every field becomes optional for updates
    const updateSchema = PersonZodSchema.partial();
    const result = updateSchema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    // 3. Update the document in MongoDB
    // { new: true } returns the modified document rather than the original
    // { runValidators: true } ensures Mongoose-level validation still kicks in
    const updatedPerson = await Person.findByIdAndUpdate(id, result.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedPerson) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Person updated successfully",
      data: updatedPerson,
    });
  } catch (error) {
    console.error("Error updating person:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all people (Returns entire collection)
 * Route: GET /person
 */
export const getAllPerson = async (req: Request, res: Response) => {
  try {
    // Fetch all documents from the collection
    const people = await Person.find();

    return res.status(200).json({
      success: true,
      message: "All people retrieved successfully",
      count: people.length,
      data: people
    });

  } catch (error) {
    console.error("Error fetching people:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/**
 * Get a single person by ID
 * Route: GET /person/:id
 */
export const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. Validate ID format before hitting the database
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // 2. Query document
    const person = await Person.findById(id);

    // If you need to automatically load the actual documents for
    // "relatives" or "associatedEvidence", chain .populate('relatives') here.

    if (!person) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Person retrieved successfully",
      data: person,
    });
  } catch (error) {
    console.error("Error fetching person:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};