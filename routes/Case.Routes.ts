import express from "express";
import {
  addCase,
  updateCase,
  deleteCase,
} from "../controllers/Case.Controller";

const CaseRouter = express.Router();

// POST: Create a new case
// Route: POST /api/cases
CaseRouter.post("/", addCase);

// PATCH: Update an existing case by its ID
// Route: PATCH /api/cases/:id
CaseRouter.patch("/:id", updateCase);

// DELETE: Remove a case by its ID
// Route: DELETE /api/cases/:id
CaseRouter.delete("/:id", deleteCase);

export default CaseRouter;
