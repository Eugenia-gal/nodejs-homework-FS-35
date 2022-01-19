import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

import contacts from "./contacts.json";
// const contacts = JSON.parse(await fs.readFile("./model/contacts.json"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, /*"/model",*/ "contacts.json");

async function listContacts() {
  return contacts;
}

async function getContactById(contactId) {
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

async function addContact({ name, email, phone }) {
  // const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  if (updatedContacts.length !== contacts.length) {
    const index = contacts.findIndex((contact) => contact.id === contactId);
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  }
  return null;
}

async function updateContact(contactId, body) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  }
  return null;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
