import express from "express";

import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// CREATE
router.post("/", createNote);

// GET ALL
router.get("/", getNotes);

// GET SINGLE
router.get("/:id", getNoteById);

// UPDATE
router.put("/:id", updateNote);

// DELETE
router.delete("/:id", deleteNote);

export default router;