const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const fs = require("fs/promises");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId);

    if (!contact) {
      console.error("Contact not found");
      return;
    }

    console.table(contact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    if (filteredContacts.length === contacts.length) {
      console.error("Contact not found");
      return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log("Contact has been removed");
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: contacts.length + 1, name, email, phone };
    const newContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("Contact has been added");
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
