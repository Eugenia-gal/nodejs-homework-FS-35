import Contact from "../model/contact.js";

async function listContacts(userId) {
  const contactList = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email subscription",
  });
  return contactList;
}

async function getContactById(userId, contactId) {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email subscription",
  });
  return contact;
}

async function addContact(userId, body) {
  const newContact = await Contact.create({ ...body, owner: userId });
  return newContact;
}

async function removeContact(userId, contactId) {
  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return deletedContact;
}

async function updateContact(userId, contactId, body) {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  ).populate({
    path: "owner",
    select: "name email subscription",
  });
  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
