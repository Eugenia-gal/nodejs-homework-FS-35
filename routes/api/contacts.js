import { Router } from "express";
import model from "../../model/index.js";

const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
});

router.get(
  "/:id",
  /*validateId,*/ async (req, res, next) => {
    const { id } = req.params;
    const contact = await model.getContactById(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  }
);

router.post(
  "/",
  /*validateCreate,*/ async (req, res, next) => {
    const newContact = await model.addContact(req.body);
    res.status(201).json(newContact);
  }
);

router.delete(
  "/:id",
  /*validateId,*/ async (req, res, next) => {
    const { id } = req.params;
    const contact = await model.removeContact(id);
    if (contact) {
      return res
        .status(200)
        .json({ message: `contact with id: ${id} is deleted` });
    }
    res.status(404).json({ message: "Not found" });
  }
);

// router.patch("/:contactId", async (_req, res, _next) => {
//   res.json({ message: "template message" });
// });

export default router;
