const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idContact = contacts.find(
      (contact) => contact.id === String(contactId)
    );
    // if (!idContact) {
    //   return `Not found contact with id ${contactId}`;
    // }
    return idContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removedContact = await getContactById(contactId);
    const newListContacts = contacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    //   return newListContacts;
    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();
    const newContacts = {
      id: uid(),
      name,
      email,
      phone,
    };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContacts;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const necessaryContact = contacts.map((contact) => {
      const id = contact.id;

      if (id === contactId) {
        return {
          ...contact,
          ...body,
        };
      } else {
        return contact;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(necessaryContact), "utf8");

    const newContact = necessaryContact.find(
      (contact) => contact.id === contactId
    );
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
