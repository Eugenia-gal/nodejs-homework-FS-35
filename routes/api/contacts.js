import { Router } from "express";
import model from "../../model/index.js";

const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  console.log(contacts);
  res.status(200).json(contacts);
});

// router.get("/:contactId", async (_req, res, _next) => {
//   res.json({ message: "template message" });
// });

// router.post("/", async (_req, res, _next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (_req, res, _next) => {
//   res.json({ message: "template message" });
// });

// router.patch("/:contactId", async (_req, res, _next) => {
//   res.json({ message: "template message" });
// });

export default router;
