import { Router } from "express";
import {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../../controllers/contacts/index.js";
import {
  validateId,
  validateCreating,
  validateUpdating,
  validateUpdatingFavorite,
} from "./validation.js";
import guard from "../../../middlewares/guard.js";

const router = new Router();

router.get("/", guard, getContacts);

router.get("/:id", [guard, validateId], getContactById);

router.post("/", [guard, validateCreating], addContact);

router.delete("/:id", [guard, validateId], removeContact);

router.put("/:id", [guard, validateId, validateUpdating], updateContact);

router.patch("/:id/favorite", [guard, validateUpdatingFavorite], updateContact);

export default router;
