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

const router = new Router();

router.get("/", getContacts);

router.get("/:id", validateId, getContactById);

router.post("/", validateCreating, addContact);

router.delete("/:id", validateId, removeContact);

router.put("/:id", validateId, validateUpdating, updateContact);

router.patch("/:id/favorite", validateUpdatingFavorite, updateContact);

export default router;
