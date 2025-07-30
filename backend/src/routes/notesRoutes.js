import express from "express"
import { createNote, getNoteById, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js"

import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect) // all routes below require auth

router
  .get("/", getAllNotes)
  .get("/:id", getNoteById)
  .post("/", createNote)
  .put("/:id", updateNote)
  .delete("/:id", deleteNote)

export default router
