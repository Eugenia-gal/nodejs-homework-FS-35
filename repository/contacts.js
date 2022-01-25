import Contact from "../model/contact.js";

async function listContacts() {
  const contactList = await Contact.find();
  return contactList;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact;
}

async function addContact(body) {
  const newContact = await Contact.create(body);
  return newContact;
}

async function removeContact(contactId) {
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  return deletedContact;
}

async function updateContact(contactId, body) {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
