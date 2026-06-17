import type { Request, Response } from "express";
import { Case } from "../models/Case.Model"; 
import { CaseSchema } from "../types/Case.zod"; 

// --- CREATE ---
export const addCase = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body against Zod schema
    const validatedData = CaseSchema.parse(req.body);

    // Create and save the new case
    const newCase = new Case(validatedData);
    await newCase.save();

    res.status(201).json({
      success: true,
      message: "Case created successfully",
      data: newCase,
    });
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      res.status(400).json({ success: false, errors: error.errors });
      return;
    }
    // Handle duplicate key errors (e.g., unique caseNumber)
    if (error.code === 11000) {
      res
        .status(400)
        .json({ success: false, message: "Case number must be unique" });
      return;
    }
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// --- UPDATE ---
export const updateCase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Use .partial() so updates don't require every single field to be present
    const validatedData = CaseSchema.partial().parse(req.body);

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true, runValidators: true }, // new: true returns the modified document
    );

    if (!updatedCase) {
      res.status(404).json({ success: false, message: "Case not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Case updated successfully",
      data: updatedCase,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ success: false, errors: error.errors });
      return;
    }
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// --- DELETE ---
export const deleteCase = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedCase = await Case.findByIdAndDelete(id);

    if (!deletedCase) {
      res.status(404).json({ success: false, message: "Case not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Case deleted successfully",
      data: deletedCase,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
