import express from "express";
import {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/formController.js";

const router = express.Router();

// ✅ CRUD routes
router.post("/create", createForm);
router.get("/getAll", getForms);
router.get("/get/:id", getFormById);
router.put("/update/:id", updateForm);
router.delete("/delete/:id", deleteForm);

export default router;
