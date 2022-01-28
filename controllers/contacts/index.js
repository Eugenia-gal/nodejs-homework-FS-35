import repositoryContacts from "../../repository/contacts.js";
import { HttpCode } from "../../lib/constants.js";

async function getContacts(req, res, next) {
  const { id: userID } = req.user;
  const contacts = await repositoryContacts.listContacts(userID, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
}

async function getContactById(req, res, next) {
  const { id: userID } = req.user;
  const { id } = req.params;
  const contact = await repositoryContacts.getContactById(userID, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
}

async function addContact(req, res, next) {
  const { id: userID } = req.user;
  const newContact = await repositoryContacts.addContact(userID, req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  });
}

async function removeContact(req, res, next) {
  const { id: userID } = req.user;
  const { id } = req.params;
  const contact = await repositoryContacts.removeContact(userID, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
}

async function updateContact(req, res, next) {
  const { id: userID } = req.user;
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(userID, id, req.body);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
}

export {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
